import {
  StyleSheet, Text, TextInput, View, Image,
  ImageBackground, TouchableOpacity, KeyboardAvoidingView,
  SafeAreaView,
  ScrollView
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, MD2Colors, Snackbar } from 'react-native-paper';

import { SignInService } from '../services/auth-service';

const SignInScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(UserContext);

  const [incorrect, setIncorrect] = useState({
    message: '',
    visibility: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    message: '',
    visibility: false
  })


  const ValueChecking = () => {
    if (!(email.includes(".") && email.includes("@"))) {
      if (email == "") {
        setIncorrect({
          message: "please fill all the required fields",
          visibility: true
        })
      } else {
        setIncorrect({
          message: "please enter the email with right format",
          visibility: true
        })
      }
    }
    else if (password == "") {
      setIncorrect({
        message: "please fill all the required fields",
        visibility: true
      })
    }
    else {
      setIncorrect({
        message: "",
        visibility: false
      })
      return true
    }
    return false
  }


  const handleSignIn = async () => {
    if (!ValueChecking()) {
      return
    }
    setIsLoading(true)
    const { status, data } = await SignInService({ email, password });
    if (status == 'success') {
      const result = await AsyncStorage.getItem('user_info')
      const { name, email, picture, _id } = JSON.parse(result || '')
      context.setUser({ name, email, picture, _id })
    } else (
      console.log(data)
    )
    setSnackbar({
      message: data.message,
      visibility: true
    })
    setIsLoading(false)
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.pageContainer}>
        <ImageBackground
          source={require('../../assets/background3.0.png')}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <ScrollView>
            <View style={styles.overlayContainer}>
              <View style={styles.loginContainer}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo.png')}
                />
                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.title}>{context.user.name}</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                <Text style={incorrect.visibility ? styles.incorrectText : { display: 'none' }}>{incorrect.message}</Text>
                {/* <TouchableOpacity>
                  <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                  </TouchableOpacity> */}

                <TouchableOpacity style={styles.getSignInButton} onPress={handleSignIn}>
                  {
                    isLoading ? (
                      <ActivityIndicator animating={true} color={MD2Colors.cyan700} />
                    ) : (
                      <Text style={styles.getStartedText}>Sign In</Text>
                    )
                  }
                </TouchableOpacity>

                <View style={styles.signUpTextContainer}>
                  <Text>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
                    <Text style={styles.signUpText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          <Snackbar
            visible={snackbar.visibility}
            onDismiss={() => setSnackbar(ex => ({
              ...ex,
              visibility: false
            }))}
          >
            {snackbar.message}
          </Snackbar>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  pageContainer: {
    width: '100%',
    height: '100%',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 200,
    marginVertical: 20,
    resizeMode: 'center'
  },
  overlayContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  loginContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    width: 'auto',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '92%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  getSignInButton: {
    backgroundColor: '#50C2C9',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  getStartedText: {
    color: '#fff',
    fontSize: 16,
  },
  signUpTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: '#50C2C9',
  },
  forgotPasswordText: {
    color: '#50C2C9',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  getSocialButton: {
    backgroundColor: '#50C2C9',
    padding: 20,
    borderRadius: 15,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  socialIcon: {
    height: 24,
    width: 24,
  },
  incorrectText: {
    color: "#e33",
    textAlign: 'left',
    width: '100%',
    marginLeft: 25,
    display: 'flex'
  }
});
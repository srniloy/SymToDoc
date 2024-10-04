import { 
    StyleSheet, Text, TextInput, View, Image, 
    ImageBackground, TouchableOpacity, KeyboardAvoidingView, 
    SafeAreaView,
    ScrollView} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { IUser } from '../types/type-interfaces';
import { SignUpService } from '../services/auth-service';
import { ActivityIndicator, MD2Colors, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts/UserContext';



const SignUpScreen = ({navigation}: any) => {
  const context = useContext(UserContext)

  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: ""
  })
  const [incorrect, setIncorrect] = useState({
      message: '',
      visibility: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    message: '',
    visibility: false
  })


  const ValueChecking = ()=>{
    if(user.name == ""){
      setIncorrect({
        message: "please fill all the required fields",
        visibility: true
      })
    }
    else if(!(user.email.includes(".") && user.email.includes("@"))){
      if(user.email == ""){
        setIncorrect({
          message: "please fill all the required fields",
          visibility: true
        })
      }else{
        setIncorrect({
          message: "please enter the email with right format",
          visibility: true
        })
      }
    }
    else if(user.password == "" || user.confirmPassword == ""){
      setIncorrect({
        message: "please fill all the required fields",
        visibility: true
      })
    }
    else if(user.password !== user.confirmPassword){
      setIncorrect({
        message: "password doesn't match",
        visibility: true
      })
    }
    else{
      setIncorrect({
        message: "",
        visibility: false
      })
      return true
    }
    return false
  }


  const handleSignUp = async () => {
    if(!ValueChecking()){
      return
    }
    setIsLoading(true)
    const {status, data} = await SignUpService(user);
    if(status == 'success'){
      const result = await AsyncStorage.getItem('user_info')
      const {name, email, picture, _id} = JSON.parse(result || '')
      context.setUser({name, email, picture, _id})
    }else(
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
          <ScrollView style={{height: '100%'}} contentContainerStyle={{}}>
            <View style={styles.overlayContainer}>
              <View style={styles.loginContainer}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo.png')}
                />
                <Text style={styles.title}>Sign Up</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={user.name}
                  onChangeText={
                    (value)=>{
                      setUser(ex => ({
                        ...ex,
                        name: value
                      }))
                    }
                  }
                  keyboardType='default'
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={user.email}
                  onChangeText={
                    (value)=>{
                      setUser(ex => ({
                        ...ex,
                        email: value
                      }))
                    }
                  }
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={user.password}
                  onChangeText={
                    (value)=>{
                      setUser(ex => ({
                        ...ex,
                        password: value
                      }))
                    }
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  value={user.confirmPassword}
                  onChangeText={
                    (value)=>{
                      setUser(ex => ({
                        ...ex,
                        confirmPassword: value
                      }))
                    }
                  }
                />
                <Text style={incorrect.visibility? styles.incorrectText: {display:'none'}}>{incorrect.message}</Text>

                <TouchableOpacity style={styles.getSignInButton} onPress={handleSignUp}>
                  {
                    isLoading?(
                      <ActivityIndicator animating={true} color={MD2Colors.cyan700} />
                    ):(
                      <Text style={styles.getStartedText}>Sign Up</Text>
                    )
                  }
                </TouchableOpacity>

                <View style={styles.signUpTextContainer}>
                  <Text>Already have an Account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                      <Text style={styles.signUpText}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>

          </ScrollView>
            <Snackbar
              visible={snackbar.visibility}
              onDismiss={()=> setSnackbar(ex=>({
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

export default SignUpScreen;

const styles = StyleSheet.create({
  pageContainer: {
    width: '100%',
    height: '100%',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 200,
    marginBottom: 10,
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
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
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
    marginTop: 10,
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
    color:"#e33", 
    textAlign:'left', 
    width: '100%', 
    marginLeft:25,
    display: 'flex'
  }
});
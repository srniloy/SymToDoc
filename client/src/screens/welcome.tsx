import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, TextInput } from 'react-native-paper'
import { colors } from '../constants/colors'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from '../contexts/UserContext'


const WelcomeScreen = ({ navigation }: any) => {
  const context = useContext(UserContext)

  return (
    <SafeAreaView style={{backgroundColor: colors.bg, height: '100%', flex: 1}}>
        <ScrollView contentContainerStyle={{width: '100%', display:'flex', justifyContent: 'center', flex: 1}}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logo.png')}
                    />
                    <Image
                        style={styles.imageStye}
                        source={require('../../assets/telemedicine.png')}
                    />
                    <Text style={styles.heading2}>
                        Identify Diseases with{"\n"}
                        <Text style={styles.headingKeyword}>SymToDoc</Text>
                    </Text>
                    <Text style={styles.subText}>A place where everyone can find possible diseases{"\n"}from symptoms and a path to cure.</Text>
                </View>
                <View style={styles.continueBar}>
                    <View style={{height:1, width: 100, backgroundColor:"#999"}}></View>
                    <Text style={{color:'#777', fontSize: 12}}>Continue With</Text>
                    <View style={{height:1, width: 100, backgroundColor:"#999"}}></View>
                </View>
                <Button icon="login" style={styles.buttonStyle} mode="contained" onPress={() => {navigation.navigate('SignIn')}}>
                    Sign In
                </Button>

            </View>
        </ScrollView>
        <StatusBar  backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({

    container:{
        height: "auto",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper:{
        width: "100%",
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
        height: 100,
        width: 200,
        marginVertical: 20,
        resizeMode: 'center'
    },
    imageStye:{
        height: 200,
        width: 300,
        resizeMode: 'center'
    },
    heading2: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center'
    },
    headingKeyword:{
        fontSize: 28,
        color: colors.primary
    },
    subText:{
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center'
    },
    continueBar:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        marginTop: 30
    },
    buttonStyle:{
        backgroundColor: colors.secondary,
        marginTop: 20,
        width: 250,
    }
})
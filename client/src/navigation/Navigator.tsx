import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts/UserContext';
import WelcomeScreen from '../screens/welcome';
import SignInScreen from '../screens/signin';
import SignUpScreen from '../screens/signup';
import DashboardScreen from '../screens/dashboard';


const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  
  const context = useContext(UserContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const data = await AsyncStorage.getItem('user_info');
  //     console.log("first", data)
  //     if(data){
  //       console.log(data)
  //     setIsLoggedIn(true)
  //     }else{
  //       setIsLoggedIn(false)
  //     }
  //   fetchUser().catch(error=>{
  //     console.log(error)
  //   })
  
  //   }
  // }, []);
// context.user.email == ''
  return (
    <NavigationContainer>
    <Stack.Navigator>
        {
        context.user.email == ''? (
        <>
            <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false}}/>
            <Stack.Screen name='SignIn' component={SignInScreen}/>
            <Stack.Screen name='SignUp' component={SignUpScreen}/>
        </>
        ):(
        <>
            <Stack.Screen name='Dashboard' component={DashboardScreen} options={{ headerShown: false }}/>
        </>
        )
        
        }
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    width: '100%',
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

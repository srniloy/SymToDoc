import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/signin';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './src/screens/welcome';
import SignInScreen from './src/screens/signin';
import SignUpScreen from './src/screens/signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext, UserContextProvider } from './src/contexts/UserContext';
import MainNavigator from './src/navigation/Navigator';
import { init_service } from './src/services/disease-find-service';


export default function App() {
  useEffect(() => {
        const Init = async ()=>{
          const res:any = await init_service();
        }
        Init()
      }, []);
  return (
    <UserContextProvider>
      <StatusBar style="auto" />
      <MainNavigator/>
    </UserContextProvider>
  );
}


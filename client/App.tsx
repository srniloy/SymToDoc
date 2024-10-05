import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/signin';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './src/screens/welcome';
import SignInScreen from './src/screens/signin';
import SignUpScreen from './src/screens/signup';
import DashboardScreen from './src/screens/disease-find';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext, UserContextProvider } from './src/contexts/UserContext';
import DashboardStack from './src/navigation/DashboardStack';
import AuthStack from './src/navigation/AuthStack';
import MainNavigator from './src/navigation/Navigator';



export default function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  return (
    <UserContextProvider>
      <MainNavigator/>
    </UserContextProvider>
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

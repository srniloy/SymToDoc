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
import MainNavigator from './src/navigation/Navigator';



export default function App() {
  
  return (
    <UserContextProvider>
      <MainNavigator/>
    </UserContextProvider>
  );
}


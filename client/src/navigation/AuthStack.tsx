import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '../screens/dashboard';
import { UserContextProvider } from '../contexts/UserContext';
import WelcomeScreen from '../screens/welcome';
import SignInScreen from '../screens/signin';
import SignUpScreen from '../screens/signup';


const Stack = createNativeStackNavigator();






export default function AuthStack() {

  return (
    <>
        <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='SignIn' component={SignInScreen}/>
        <Stack.Screen name='SignUp' component={SignUpScreen}/>
    </>
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

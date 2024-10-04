import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '../screens/dashboard';


const Stack = createNativeStackNavigator();






export default function DashboardStack() {
  
  return (
    <>
      <Stack.Screen name='Dashboard' component={DashboardScreen} options={{ headerShown: false }}/>
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

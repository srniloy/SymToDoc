import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/signin';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './src/screens/welcome';
import SignInScreen from './src/screens/signin';
import SignUpScreen from './src/screens/signup';


const Stack = createNativeStackNavigator();
const isLoggedIn = false;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          isLoggedIn? (
            <>
            </>
          ):
          (
            <>
              <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }}/>
              <Stack.Screen name='SignIn' component={SignInScreen}/>
              <Stack.Screen name='SignUp' component={SignUpScreen}/>
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

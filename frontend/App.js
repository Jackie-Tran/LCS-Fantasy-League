import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './scenes/authentication/LoginScreen';
import RegisterScreen from './scenes/authentication/RegisterScreen';
import ForgotPasswordScreen from './scenes/authentication/ForgotPasswordScreen';

import MainScreen from './scenes/MainScreen';
import Login from './scenes/Login';
import Signup from './scenes/Signup';
import LeagueScreen from './scenes/LeagueScreen';

// Navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [authenticated, setAuthenticated] = React.useState(false);
  const [currentLeague, setCurrentLeague] = React.useState({
    id: -1,
    name: 'leagueName',
    players: [],
    maxPlayers: -1,
    img: 'url',
    activePros: [],
  });

  return (
    <NavigationContainer>
      {
        !authenticated ? (
          <Stack.Navigator>
            <Stack.Screen name="Login" options={{ headerShown: false }} initialParams={{ setAuthenticated }} component={Login} />
            <Stack.Screen name="Signup" initialParams={{ setAuthenticated }} component={Signup} />
          </Stack.Navigator>
        ) : (
            <Stack.Navigator>
              <Stack.Screen name="Main" options={{ headerShown: false }} initialParams={{ setCurrentLeague }} component={MainScreen} />
              <Stack.Screen name="League" options={{ headerShown: false }} initialParams={{ currentLeague }} component={LeagueScreen} />
            </Stack.Navigator>
          )
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

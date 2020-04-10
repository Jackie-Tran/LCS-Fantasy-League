import React from 'react';
import { StyleSheet, Text, View, Animated, Image, Platform, StatusBar } from 'react-native';
import { AppLoading, Asset, Font, Icon, SplashScreen } from 'expo';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainScreen from './navigation/screens/MainScreen';
import Login from './navigation/authentication/Login';
import Signup from './navigation/authentication/Signup';
import ForgotPassword from './navigation/authentication/ForgotPasswordScreen';
import LeagueScreen from './navigation/screens/LeagueScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
    splashAnimation: new Animated.Value(0),
    splashAnimationComplete: false,
    authenticated: false,
    currentLeague: {
      id: -1,
      name: 'leagueName',
      players: [],
      maxPlayers: -1,
      img: 'url',
      activePros: [],
    }
  }

  setAuthenticated = (isAuthenticated) => {
    this.setState({
      authenticated: isAuthenticated
    });
  }

  setCurrentLeague = (league) => {
    this.setState({
      currentLeague: league
    });
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          {
            !this.state.authenticated ? (
              <Stack.Navigator>
                <Stack.Screen name="Login" options={{ headerShown: false }} initialParams={{setAuthenticated: this.setAuthenticated}} component={Login} />
                <Stack.Screen name="Signup" initialParams={{setAuthenticated: this.setAuthenticated}} component={Signup} />
                <Stack.Screen name="ForgotPassword" initialParams={{setAuthenticated: this.setAuthenticated}} component={ForgotPassword} />
              </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                  <Stack.Screen name="Main" options={{ headerShown: false }} initialParams={{setCurrentLeague: this.setCurrentLeague}} component={MainScreen} />
                  <Stack.Screen name="League" options={{ headerShown: false }} initialParams={{currentLeague: this.state.currentLeague}} component={LeagueScreen} />
                </Stack.Navigator>
              )
          }
        </NavigationContainer>
      </SafeAreaProvider >
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import LeaguesScreen from './navigation/LeaguesScreen'
import Login from './navigation/authentication/Login';
import Signup from './navigation/authentication/Signup';
import ForgotPassword from './navigation/authentication/ForgotPasswordScreen';
import LeagueScreen from './navigation/screens/LeagueScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  global
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
    <SafeAreaProvider>
      <NavigationContainer>
        {
          !authenticated ? (
            <Stack.Navigator>
              <Stack.Screen name="Login" options={{ headerShown: false }} initialParams={{ setAuthenticated }} component={Login} />
              <Stack.Screen name="Signup" options={{ headerShown: false }} initialParams={{ setAuthenticated }} component={Signup} />
              <Stack.Screen name="ForgotPassword" initialParams={{ setAuthenticated }} component={ForgotPassword} />
            </Stack.Navigator>
          ) : (
              <Stack.Navigator>
                <Stack.Screen name="LeaguesScreen" options={{ headerShown: true,title: "Welcome Back", headerTitleAlign: 'center'}} initialParams={{ setAuthenticated }}component={LeaguesScreen} />
                <Stack.Screen name="League" options={{ headerShown: false }} initialParams={{ currentLeague}} component={LeagueScreen} />
              </Stack.Navigator>
            )
        }
      </NavigationContainer>
    </SafeAreaProvider>
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

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './scenes/authentication/LoginScreen';
import RegisterScreen from './scenes/authentication/RegisterScreen';
import ForgotPasswordScreen from './scenes/authentication/ForgotPasswordScreen';

import LeaguesPage from './scenes/LeaguesScreen';
import Login from './scenes/Login';
import Signup from './scenes/Signup';
import HomeScreen from './scenes/HomeScreen';
// Navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [authenticated, setAuthenticated] = React.useState(false);
  return (
    // <NavigationContainer>
    //   {
    //     !authenticated ? (
    //       <Stack.Navigator>
    //         <Stack.Screen name="Login" component={LoginScreen} initialParams={ {setAuthenticated} }/>
    //         <Stack.Screen name="Register" component={RegisterScreen}/>
    //         <Stack.Screen name="Forgot" component={ForgotPasswordScreen}/>
    //       </Stack.Navigator>
    //     ) : (
    //       <Tab.Navigator>
    //         <Tab.Screen name="Leagues" component={LeaguesPage}/>
    //       </Tab.Navigator>
    //     )
    //   }
    //   {/* <Stack.Navigator>
    //         <Stack.Screen name="Login" component={LoginScreen} initialParams={ setAuthenticated }/>
    //         <Stack.Screen name="Register" component={RegisterScreen}/>
    //         <Stack.Screen name="Forgot" component={ForgotPasswordScreen}/>
    //       </Stack.Navigator> */}
    // </NavigationContainer>
    <NavigationContainer>
      {
        !authenticated ? (
          <Stack.Navigator>
            <Stack.Screen name="Login" options={{ headerShown: false }} initialParams={{ setAuthenticated }} component={Login} />
            <Stack.Screen name="Signup" initialParams={{ setAuthenticated }} component={Signup} />
          </Stack.Navigator>
        ) : (
            <Tab.Navigator>
              <Tab.Screen name="Leagues" component={LeaguesPage} />
            </Tab.Navigator>
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

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
// screens

import LeaguesScreen from '../LeaguesScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default Drawer = () => {
    return (
        <Drawer.Navigator>
        <Drawer.Screen name="Home" component={LeaguesScreen} />
      </Drawer.Navigator>
    ); 
};
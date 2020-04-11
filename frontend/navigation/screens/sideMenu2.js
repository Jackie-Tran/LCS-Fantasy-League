
import React, { Component } from 'react';
import { Image, StyleSheet,Alert } from 'react-native';
import {Block,Text, Button} from 'expo-ui-kit'
import { createStackNavigator } from '@react-navigation/stack';
import { Feather, AntDesign } from '@expo/vector-icons';
import CustomeDrawere from '../screens/CustomDrawere';
import * as  firebase from 'firebase'
import Logout from '../authentication/Logout'
import LeaguesScreen from '../LeaguesScreen';
import {
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { render } from 'react-dom';

class sideMenu2 extends Component {
  handleLogout= () => {
    const { email, password } = this.state
    firebase.auth().signOut()
      .then(() => this.props.route.params.setAuthenticated(true))
      .catch(error=>
      {
        let errorCode = error.code; 
        console.log(errorCode)
        if (errorCode === 'auth/invalid-email') 
        {
          Alert.alert(
            'Invalid Email'
         )
        }
        else if (errorCode === 'auth/wrong-password') 
        {
          Alert.alert(
            'Wrong Password Try Again'
         )
        }
        else 
        {
          this.props.navigation.navigate('Login')
        }
      });
      
      
  }
  render() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
        initialRouteName="LeaguesScreens"
        >
        <Drawer.Screen name="LeaguesScreen"  component={LeaguesScreen} />
        <Drawer.Screen name="Logout" initialParams= {this.props.setAuthenticated} component={Logout} />
      </Drawer.Navigator>
    );
}
}

export default sideMenu2;
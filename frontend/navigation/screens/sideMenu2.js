
import React, { Component } from 'react';
import { Image, StyleSheet,Alert } from 'react-native';
import {Block,Text, Button} from 'expo-ui-kit'
import { createStackNavigator } from '@react-navigation/stack';
import { Feather, AntDesign } from '@expo/vector-icons';
import CustomeDrawere from '../screens/CustomDrawere';
import * as  firebase from 'firebase'
import LeaguesScreen from '../LeaguesScreen';
import {
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
// const Screens = ({navigation,props}) => 
// {   return (
//   <SafeAreaProvider>
    
//     <Stack.Navigator
//      screenOptions = {{
//      headerTransperent: true, 
//      headerTitle: 'Welcome Back', 
//      headerLeft: () => 
//      (
//          <Button 
//          primary 
//          padding 
//          marginHorizantal 
//          white
//          onPress={() => navigation.openDrawer()}> 
//         <Feather name="menu" size={18} color="black" style={{ paddingHorizontal: 10 }} />
//          </Button>
//      )
//      }}> 
     
//         <Stack.Screen name = "LeaguesScreen " component = {LeaguesScreen}/>
//      </Stack.Navigator>
//     </SafeAreaProvider>
// ); 
// };
const Drawer = createDrawerNavigator();
const sideMenu2 = ({ route }) => {
    return (
        <Drawer.Navigator
        initialParams={{ route}}
        initialRouteName="LeaguesScreens"
        drawerContent= {props=> <CustomeDrawere {...props} />}
        >
        <Drawer.Screen name="LeaguesScreen"  component={LeaguesScreen} />
      </Drawer.Navigator>
    );
}

export default sideMenu2;
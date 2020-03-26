import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {Block,Text, Button} from 'expo-ui-kit'
import { createStackNavigator } from '@react-navigation/stack';
import {
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
// screens

import LeaguesScreen from '../LeaguesScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Screens = ({navigation}) => 
{   return (
    <Stack.Navigator
     screenOptions = {{
     headerTransperent: true, 
     headerTitle: null, 
     headerLeft: () => 
     (
         <Button 
         primary 
         padding 
         marginHorizantal 
         onPress={() => navigation.openDrawer()}> 
             <Text white>MENU</Text>
         </Button>
     )
     }}> 
        <Stack.Screen name = "LeaguesSCreen " component = {LeaguesScreen}/>
    </Stack.Navigator>
); 
};

const CustomDrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
          <Block flex={0.4} margin={20} bottom>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,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',
              height: 60,
              width: 60,
              scale: 0.5,
            }}
            resizeMode="center"
        
          />
          <Text white title>
            React UI Kit
          </Text>
          <Text white size={9}>
            contact@react-ui-kit.com
          </Text>
        </Block>
        <DrawerItemList {...props} />
      <DrawerItem
        label="Leagues"
        onPress={() => props.navigation.navigate("LeagueScreens")}
      />
      <DrawerItem
        label="My Profile"
        onPress={() => props.navigation.navigate("Profile")}
      />
      </DrawerContentScrollView>
    );
  }
export default sideMenu = () => {
    return (
        <Drawer.Navigator
        initialRouteName="LeagueScreen"
        drawerContent= {props => <CustomDrawerContent {... props} />}
        >
        <Drawer.Screen name="Screens" component={Screens} />
      </Drawer.Navigator>
    ); 
};
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet,TouchableOpacity,Text, View,Button,TextInput,TouchableHighlight,Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { createTabNavigator } from 'react-navigation';
import landingpage from './landingpage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator(); 
const Tab = createBottomTabNavigator();

const SettingsScreen= ({navigation}) => 
{
  return (
    <View >
    </View>
  );
};
class login extends Component {
    render () 
    {
        return (
          <View style={styles.container}>
          <Image   style={{width: 300, height: 300}}  source={require('./images/lcs.png')} />
            <TextInput placeholder="Enter Email"
             secureTextEntry={true}
             placeholderTextColor="#FFFFFF" 
             style={styles.inputStyle} />
              <TextInput
                secureTextEntry={true}
                placeholder="Enter Password" 
                placeholderTextColor="#FFFFFF" 
                style={styles.inputStyle}
              />
          <TouchableOpacity 
           onPress= {() => this.props.navigation.navigate('leaguePage') }>
          <Text style = {styles.logInButton}  >Login </Text>
          </TouchableOpacity>
          <Text style={styles.baseText}> Dont have an account? Sign Up Now </Text>
          <Text style={styles.base2Text}>Forgot Password </Text>
          </View>

        );
      };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000080',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10
  }, 
  baseText: 
  {  fontFamily: 'Cochin',
  marginVertical: 20,
  color: "#FFFFFF"
  } , 
  base2Text: 
  {  fontFamily: 'Cochin',
  marginVertical: 20,
  color: "#FFFFFF",
  bold:true
  } , 

    SectionStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      margin: 10
  },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
    },
    ImageStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      alignItems: 'center'
  },
    logInButton:{
      backgroundColor: '#FFFFFF',
      color: '#000080',
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize:  33,
      marginTop: 20,
      width: 300,
      height: 40,
      paddingHorizontal: 10,
      borderRadius: 50,
  
    },
    inputStyle: {

      marginTop: 20,
      width: 300,
      height: 40,
      paddingHorizontal: 10,
      borderRadius: 50,
      backgroundColor: '#286086',
    },
  });
  export default login;
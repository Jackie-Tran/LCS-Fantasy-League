import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet,Alert,TouchableOpacity,Text, View,Button,TextInput,TouchableHighlight,Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { createTabNavigator } from 'react-navigation';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Firebase from './Firebase';
class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: ''
}
handleSignUp = () => {
  const { email, password } = this.state
  Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Homescreen'))
      .catch(error => console.log(error))
}
    render () 
    {
        return (
          <View style={styles.container}>
            <Text style={styles.baseText}> 
                Signup 
            </Text>
          <TextInput placeholder="Enter Username"
             secureTextEntry={false}
             placeholderTextColor="#FFFFFF" 
             style={styles.inputStyle}
             value={this.state.name}
                    onChangeText={name => this.setState({ name })} />

            <TextInput placeholder="Enter Email"
             secureTextEntry={false}
             onChangeText = {email => this.setState ({email})}
             value = {this.state.email}
             placeholderTextColor="#FFFFFF" 
             style={styles.inputStyle} />
              <TextInput
                secureTextEntry={false}
                placeholder="Enter Password" 
                placeholderTextColor="#FFFFFF" 
                style={styles.inputStyle}
              />
              <TextInput
                secureTextEntry={true}
                onChangeText = {password => this.setState ({password})}
                value = {this.state.password}
                placeholder="Confirm Password" 
                placeholderTextColor="#FFFFFF" 
                style={styles.inputStyle}
              />
          <TouchableOpacity 
          onPress={this.handleSignUp}>
          <Text style = {styles.logInButton}  >Signup </Text>
          </TouchableOpacity>
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
  export default Signup;
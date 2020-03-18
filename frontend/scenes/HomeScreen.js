
import React, { Component } from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity, Text, View, Button, TextInput, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry, Dimensions } from 'react-native';


class HomeScreen extends Component {
  render() {
    return (

      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        resizeMode='cover'
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}>
        <View style={styles.container}>
          <Text>Fantasy App!</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.SignInButton}>Signup </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('login')}>
            <Text style={styles.logInButton}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10
  },
  logInButton: {
    backgroundColor: '#FFFFFF',
    color: '#000080',
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 33,
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
  },

  SignInButton: {
    backgroundColor: 'rgba(52, 52, 52, 1)',
    color: '#000080',
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 33,
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
});
export default HomeScreen;
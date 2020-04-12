import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Alert, TouchableOpacity, Text, View, Button, TextInput, TouchableHighlight, Image, SafeAreaView } from 'react-native';

import * as  firebase from 'firebase'

class Login extends Component {
  state =
    {
      Email: "",
      password: "",
      errorMessage: null
    };

  handleLogin = () => {
    const { email, password } = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.props.route.params.setAuthenticated(true))
      .catch(error => {
        let errorCode = error.code;
        console.log(errorCode)
        if (errorCode === 'auth/invalid-email') {
          Alert.alert(
            'Invalid Email'
          )
        }
        else if (errorCode === 'auth/wrong-password') {
          Alert.alert(
            'Wrong Password Try Again'
          )
        }
        else if (errorCode === 'auth/user-not-found') {
          Alert.alert(
            'Wrong Email'
          )
        }
        else {
          this.props.navigation.navigate('Login')
        }
      });


  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Image style={styles.image} source={require('../../assets/logo.png')} />
          <Text style={styles.title}>League of Legends{"\n"} Fantasy League</Text>
        </View>
        <View style={styles.authentication}>
          <TextInput placeholder="Enter Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            secureTextEntry={false}
            placeholderTextColor="#FFFFFF"
            style={styles.inputStyle} />
          <TextInput
            secureTextEntry={true}
            placeholder="Enter Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholderTextColor="#FFFFFF"
            style={styles.inputStyle}
          />
          <TouchableOpacity onPress={this.handleLogin} style={styles.logInButton}>
            <Text style={styles.loginText}>Login </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.baseText}>Dont have an account? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.link}  >Sign Up Now</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}  >Forgot Your Password </Text>
        </TouchableOpacity>
      </SafeAreaView>

    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171e24',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  titleContainer: {
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: '10%'
  },
  image: {
    width: 200,
    height: 200
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold'
  },
  baseText: {
    // fontFamily: 'Cochin',
    marginVertical: 20,
    color: "#FFFFFF"
  },
  link: {
    // fontFamily: 'Cochin',
    marginVertical: 20,
    color: "#A997DF",
    fontWeight: 'bold'
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    alignItems: 'center'
  },
  logInButton: {
    backgroundColor: '#5762D5',
    fontWeight: 'bold',
    marginTop: 20,
    padding: 2,
    borderRadius: 30
  },
  loginText: {
    color: '#D1E3DD',
    textAlign: 'center',
    fontSize: 33,
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
export default Login;
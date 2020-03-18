import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TouchableOpacity, Text, View, Button, TextInput, TouchableHighlight, Image } from 'react-native';

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
      .catch(error => console.log(error))
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: 300, height: 300 }} source={require('../images/lcs.png')} />
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
        <TouchableOpacity
          onPress={this.handleLogin}>
          <Text style={styles.logInButton}  >Login </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.baseText}>Dont have an account?</Text>
          <Button style={styles.baseText} title="Sign Up Now" onPress={() => this.props.navigation.navigate('Signup')}/>
        </View>
        <Button style={styles.base2Text} title="Forgot Password?" />
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
  baseText: {
    // fontFamily: 'Cochin',
    marginVertical: 20,
    color: "#FFFFFF"
  },
  base2Text: {
    // fontFamily: 'Cochin',
    marginVertical: 20,
    color: "#FFFFFF",
    fontWeight: 'bold'
  },

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
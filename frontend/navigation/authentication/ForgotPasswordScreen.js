import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TouchableOpacity, Text, View, Button, TextInput, TouchableHighlight, Image } from 'react-native';
import * as  firebase from 'firebase'
class ForgotPasswordScreen extends Component{
  state =
    {
      email: "",
      errorMessage: null
    };
    forgotPassword = () => {
      const { email} = this.state
      firebase.auth().sendPasswordResetEmail(email)
        .then(function (user) {
          alert('Please check your email...')
        }).catch(function (e) {
          console.log(e)
        })
    }
  render ()
  {
    return (
      <View style={styles.container}>
        <View>
        <Image style={{ width: 200, height: 200,alignSelf:'center'}} source={require('./complaint.png')} />
        <Text style = {{color: 'white',fontSize: 20, alignSelf:'center'}}> FORGOT YOUR PASSWORD???!? </Text>
        <Text style = {{color: 'white',alignSelf:'center'}}> Enter your email and hit send </Text>

        </View>
        <View>
        <TextInput placeholder="Enter Email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          secureTextEntry={false}
          placeholderTextColor="#FFFFFF"
          style={styles.inputStyle} />
        <TouchableOpacity
         onPress={this.forgotPassword()}>
         <Text style={styles.button}> Send Email </Text>
       </TouchableOpacity>
       </View>

      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent: 'center',
    flexDirection : 'column',
    backgroundColor: '#02075d',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#286086',
  },
  button: 
  {     backgroundColor: '#FFFFFF',
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
  }
});

export default ForgotPasswordScreen;
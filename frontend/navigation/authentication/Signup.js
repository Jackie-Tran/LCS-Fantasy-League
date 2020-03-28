import React, { Component } from 'react';
import { StyleSheet, Alert, TouchableOpacity, Text, View, Button, TextInput, TouchableHighlight, Image } from 'react-native';
import Firebase, { db } from '../../Firebase';

class Signup extends Component {
  
  dbRef = Firebase.firestore().collection('users');
  state = {
    title: '',
    author: '',
    mobile: '',
    isLoading: false
  };

  handleSignUp = () => {
    const { displayName, email, password } = this.state;
    this.dbRef = Firebase.firestore().collection('users');
    Firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      if (user) {
        user.updateProfile({
          displayName: displayName,
          photoURL : "https://assets.entrepreneur.com/content/3x2/2000/20190502194704-ent19-june-editorsnote.jpeg"
        }
        ).then(({user}) => {
          
        }) 
        .catch((err) => {console.log(err)});
        this.props.route.params.setAuthenticated(true);
      }
      console.log(user);
    })
    .catch((err) => {
      alert(err);
    });
    // Firebase.auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(() => this.props.route.params.setAuthenticated(true))
    //   .catch(error => console.log(error))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.baseText}>
          Signup
            </Text>
        <TextInput placeholder="Enter Username"
          secureTextEntry={false}
          placeholderTextColor="#FFFFFF"
          style={styles.inputStyle}
          value={this.state.displayName}
          onChangeText={displayName => this.setState({ displayName })} />

        <TextInput placeholder="Enter Email"
          secureTextEntry={false}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
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
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholder="Confirm Password"
          placeholderTextColor="#FFFFFF"
          style={styles.inputStyle}
        />
        <TouchableOpacity
          onPress={this.handleSignUp.bind(this)}>
          <Text style={styles.logInButton}  >Signup </Text>
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
  {
    //fontFamily: 'Cochin',
    marginVertical: 20,
    color: "#FFFFFF"
  },
  base2Text:
  {
    //fontFamily: 'Cochin',
    marginVertical: 20,
    color: "#FFFFFF",
    fontWeight: "bold"
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
export default Signup;
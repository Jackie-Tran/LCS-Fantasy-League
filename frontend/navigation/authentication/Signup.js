import React, { Component } from 'react';
import { StyleSheet, Alert, TouchableOpacity, Text, View, Button, TextInput, TouchableHighlight, Image, SafeAreaView } from 'react-native';
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
    Firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          user.updateProfile({
            displayName: displayName,
            photoURL: "https://assets.entrepreneur.com/content/3x2/2000/20190502194704-ent19-june-editorsnote.jpeg"
          }
          ).then(({ user }) => {
            console.log(user);
          })
            .catch((err) => { console.log(err) });
          this.props.route.params.setAuthenticated(true);
        }
      })
      .catch((error) => {

        let errorMessage = error.code;
        if (errorMessage === "auth/email-already-in-use") {
          Alert.alert("Email already in use.");
        }
        else if (errorMessage === "auth/invalid-email") {
          Alert.alert("Invalid Email");
        }
        else if (errorMessage === "auth/weak-password") {
          Alert.alert("weakPassword");
        }
        else {
          console.log("errorCode")
        }
      });

    // Firebase.auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(() => this.props.route.params.setAuthenticated(true))
    //   .catch(error => console.log(error))
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Join the Battle
          </Text>
          <Text style={styles.subtitle}>
            Please enter the following information
          </Text>
        </View>
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
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholder="Confirm Password"
          placeholderTextColor="#FFFFFF"
          style={styles.inputStyle}
        />
        <TouchableOpacity
          onPress={this.handleSignUp.bind(this)} style={styles.logInButton}>
          <Text style={styles.loginText}  >Signup </Text>
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
    alignItems: 'center',
    textAlign: 'center'
  },
  title:
  {
    //fontFamily: 'Cochin',
    fontSize: 56,
    marginVertical: 20,
    fontWeight: 'bold',
    color: "#FFFFFF"
  },
  subtitle:
  {
    //fontFamily: 'Cochin',
    fontSize: 18,
    color: "#FFFFFF",
  },
  logInButton: {
    backgroundColor: '#5762D5',
    fontWeight: 'bold',
    width: '50%',
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
export default Signup;
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const LoginScreen = ({ navigation, route }) => {

  let { setAuthenticated } = route.params;

  return (
    <View style={styles.container}>
        <Button title="Login" onPress={() => setAuthenticated(true)}/>
        <Button title="Register" onPress={() => navigation.navigate('Register')}/>
        <Button title="Forgot Password" onPress={() => navigation.navigate('Forgot')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
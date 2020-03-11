import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RegisterScreen = () => {

  return (
    <View style={styles.container}>
        <Text>This is the register screen</Text>
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

export default RegisterScreen;
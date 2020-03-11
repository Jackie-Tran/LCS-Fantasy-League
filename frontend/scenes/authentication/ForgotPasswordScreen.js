import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ForgotPasswordScreen = () => {

  return (
    <View style={styles.container}>
        <Text>This is the forgot passowrd screen</Text>
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

export default ForgotPasswordScreen;
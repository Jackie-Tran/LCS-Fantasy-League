import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,Alert, Text, View,Button,TextInput,TouchableHighlight,Image} from 'react-native';

import * as  firebase from 'firebase'
import HomeScreen from './HomeScreen'


class Draft extends Component {
  state = 
  {
   
  }; 

    render () 
    {
        return (
          <View style={styles.container}>
              <Text>Choose your Players </Text>
            <TextInput placeholder="Search by Players"
             secureTextEntry={false}
             placeholderTextColor="#FFFFFF" 
             style={styles.inputStyle} />
             
            <View style = {styles.filterButton}>
            <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
       >
         <Text> Top </Text>
       </TouchableOpacity>
            <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
       >
         <Text> Jg </Text>
       </TouchableOpacity>
            <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
       >
         <Text> Mid </Text>
       </TouchableOpacity>
           <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
       >
         <Text> Adc </Text>
       </TouchableOpacity>
      <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
       >
         <Text> Support </Text>
       </TouchableOpacity> 
             </View>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <Button
          title="Playername"
          onPress={() => Alert.alert('Simple Button pressed')}
        /> 
      </ScrollView>
    </SafeAreaView>
          </View>

        );
      };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#808080',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10
  }, 
  scrollView: {
      marginBottom:100,
    backgroundColor: 'black',
    width:400,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 80
  },
  filterButton:{
    borderTopRightRadius: 50,
    flex: 1/28, 
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexDirection: 'row',
    textAlign: 'center',
    fontSize:  20,
    backgroundColor: 'black',
    height: 2,
 
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
  export default Draft;
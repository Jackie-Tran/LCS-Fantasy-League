
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React, { Component } from 'react';

import firebase from 'firebase';


let fullWidth = Dimensions.get('window').width;
let fullHeight = Dimensions.get('window').height;

const League = (props) => {

    return (
        <View style={styles.item}>
        <Image source={props.data.imagePlaceHolder} style={{ width: 75, height: fullHeight/6}} />
        <View style={styles.data}>
          <Text style={{ alignSelf: "flex-start", color: 'white' }}> {props.data.player}</Text>
          <Text style={{ alignSelf: "flex-start", color: 'white' }}> {props.data.Team} </Text>
          <Text style={{ alignSelf: "flex-start", color: 'white' }}> {props.data.Nationality}</Text>
        </View>
        <Image source={props.data.imagePlaceHolder2} style={{position:"absolute", right:fullWidth/8, width: 40, height: 40,  alignSelf: "center" ,}} />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text:
    {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 29,
      color: 'white',
    },
    playerpic: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginVertical: 0,
      marginHorizontal: 16,
    },
    item: {
      flex: 1,
      backgroundColor: '#292929',
      flexDirection: 'row',
      //alignItems:'flex-start',
      marginVertical: 3,
      marginHorizontal:10,
    },
    data: {
      flexWrap:'nowrap',
      position:'relative',
      left: fullWidth/20,
      justifyContent: 'center',
    },
    dataPts: {
      flexWrap:'nowrap',
      position:'relative',
      left: fullWidth/3,
      //justifyContent: 'center',
    },
  });

export default League;
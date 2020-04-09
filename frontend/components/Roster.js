
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
          <Text style={{ alignSelf: "center", color: 'white' }}> {props.data.player}</Text>
          <Text style={{ alignSelf: "center", color: 'white' }}> {props.data.Team} </Text>
          <Text style={{ alignSelf: "center", color: 'white' }}> {props.data.Cost}</Text>
        </View>
        <Image source={props.data.imagePlaceHolder2} style={{position:"absolute", right:fullWidth/3, width: 40, height: 40,  alignSelf: "center" ,}} />
       < View  style={{position:"absolute", right:fullWidth/9, alignSelf: "center", }}>
          <Text style={{ alignSelf: "center", color: 'white' }}> 10000</Text>
          <Text style={{ alignSelf: "center", color: 'white' }}> Pts</Text>
        </View>
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
      marginVertical: 3,
      marginHorizontal:10,
    },
    playerDescription: {
      flex: 1,
      flexDirection: 'column',
      
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignSelf: 'flex-start',
      marginVertical: 0,
      marginRight: 0,
    },
    title: {
      fontSize: 32,
    },
    data: {
      flexWrap:'nowrap',
      position:'relative',
      justifyContent: 'center',
    },
    dataPts: {
      flexWrap:'nowrap',
      position:'relative',
      left: fullWidth/3,
      justifyContent: 'center',
    },
  });

export default League;
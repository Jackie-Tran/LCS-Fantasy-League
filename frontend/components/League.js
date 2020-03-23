import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase from 'firebase';


let fullWidth = Dimensions.get('window').width;
let fullHeight = Dimensions.get('window').height;

const League = (props) => {

    return (
      <TouchableOpacity style={styles.container} onPress={() => {firebase.auth().onAuthStateChanged(
          (user) => { console.log(user.providerData) });
          props.gotoLeague(props.data)}}>
        <Image style={styles.image} source={require('../assets/league_icon.png')}/>
        <View style={styles.data}>
            <Text style={styles.title}>{props.data.name}</Text>
            <Text style={styles.subText}>{(props.data.players).length} / {props.data.maxPlayers} Players</Text>
            <Text style={styles.subText}>Buy-in Price: $3000</Text>
            <Text style={styles.subText}>Id: {props.data._id}</Text>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c2a35',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: fullWidth/5,
        margin: fullWidth/100
    },
    data: {
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        textDecorationLine: "underline",
        fontWeight: "bold",
        fontSize: 18
    },
    subText: {
        color: '#9daab3'
    },
    image: {
        width: fullWidth/3,
        height: fullHeight/6,
    }
});

export default League;
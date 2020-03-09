import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';


let fullWidth = Dimensions.get('window').width;
let fullHeight = Dimensions.get('window').height;

const League = (props) => {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/league_icon.png')}/>
        <View style={styles.data}>
            <Text style={styles.title}>{props.name}</Text>
            <Text style={styles.subText}>{props.numPlayers} / {props.maxPlayers} Players</Text>
            <Text style={styles.subText}>Buy-in Price: {props.price}</Text>
        </View>
      </View>
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
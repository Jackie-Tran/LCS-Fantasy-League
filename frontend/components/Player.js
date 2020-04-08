import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

let fullWidth = Dimensions.get('window').width;
let fullHeight = Dimensions.get('window').height;

const Player = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => {props.selectPro(props.id)}}>
            <Image style={styles.image} source={require('../assets/proPlayerIcon.jpg')} />
            <View style={styles.playerData}>
              <Text style={styles.text}>{props.ign}</Text>
              <Text style={styles.text}>{props.team}</Text>
              {/* <Text style={styles.text}>{props.role}</Text> */}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#363636',
        flexDirection: 'row',
        height: fullHeight/7,
        margin: fullWidth/75,
        padding: '1%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: '20%',
        height: '90%'
    },
    playerData: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'white',
        fontSize: 24
    },
});

export default Player;


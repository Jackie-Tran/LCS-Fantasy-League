import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import * as endpoints from '../constants/endpoints';

let fullWidth = Dimensions.get('window').width;
let fullHeight = Dimensions.get('window').height;

const Player = (props) => {

    const [image, setImage] = React.useState('');

    let getProImage = (ign) => {
        axios.get(endpoints.GETPROIMAGE_EP(ign), {responseType: 'arraybuffer'})
        .then(res => {
            setImage(Buffer.from(res.data, 'binary').toString('utf-8'));
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => {props.selectPro(props); getProImage(props.ign)}}>
            <Image style={styles.image} source={{url: endpoints.GETPROIMAGE_EP(props.ign)}} />
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
        justifyContent: 'space-between',
        borderRadius: 15
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


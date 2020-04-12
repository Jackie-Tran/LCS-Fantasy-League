import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase from 'firebase';


let fullWidth = Dimensions.get('window').width;
let fullHeight = Dimensions.get('window').height;

const Match= (props) => {

    return (
      <TouchableOpacity style={styles.container}onPress={() => 
        props.gotoMatch(props.data)} >
        <View style={{flex: 1,justifyContent:"center", alignItems:"center" , flexDirection: 'column'}}>
            <View style ={{flex:1, flexDirection: 'row',alignItems:'space-around' ,alignContent: 'space-around' }}>
            <View style ={{flex:1,alignItems:'space-around' ,alignContent: 'space-around' }}>
                <Text style={styles.title}>{ props.data[0].username}</Text>
                </View>
                <Text style= {{color:"white", fontSize: 18}} >{ props.data[0].score}</Text>
            </View>
        
                <View style ={{flex:1, flexDirection: 'row',alignItems:'space-around' ,alignContent: 'space-around' }}>
                <View style ={{flex:1,alignItems:'space-around' ,alignContent: 'space-around' }}>
                <Text style={styles.title}>{ props.data[1].username}</Text>
                </View>
                <Text style= {{color:"white", fontSize: 18}}>{ props.data[1].score}</Text>
                </View>
        </View>
        {/* </View> */}
            {/* <Text style={styles.title}>{props.data.name}</Text>
            <Text style={styles.subText}>{(props.data.players).length} / {props.data.maxPlayers} Players</Text>
            <Text style={styles.subText}>          VS</Text>
            <Text style={styles.subText}>Id: {props.data._id}</Text> */}
        
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius:6,
        backgroundColor: '#1e689e',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: fullWidth/5,
        height: fullHeight/10,
        margin: 10,
    },
    data: {
        justifyContent: 'center',
    },
    title: {
        alignSelf: 'flex-start',
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

export default Match;
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

let fullWidth = Dimensions.get('window').width;
let fullHeight = Dimensions.get('window').height;

const Player = (props) => {
    return (
        <View>
            <Text>This is the player component</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Player;


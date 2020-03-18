import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Button, TextInput, TouchableHighlight } from 'react-native';

import { AppRegistry, Dimensions, FlatList, Image } from 'react-native';

import Constants from 'expo-constants';


function Item({ player, Team, Cost, position, position2 }) {
  return (
    <View style={styles.item}>
      <Image source={position} style={{ width: 75, height: 75, marginLeft: 10 }} />
      <View style={styles.data}>
        <Text style={{ alignSelf: "center", color: 'white' }}> {player}</Text>
        <Text style={{ alignSelf: "center", color: 'white' }}> {Team} </Text>
        <Text style={{ alignSelf: "center", color: 'white' }}> {Cost}</Text>
      </View>
      <Image source={position2} style={{ width: 40, height: 40, marginLeft: 25, alignSelf: "center" }} />
      <View style={styles.data}>
        <Text style={{ alignSelf: "center", color: 'white' }}> 10000 </Text>
        <Text style={{ alignSelf: "center", color: 'white' }}> Pts</Text>
      </View>
    </View>
  );
}

class MyTeam extends Component {

  constructor(props) {
    super(props);

    this.wasteOfTime = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        player: 'Bjersen',
        Team: 'TSM',
        Cost: '1,000,000',
        imagePlaceHolder: require('../images/bjerg.jpg'),
        imagePlaceHolder2: require('../images/Bottom_icon.png')
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        player: 'Doublift',
        Team: 'TSM',
        Cost: '1,000,000',
        imagePlaceHolder: require('../images/double.jpg'),
        imagePlaceHolder2: require('../images/Bottom_icon.png')
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        player: 'Svenskeren',
        Team: 'TSM',
        Cost: '1,000,000',
        imagePlaceHolder: require('../images/sven.jpg'),
        imagePlaceHolder2: require('../images/Bottom_icon.png')
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        player: 'BioFrost',
        Team: 'TSM',
        Cost: '1,000,000',
        imagePlaceHolder: require('../images/bio.jpg'),
        imagePlaceHolder2: require('../images/Bottom_icon.png')
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        player: 'Hauntzer',
        Team: 'TSM',
        Cost: '1,000,000',
        imagePlaceHolder: require('../images/haunt.jpg'),
        imagePlaceHolder2: require('../images/Bottom_icon.png')
      },
    ];
  }

  render() {
    return (
      <View style={{ backgroundColor: '#171e24' }}>
        <View>
          <Text style={styles.text}> Your Lineup </Text>
        </View>
        <FlatList data={this.wasteOfTime} renderItem={({ item }) => <Item player={item.player} Team={item.Team} Cost={item.Cost} position={item.imagePlaceHolder} position2={item.imagePlaceHolder2} />
        }
          keyExtractor={item => item.id} />


      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  text:
  {
    alignSelf: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 29,
    color: 'white',
  },
  playerpic: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'flex-start',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#292929',
    padding: 20,
    flexDirection: 'row',
    marginVertical: 1,
    marginHorizontal: 16,
  },
  playerDescription: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: '',
    alignSelf: 'flex-start',
    marginVertical: 8,
    marginRight: 100,
  },
  title: {
    fontSize: 32,
  },
  data: {
    justifyContent: 'center',
  },
});
export default MyTeam;

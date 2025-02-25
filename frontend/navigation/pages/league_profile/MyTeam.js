import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Button, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import { AppRegistry, Dimensions, FlatList, Image } from 'react-native';
import Constants from 'expo-constants';
import Roster from '../../../components/Roster';
import { SafeAreaView } from 'react-native-safe-area-context';

import axios from 'axios';
import * as endpoints from '../../../constants/endpoints';
let fullWidth = Dimensions.get('window').width;
let fullHeight = Dimensions.get('window').height;
let user = firebase.auth().currentUser

class MyTeam extends Component {
  state =
    {
      roster: [
        
      ],
      isRefreshing: false,
    }

  getPlayers = (uid) => {
    let myArray = [];
    let i =0; 
    this.setState({ isRefreshing: true });
    axios.get(endpoints.GETROSTERINLEAGUE_EP(this.props.route.params.data._id,"joseph"))
      .then(rosterPlayers => {
        
        rosterPlayers.data.forEach(yourPlayerNames => {
          console.log("PLAYER ANMES" + yourPlayerNames)
          axios.get(endpoints.GETPROSBYIGN_EP(yourPlayerNames))
          .then(proPlayer=> {
             let fullData = proPlayer.data[0]
            
              let newPlayer = {
              player: fullData.ign,
              Team: fullData.team,
              Nationality: fullData.nationality,
              imagePlaceHolder: "http://54.174.209.143:3000/players/images/"+fullData.ign.toLowerCase().replace(" ", ""),
              imagePlaceHolder2: require('../../../images/Bottom_icon.png')
            }
           let roster = [...this.state.roster];
            roster.push(newPlayer);
            
            this.setState({ roster:roster,isRefreshing:false});
         
            });
          })
          .catch(err => {
            console.log("error" + err)
          })    

        })
      .catch(err => {
        console.log("error" + ereror)
      })
  }
  getCurrentUser = () => {
    console.log('Getting current user');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("someones id" + user.uid)
        // user exists
        this.setState({
          currentUID: user.uid
        })
      }
    });
  }
  componentDidMount() {
    this.getPlayers(this.getCurrentUser());
}
  render() {
    return (
      <View style={{ backgroundColor: '#171e24' }}>
        <Text style={styles.text}> Your Lineup </Text>
        <FlatList refreshing={this.state.isRefreshing} onRefresh={() => this.getRoster()} data={this.state.roster} renderItem={({ item }) => (
          <Roster data={item} />
        )} />
      </View>

    );
  };
}

const styles = StyleSheet.create({

  text:
  {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 29,
    color: 'white',
  },

});
export default MyTeam;

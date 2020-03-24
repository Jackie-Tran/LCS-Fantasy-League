import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Header, TouchableOpacity, Text, View, Button, TextInput, TouchableHighlight, Image } from 'react-native';
import Leaderboard from 'react-native-leaderboard';
import { Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import firebase from 'firebase';
import axios from 'axios';
import * as endpoints from '../../../constants/endpoints';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class Scoreboard extends Component {

  state =
    {
      data: [
        // {
        //   userName: 'Danny', iconUrl:
        //     "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ec405492-b7bb-4e17-af83-6902727e0271/dbt8wd0-476e1dad-49a7-4407-9fea-7bd3a8f3f3c3.png/v1/fill/w_829,h_829,q_80,strp/_league_of_legends__trundle_icon_by_hadefire_dbt8wd0-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODI5IiwicGF0aCI6IlwvZlwvZWM0MDU0OTItYjdiYi00ZTE3LWFmODMtNjkwMjcyN2UwMjcxXC9kYnQ4d2QwLTQ3NmUxZGFkLTQ5YTctNDQwNy05ZmVhLTdiZDNhOGYzZjNjMy5wbmciLCJ3aWR0aCI6Ijw9ODI5In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qdlymyx6V6Aji67upz-DC-zF8hPbXHOSq6HrhYhgYbY", highScore: 100000000000
        // },
        // { userName: 'Joseph', iconUrl: 'https://i.redd.it/pab0fxmltgv01.jpg', highScore: 0 },
        // { userName: 'Jackie', iconUrl: 'https://vectorified.com/images/lee-sin-icon-11.png', highScore: -Infinity },
        // { userName: 'Jenny', iconUrl: 'https://4.bp.blogspot.com/-tdxpnSzbcZA/W3Mx4y8kiZI/AAAAAAABFV0/hF4o7DwC-L8oDKz7lGdA-wT5J8dYEu5ygCLcBGAs/s200/3599.jpg', highScore: 120 }
      ]
    }

  getPlayers = () => {
    axios.get(endpoints.GETPLAYERSINLEAGUE_EP(this.props.route.params.data._id))
    .then( ({ data }) => {
      data.forEach(player => {
        let newPlayer = {
          userName: player.uid,
          iconUrl: 'https://vectorified.com/images/lee-sin-icon-11.png',
          score: player.score
        }
        this.setState({
          data: [...this.state.data, newPlayer]
        });
      });
    })
    .catch( err => {
      // console.log(err);
    })
  }

  joinLeague = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        axios.put(endpoints.ADDPLAYERTOLEAGUE_EP(this.props.route.params.data._id), {
          uid: user.uid
        })
          .then(res => {
            // Update the player list
            console.log("added player");
            this.getPlayers();
          })
          .catch(err => {
            alert('User is already in this league');
          });
      } else {
        // No user signed in
        alert('no user signed in');
      }
    });
  }

  isInLeague = () => {
    // Get current user
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Check if user is in the league
        this.setState({
          currentUser: user.uid
        });
      } else {
        alert("You are not signed in");
      }
    });
  }

  componentDidMount() {
    this.getPlayers();
    // console.log(this.state);
    // Check if the current user is in the league
  }



  render() {
    return (

      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.route.params.data.name}</Text>
          <Image style={styles.picture} source={require('../../../images/lcs.png')} />
        </View>
        <View style={styles.scoreboardContainer}>
          <Text style={styles.subtext}>Current Standings</Text>
          <Leaderboard
            evenRowColor='#FF00FF'
            oddRowColor='#A9A9A9'
            data={this.state.data}
            icon='iconUrl'
            sortBy='highScore'
            labelBy='userName' />
        </View>
        <View style={styles.buttonContainer}>
          {
            
          }
          <TouchableOpacity style={styles.button} onPress={() => this.joinLeague()}>
            <Text>JOIN LEAGUE</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000080',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    color: 'white',
    fontSize: 46,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  titleContainer: {
    flex: 1,
  },
  scoreboardContainer: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  subtext: {
    color: 'white',
    fontSize: 32
  },
  buttonContainer: {
    flex: 0.25,
    justifyContent: 'center',
    width: screenWidth,
    alignItems: 'center'
  },
  button: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    width: '40%',
    height: '50%'

  },
  picture:
  {
    alignSelf: 'center',
    height: 200,
    width: 200,
    marginBottom: 0,
  },
});
export default Scoreboard;
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Header, TouchableOpacity, Text, View, Button, TextInput, TouchableHighlight, Image } from 'react-native';
import Leaderboard from 'react-native-leaderboard';
import { Dimensions } from "react-native";
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class LeagueProfile extends Component {

  state =
    {
      data: [
        {
          userName: 'Danny', iconUrl:
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ec405492-b7bb-4e17-af83-6902727e0271/dbt8wd0-476e1dad-49a7-4407-9fea-7bd3a8f3f3c3.png/v1/fill/w_829,h_829,q_80,strp/_league_of_legends__trundle_icon_by_hadefire_dbt8wd0-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODI5IiwicGF0aCI6IlwvZlwvZWM0MDU0OTItYjdiYi00ZTE3LWFmODMtNjkwMjcyN2UwMjcxXC9kYnQ4d2QwLTQ3NmUxZGFkLTQ5YTctNDQwNy05ZmVhLTdiZDNhOGYzZjNjMy5wbmciLCJ3aWR0aCI6Ijw9ODI5In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qdlymyx6V6Aji67upz-DC-zF8hPbXHOSq6HrhYhgYbY", highScore: 100000000000
        },
        { userName: 'Joseph', iconUrl: 'https://i.redd.it/pab0fxmltgv01.jpg', highScore: 0 },
        { userName: 'Jackie', iconUrl: 'https://vectorified.com/images/lee-sin-icon-11.png', highScore: -Infinity },
        { userName: 'Jenny', iconUrl: 'https://4.bp.blogspot.com/-tdxpnSzbcZA/W3Mx4y8kiZI/AAAAAAABFV0/hF4o7DwC-L8oDKz7lGdA-wT5J8dYEu5ygCLcBGAs/s200/3599.jpg', highScore: 120 }]
    }

  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.text} >LEAGUE NAME</Text>
        <Image style={styles.picture} source={require('../images/lcs.png')} />
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.button}>
            <Text style={styles.text} > Scoreboard </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}>
            <Text style={styles.text} > Matchups </Text>
          </TouchableOpacity>
        </View>
        <Leaderboard
          evenRowColor='#FF00FF'
          oddRowColor='#A9A9A9'
          data={this.state.data}
          icon='iconUrl'
          sortBy='highScore'
          labelBy='userName' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000080',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    flexDirection: 'column',
    margin: 10
  },
  view: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  button: {
    borderColor: 'white', borderWidth: 2, borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    height: 70,
    width: screenWidth / 2,
    backgroundColor: 'orange'
  },
  text:
  {
    alignSelf: 'center',
    marginBottom: 50,
    fontWeight: 'bold',
    fontSize: 29,
    color: 'white',
  },
  picture:
  {
    alignSelf: 'center',
    height: 300,
    width: 300,
    marginBottom: 100,
  },
  baseText:
  {
    fontFamily: 'Cochin',
    marginVertical: 20,
    color: "#FFFFFF"
  },
  base2Text:
  {
    fontFamily: 'Cochin',
    marginVertical: 20,
    color: "#FFFFFF",
    fontWeight: 'bold'
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    margin: 10
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    alignItems: 'center'
  },
  logInButton: {
    backgroundColor: '#FFFFFF',
    color: '#000080',
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 33,
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,

  },
  inputStyle: {

    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#286086',
  },
});
export default LeagueProfile;
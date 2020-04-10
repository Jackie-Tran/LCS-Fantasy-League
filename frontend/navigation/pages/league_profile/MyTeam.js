import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Button, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import { AppRegistry, Dimensions, FlatList, Image } from 'react-native';
import Constants from 'expo-constants';
import Roster from '../../../components/Roster';
import { SafeAreaView } from 'react-native-safe-area-context';

let fullWidth = Dimensions.get('window').width;
let fullHeight = Dimensions.get('window').height;
let user = firebase.auth().currentUser

class MyTeam extends Component {
  state =
    {
      roster: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          player: 'Bjersen',
          Team: 'TSM',
          Cost: '1,000,000',
          imagePlaceHolder: require('../../../images/bjerg.jpg'),
          imagePlaceHolder2: require('../../../images/Bottom_icon.png')
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          player: 'Doublift',
          Team: 'TSM',
          Cost: '1,000,000',
          imagePlaceHolder: require('../../../images/double.jpg'),
          imagePlaceHolder2: require('../../../images/Bottom_icon.png')
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          player: 'Svenskeren',
          Team: 'TSM',
          Cost: '1,000,000',
          imagePlaceHolder: require('../../../images/sven.jpg'),
          imagePlaceHolder2: require('../../../images/Bottom_icon.png')
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          player: 'BioFrost',
          Team: 'TSM',
          Cost: '1,000,000',
          imagePlaceHolder: require('../../../images/bio.jpg'),
          imagePlaceHolder2: require('../../../images/Bottom_icon.png')
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          player: 'Hauntzer',
          Team: 'TSM',
          Cost: '1,000,000',
          imagePlaceHolder: require('../../../images/haunt.jpg'),
          imagePlaceHolder2: require('../../../images/Bottom_icon.png')
        },
      ],
      isRefreshing: false,
    }

  getPlayers = () => {
    let i = 0;
    axios.get(endpoints.GETROSTERINLEAGUE_EP(this.props.route.params.data._id, user.uid))
      .then(({ data }) => {
        data.forEach(name => {
          let newPlayer = {
            player: name,
            Team: 'TSM',
            Cost: '1,000,000',
            imagePlaceHolder: require('../../../images/bjerg.jpg'),
            imagePlaceHolder2: require('../../../images/Bottom_icon.png')
          }
          let roster = [...this.state.roster];
          roster.push(newPlayer);
          this.setState({ roster });
        });
        console.log(this.state)
      })
      .catch(err => {
        // console.log(err);
      })
  }

  render() {
    return (
      <View style={{ backgroundColor: '#171e24' }}>
        <Text style={styles.text}> Your Lineup </Text>
        <FlatList refreshing={this.state.isRefreshing} onRefresh={() => this.getRoster()} data={this.state.roster} renderItem={({ item }) => (
          <Roster data={item} />
        )} />
      </View>
      // {/* <SafeAreaView style={{ backgroundColor: '#171e24' }}>
      //   <View>
      //     <Text style={styles.text}> Your Lineup </Text>
      //   </View>
      //   <FlatList data={this.wasteOfTime} renderItem={({ item }) => <Item player={item.player} Team={item.Team} Cost={item.Cost} position={item.imagePlaceHolder} position2={item.imagePlaceHolder2} />
      //   }
      //     keyExtractor={item => item.id} />
      // </SafeAreaView> */}
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

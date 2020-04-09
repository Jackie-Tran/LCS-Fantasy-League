import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View, TextInput, Alert } from 'react-native';

import Player from '../../../components/Player';
import { FlatList } from 'react-native-gesture-handler';

import firebase from 'firebase';
import axios from 'axios';
import * as endpoints from '../../../constants/endpoints';


class Draft extends Component {

  state = {
    searchBar: '',
    currentRole: 'top',
    pros: [],
    isRefreshing: false,
  }

  getCurrentUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user exists
        this.setState({
          currentUID: user.uid
        })
      }
    });
  }

  getPlayersByRole = (role) => {
    this.setState({currentRole: role});
    axios.get(endpoints.GETPLAYERSBYROLE_EP + role)
      .then(res => {
        let pros = res.data;
        let availablePros = pros.filter(pro => {return !this.state.activePros.includes(pro.ign);});
        this.setState({ 
          pros: availablePros
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getProsInLeague = () => {
    axios.get(endpoints.GETPROSINLEAGUE_EP(this.props.route.params.data._id))
      .then(res => {
        this.setState({ activePros: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addProToTeam = () => {
    axios.put(endpoints.ADDPROTOLEAGUE_EP(this.props.route.params.data._id, this.state.currentUID), {
      pro: this.state.selectedPro.ign
    })
      .then(res => {
        Alert.alert(
          'Congratulations!',
          'You have successfully drafted ' + this.state.selectedPro.ign + ' to your team.',
          ['Ok'],
        );
        this.getProsInLeague();
        this.getPlayersByRole(this.state.currentRole);
      })
      .catch(err => {
        alert(err.response.data);
      });
  }

  selectPro = (data) => {
    this.setState({
      selectedPro: {
        id: data.id,
        ign: data.ign,
        role: data.role,
        team: data.team,
      }
    });
  }

  lockinPro = () => {
    console.log(this.props.route.params.uid);
    Alert.alert(
      'Confirm Lockin',
      'Are you sure you want to lockin ' + this.state.selectedPro.ign,
      [
        { text: 'Yes', onPress: () => this.addProToTeam() },
        { text: 'No', onPress: () => console.log("No pressed") },
      ],
      { cancelable: false }
    )
  }

  createDraftUi = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Player</Text>
          <TextInput style={styles.searchBar} placeholder="Search LCS Player" />
        </View>
        <View style={styles.playerSelect}>
          <View style={styles.roles}>
            <TouchableOpacity style={styles.roleButton} onPress={() => this.getPlayersByRole('top')}>
              <Text style={styles.text}>Top</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton} onPress={() => this.getPlayersByRole('jungler')}>
              <Text style={styles.text}>Jungle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton} onPress={() => this.getPlayersByRole('mid')}>
              <Text style={styles.text}>Mid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton} onPress={() => this.getPlayersByRole('bot')}>
              <Text style={styles.text}>Bot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton} onPress={() => this.getPlayersByRole('support')}>
              <Text style={styles.text}>Support</Text>
            </TouchableOpacity>
          </View>
          {/* Players */}
          <FlatList data={this.state.pros} renderItem={({ item }) => (
            <Player ign={item.ign} team={item.team} role={item.role} id={item._id} selectPro={this.selectPro} />
          )} />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.lockinButton} onPress={() => this.lockinPro()}>
            <Text>Lock In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lockinButton} onPress={() => console.log(this.state)}>
            <Text>State</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  createDraftNotAvailableUi = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text, styles.notification}>Draft hasn't started or is over.</Text>
      </SafeAreaView>
    );
  }

  generateUi = () => {
    if (this.state.draftStarted) {
      return this.createDraftUi();
    } else {
      return this.createDraftNotAvailableUi();
    }
  }

  componentDidMount() {
    // When the page loads
    // TODO: fix asynchronous calls (if getProsInleague doesnt finish before getPlayersByRole, we get error and no pros are displayed)
    this.getProsInLeague();
    this.getPlayersByRole(this.state.currentRole);
    this.setState({ 
      draftStarted: this.props.route.params.data.draftStarted,
    });
    // Get current user
    this.getCurrentUser();
  }

  render() {
    return (
      this.generateUi()
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  header: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%'
  },
  searchBar: {
    backgroundColor: '#1c2a35',
    borderRadius: 10,
    paddingLeft: 10,
    width: '75%',
    height: '45%',
    color: 'white'
  },
  playerSelect: {
    backgroundColor: '#282828',
    flex: 5,
    width: '100%'
  },
  roles: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  roleButton: {
    backgroundColor: '#363636',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  footer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
  },
  lockinButton: {
    backgroundColor: '#FFFFFF',
    color: '#000080',
    width: '45%',
    height: '50%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  },
  notification: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'white'
  }
});
export default Draft;
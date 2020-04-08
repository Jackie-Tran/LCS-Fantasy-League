import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View, TextInput } from 'react-native';

import Player from '../../../components/Player';
import { FlatList } from 'react-native-gesture-handler';

import axios from 'axios';
import * as endpoints from '../../../constants/endpoints';


class DraftPage extends Component {

  state = {
    searchBar: '',
    currentRole: 'top',
    players: []
  }

  getPlayersByRole = (role) => {
    axios.get(endpoints.GETPLAYERSBYROLE_EP + role)
      .then(res => {
        this.setState({ players: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addProToTeam = () => {
    axios.put(endpoints.ADDPROTOLEAGUE_EP(this.props.route.params.data._id), {
      proId: this.state.selectedPro
    })
    .then( res => {

    })
    .catch(err => {

    });
  }

  selectPro = (proId) => {
    this.setState({
      selectedPro: proId
    });
  }

  componentDidMount() {
    // When the page loads
    this.getPlayersByRole(this.state.currentRole);
    this.setState({ draftStarted: this.props.route.params.data.draftStarted });
    console.log(this.props.route.params.data);
  }

  render() {
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
          <FlatList data={this.state.players} renderItem={({ item }) => (
            <Player ign={item.ign} team={item.team} role={item.role} id={item._id} selectPro={this.selectPro}/>
          )} />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.lockinButton}>
            <Text>Lock In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lockinButton} onPress={() => console.log(this.state)}>
            <Text>State</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  }
});
export default DraftPage;
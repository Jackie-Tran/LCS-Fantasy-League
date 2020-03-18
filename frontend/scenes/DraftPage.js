import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View, TextInput } from 'react-native';

import Player from '../components/Player';
import { FlatList } from 'react-native-gesture-handler';

import axios from 'axios';
import * as endpoints from '../constants/endpoints';


class DraftPage extends Component {

  getPlayers = () => {
    console.log("getPlayers");
  }

  componentDidMount() {
    // When the page loads
    this.getPlayers();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Player</Text>
          <TextInput style={styles.searchBar} placeholder="Search LCS Player"/>
        </View>
        <View style={styles.playerSelect}>
          <View style={styles.roles}>
            <TouchableOpacity style={styles.roleButton}>
              <Text>Top</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton}>
              <Text>Jungle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton}>
              <Text>Mid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton}>
              <Text>ADC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton}>
              <Text>Support</Text>
            </TouchableOpacity>
          </View>
          {/* Players */}
          <FlatList />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.lockinButton}>
            <Text>Lock In</Text>
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
  }
});
export default DraftPage;
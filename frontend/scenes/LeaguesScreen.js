import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import League from '../components/League';

import axios from 'axios';
import * as endpoints from '../constants/endpoints';

class LeaguesScreen extends React.Component {

    state = {
        leagues: []
    }

    getLeagues = () => {
        axios.get(endpoints.GETLEAGUES_EP)
        .then(res => {
            this.setState({leagues: res.data});
            console.log(this.state);
        })
        .catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.getLeagues();
    }

    render() {
        return (
        <SafeAreaView style={styles.container}>
            <FlatList data={this.state.leagues} renderItem={ ({ item }) => (
                <League name={item.name} numPlayers={item.players.length} maxPlayers={item.maxPlayers} price='$3000'/>
            )}/>
        </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#171e24',
      color: '#fff',
    },
});

export default LeaguesScreen;
  
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

    gotoLeague = (league) => {
        this.props.navigation.navigate('League', { data: league });
    }

    componentDidMount() {
        this.getLeagues();
    }

    render() {
        return (
        <SafeAreaView style={styles.container}>
            <FlatList data={this.state.leagues} renderItem={ ({ item }) => (
                <League data={item} gotoLeague={this.gotoLeague}/>
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
  
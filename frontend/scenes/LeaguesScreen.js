import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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
        <View style={styles.container}>
            <Text style={{color: '#fff'}}>Leagues Screen</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#262626',
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default LeaguesScreen;
  
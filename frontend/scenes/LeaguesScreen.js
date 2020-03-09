import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
        <View style={styles.container}>
            <League name="Justice League" numPlayers='0' maxPlayers='5' price='$3000'/>
            <League name="Justice League" numPlayers='0' maxPlayers='5' price='$3000'/>
            <League name="Justice League" numPlayers='0' maxPlayers='5' price='$3000'/>
            <League name="Justice League" numPlayers='0' maxPlayers='5' price='$3000'/>
            <League name="Justice League" numPlayers='0' maxPlayers='5' price='$3000'/>
            <League name="Justice League" numPlayers='0' maxPlayers='5' price='$3000'/>
        </View>
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
  
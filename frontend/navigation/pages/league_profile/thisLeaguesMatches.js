import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import Match from '../../../components/Match'; 

import axios from 'axios';
import * as endpoints from '../../../constants/endpoints';
import firebase from 'firebase';
import iMatch from '../league_profile/iMatch'
class Matches extends React.Component {

    state = {
        leagues: [],
        isRefreshing: false,
        weeksMatchups: []
    }


    getMatchups= () => {
        this.setState({ isRefreshing: true });
        console.log("THIS IS ME  "+  this.props.route.params.data)
        axios.get(endpoints.GETMATCHUPSTOLEAGUE_EP(this.props.route.params.data._id))        
        .then(res => {
            this.setState({weeksMatchups: res.data, isRefreshing: false});
            console.log(" WEekly Matchups : " + this.state.weeksMatchups)
        })
        .catch(err => {
            console.log('SHIET')
            console.log(err);
        });
    }

    gotoMatch = (match) => {
        console.log('HOW MUCH DO I REALLY KNOW')
        this.props.navigation.navigate('iMatch', { data: match});
    }

    //   getMatchups= () => {
    //         this.setState({ isRefreshing: true });
    //         // User is signed in
    //         axios.get(endpoints.GETMATCHUPSTOLEAGUE_EP('5e78d59ddb93b3460488693e'))
    //           .then(res => {
    //             // Update the player list
    //             this.setState({weeksMatchups: res.data, isRefreshing: false});
    //           })
    //           .catch(err => {
    //             console.log(err);
    //           });
         
        
    //   } 
    

    componentDidMount() {
        
        this.getMatchups();
        
    } 

    render() {
        return (
            
        <SafeAreaView style={styles.container}>
            <FlatList refreshing={this.state.isRefreshing} onRefresh={() => this.getMatchups()} data={this.state.weeksMatchups} renderItem={ ({ item }) => (
                <Match data={item} gotoMatch={this.gotoMatch}/>
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

export default Matches;
  
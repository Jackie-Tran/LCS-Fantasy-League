import React from 'react';
import {View, Text, StyleSheet, SafeAreaView,Dimensions, FlatList} from 'react-native';
import Match from '../../../components/Match'; 

import axios from 'axios';
import * as endpoints from '../../../constants/endpoints';
import firebase from 'firebase';
import iMatch from '../league_profile/iMatch'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class Matches extends React.Component {

    state = {
        leagues: [],
        isRefreshing: false,
        weeksMatchups: []
    }


    getMatchups= () => {
        this.setState({ isRefreshing: true });
        console.log("THIS IS ME")
        axios.get(endpoints.GETMATCHUPSTOLEAGUE_EP(this.props.route.params.data._id))        
        .then(res => {
            this.setState({weeksMatchups: res.data, isRefreshing: false});
            console.log("the data sent is "+ res.data)
            console.log(" WEekly Matchups : " + this.state.weeksMatchups)
        })
        .catch(err => {
            console.log('SHIET')
            console.log(err);
        });
    }
    createMatchups = () => 
     {
         this.setState({ isRefreshing: true });
        console.log("THIS IS ME")
        axios.get(endpoints.CREATEMATCHUPSTOLEAGUE_EP(this.props.route.params.data._id))        
        .then(res => {
            this.setState({isRefreshing: false});
            console.log("the data sent is "+ res.data)
            console.log(" WEekly Matchups : " + this.state.weeksMatchups)
        })
        .catch(err => {
            console.log('SHIET')
            console.log(err);
        });
    }

    gotoMatch = (match) => {
        this.props.navigation.navigate('iMatch', { data: match,id: this.props.route.params.data._id});
    }
    componentDidMount() {
        
        this.getMatchups();
        
        //if (this.state.weeksMatchups.length ==0)
        //{
         //   this.createMatchups()
       // }
        
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
  
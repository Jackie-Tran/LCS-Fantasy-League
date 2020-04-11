import React from 'react';
import {View,Dimensions, Text, StyleSheet, SafeAreaView, FlatList,TouchableOpacity} from 'react-native';
import League from '../components/League';

import axios from 'axios';
import * as endpoints from '../constants/endpoints';
import * as  firebase from 'firebase'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class LeaguesScreen extends React.Component {

    state = {
        leagues: [],
        isRefreshing: false,
    }
    handleLogout = () => {
        
        this.props.route.params.setAuthenticated(false)
 
      }

    getLeagues = () => {
        this.setState({ isRefreshing: true });
        axios.get(endpoints.GETLEAGUES_EP)
        .then(res => {
            res.data.forEach(league => {
                league.id = league._id;
            });
            this.setState({leagues: res.data, isRefreshing: false});
        })
        .catch(err => {
            console.log(err);
        });
    }

    gotoLeague = (league, uid) => {
        this.props.navigation.navigate('League', { data: league, uid: uid });
    }

    componentDidMount() {
        this.getLeagues();
    }

    render() {
        return (
        <SafeAreaView style={styles.container}>
            <FlatList refreshing={this.state.isRefreshing} onRefresh={() => {this.getLeagues()}} data={this.state.leagues} renderItem={ ({ item }) => (
                <League data={item} gotoLeague={this.gotoLeague}/>
            )}/>
           <TouchableOpacity
          onPress={this.handleLogout}>
          <Text style={styles.logOutButton}  >Logout </Text>
        </TouchableOpacity>
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
    logOutButton: {
        backgroundColor: '#003152',
        color: 'white',
        borderRadius: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 33,
        marginTop: 20,
        width: screenWidth,
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 0,
    
      },
});

export default LeaguesScreen;
  
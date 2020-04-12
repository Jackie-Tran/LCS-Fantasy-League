import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Scoreboard from '../pages/league_profile/Scoreboard';
import Matches from '../pages/league_profile/Matches'
import MyTeam from '../pages/league_profile/MyTeam';
import Draft from '../pages/league_profile/Draft';

const Tab = createMaterialTopTabNavigator();
const LeagueScreen = ({ route }) => {
    return (
        <Tab.Navigator tabBarPosition='bottom'>
            <Tab.Screen name="Scoreboard" initialParams={{ data: route.params.data }} component={Scoreboard}/>
            <Tab.Screen name="Matches" initialParams={{ data: route.params.data}}  component={Matches}/>
            <Tab.Screen name="My Team" initialParams={{ data: route.params.data, uid: route.params.uid }} component={MyTeam}/>
            <Tab.Screen name="Draft" initialParams={{ data: route.params.data, uid: route.params.uid }} component={Draft}/>
        </Tab.Navigator>
    );
}
export default LeagueScreen;
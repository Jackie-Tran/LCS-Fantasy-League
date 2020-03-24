import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Scoreboard from '../pages/league_profile/Scoreboard';
import Matches from '../pages/league_profile/Matches';
import MyTeam from '../pages/league_profile/MyTeam';

const Tab = createMaterialTopTabNavigator();

const LeagueScreen = ({ route }) => {
    return (
        <Tab.Navigator tabBarPosition='bottom'>
            <Tab.Screen name="Scoreboard" initialParams={{ data: route.params.data }} component={Scoreboard}/>
            <Tab.Screen name="Matches" component={Matches}/>
            <Tab.Screen name="My Team" component={MyTeam}/>
        </Tab.Navigator>
    );
}

export default LeagueScreen;
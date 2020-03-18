import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LeagueProfile from './LeagueProfile';
import MyTeam from './MyTeam';
import DraftPage from './DraftPage';

const Stack = createStackNavigator();

const LeagueScreen = ({ route }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="League Profile" initialParams={{ data: route.params.data }} component={LeagueProfile} />
            <Stack.Screen name="My Team" component={MyTeam} />
            <Stack.Screen name="Draft" component={DraftPage} />
        </Stack.Navigator>
    )
}

export default LeagueScreen;
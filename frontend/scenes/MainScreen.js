import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LeaguesPage from './LeaguesScreen';
import DraftPage from './DraftPage';

// Navigation 
const Tab = createBottomTabNavigator();

const MainScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Draft" component={DraftPage} />
            <Tab.Screen name="Leagues" component={LeaguesPage}/>
        </Tab.Navigator>
    )
}

export default MainScreen;

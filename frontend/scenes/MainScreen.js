import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LeaguesPage from './LeaguesScreen';

// Navigation 
const Tab = createBottomTabNavigator();

const MainScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Leagues" component={LeaguesPage}/>
        </Tab.Navigator>
    )
}

export default MainScreen;

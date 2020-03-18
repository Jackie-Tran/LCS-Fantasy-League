import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LeaguesScreen from './LeaguesScreen';

// Navigation 
const Tab = createBottomTabNavigator();

const MainScreen = (props) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Leagues" component={LeaguesScreen}/>
        </Tab.Navigator>
    )
}

export default MainScreen;

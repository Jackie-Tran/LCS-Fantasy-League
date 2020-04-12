import React, { Component } from 'react';

import thisLeaguesMatches from '../league_profile/thisLeaguesMatches'
import iMatch from '../league_profile/iMatch'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Matches = ({ route }) => {
    return (
      <Stack.Navigator>
            <Stack.Screen name="thisLeaguesMatches" options={{ headerShown: true,headerTitle:"Weekly Matchups",headerTitleAlign: 'center' }} initialParams={{ data: route.params.data }}  component={thisLeaguesMatches} />
           <Stack.Screen name="iMatch" options={{ headerShown: true,headerTitle:"All Matchups" }}  initialParams={{ data: route.params.data }} component={iMatch} />

      </Stack.Navigator>
    );
}
export default Matches;
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from '../Component/BottomTab';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTab}
        options={{header: () => null}}></Stack.Screen>
    </Stack.Navigator>
  );
}

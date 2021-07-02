import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import HomeBuilding from '../screens/HomeBuilding';
import DetailBuilding from '../screens/DetailBuilding';
import ListJob from '../components/ListJob';
import colors from '../utils/colors';

const Stack = createStackNavigator();

export default function Building() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeBuilding}
        options={{
          headerTintColor: 'white',
          headerTitle: 'Top công ty',
          headerStyle: {
            backgroundColor: colors.cyan,
          },
        }}></Stack.Screen>
      <Stack.Screen
        name="ListJob"
        component={ListJob}
        options={{
          headerTintColor: 'white',
          headerTitle: 'Danh sách việc',
          headerStyle: {
            backgroundColor: colors.cyan,
          },
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}

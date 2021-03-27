import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';

import Profile from '../Screens/Profile';
import Sercurity from '../Screens/Sercurity';
import FeedBack from '../Screens/FeedBack';

const Stack = createStackNavigator();
export default function StackProfile() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Profile}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#ff944d',
          },
        }}></Stack.Screen>
      <Stack.Screen
        name="Detail"
        component={Sercurity}
        options={{
          headerTintColor: 'white',
          headerTitle: 'Chi tiết công ty',
          headerStyle: {
            backgroundColor: '#ff944d',
          },
        }}></Stack.Screen>
      <Stack.Screen
        name="Contact"
        component={FeedBack}
        options={{
          headerTintColor: 'white',
          headerTitle: 'Liên hệ',
          headerStyle: {
            backgroundColor: '#ff944d',
          },
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({});

import React, {Component} from 'react';

import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';

import Profile from '../screens/Profile';
import Sercurity from '../screens/Sercurity';
import FeedBack from '../screens/FeedBack';
import colors from '../utils/colors';

const Stack = createStackNavigator();
export default function StackProfile() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Profile}
        options={{
          headerShown: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="Detail"
        component={Sercurity}
        options={{
          headerTintColor: 'white',
          headerTitle: 'Chính sách bảo mật',
          headerStyle: {
            backgroundColor: colors.cyan,
          },
        }}></Stack.Screen>
      <Stack.Screen
        name="Contact"
        component={FeedBack}
        options={{
          headerTintColor: 'white',
          headerTitle: 'Liên hệ',
          headerStyle: {
            backgroundColor: colors.cyan,
          },
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}

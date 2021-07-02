/* eslint-disable prettier/prettier */
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  HomeStackScreen,
  BuilDingScreen,
  ProfileScreen,
  NotifyScreen,
} from '../navigations/StackScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Job from '../screens/AllJob';
import TopJob from '../screens/TopJob';
import colors from '../utils/colors';
const Tab = createMaterialBottomTabNavigator();
export default function BottomTab({size = 21}) {
  return (
    <Tab.Navigator
      activeColor={colors.cyan}
      inactiveColor={colors.textGray}
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="Home"
        component={Job}
        options={{
          tabBarLabel: 'Trang chủ',

          tabBarIcon: ({color}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Job"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Việc từ trang',

          tabBarIcon: ({color}) => (
            <Icon name="pager" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={BuilDingScreen}
        options={{
          tabBarLabel: 'Top công ty',
          tabBarIcon: ({color}) => (
            <Icon name="building" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Yêu thích"
        component={NotifyScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({color}) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({color}) => (
            <Icon name="user-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

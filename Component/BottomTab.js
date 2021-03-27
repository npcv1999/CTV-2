/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  HomeStackScreen,
  BuilDingScreen,
  FavoriteScreen,
  ProfileScreen,
} from '../Screens/StackScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Job from './Job';
const Tab = createMaterialBottomTabNavigator();
export default function BottomTab({size = 20}) {
  return (
    <Tab.Navigator
      activeColor="white"
      inactiveColor="#303030"
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="Home"
        component={Job}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarColor: '#3399ff',
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
          tabBarColor: '#39ac39',
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
          tabBarColor: '#39ac39',
          tabBarIcon: ({color}) => (
            <Icon name="building" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Yêu thích"
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarColor: '#FA3E3E',
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
          tabBarColor: '#ff944d',
          tabBarIcon: ({color}) => (
            <Icon name="user-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

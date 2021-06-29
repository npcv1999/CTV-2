import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import HomeBuilding from './HomeBuilding';
import DetailBuilding from './DetailBuilding';
import ListJob from '../Component/ListJob';

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
            backgroundColor: '#39ac39',
          },
        }}></Stack.Screen>
      <Stack.Screen
        name="Detail"
        component={DetailBuilding}
        options={{
          headerTintColor: 'white',
          headerTitle: 'Chi tiết công ty',
          headerStyle: {
            backgroundColor: '#39ac39',
          },
        }}></Stack.Screen>
      <Stack.Screen
        name="ListJob"
        component={ListJob}
        options={{
          headerTintColor: 'white',
          headerTitle: 'Danh sách việc',
          headerStyle: {
            backgroundColor: '#39ac39',
          },
        }}></Stack.Screen>
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({});

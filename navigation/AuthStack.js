import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {GoogleSignin} from '@react-native-community/google-signin';
import Welcome from '../Screens/Welcome';

const Stack = createStackNavigator();

// if (isFirstLaunch === null) {
//   return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
// } else if (isFirstLaunch == true) {
//   routeName = 'Welcome';
// }
const AuthStack = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '722208165186-febbp7jvpd8ut014vcpria1u6obf9bp4.apps.googleusercontent.com',
    });
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;

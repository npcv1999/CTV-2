/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';

import Providers from './src/navigations';
const App = () => {
  LogBox.ignoreAllLogs();
  return <Providers></Providers>;
  // return <TestScreen></TestScreen>;
};
export default App;

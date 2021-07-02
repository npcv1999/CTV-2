/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {LogBox, StatusBar} from 'react-native';

import Providers from './navigations';
import colors from './utils/colors';
const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <>
      <StatusBar animated={true} backgroundColor={colors.cyan} />
      <Providers></Providers>
    </>
  );
  // return <TestScreen></TestScreen>;
};
export default App;

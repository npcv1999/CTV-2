import MaskedView from '@react-native-community/masked-view';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/colors';

const MaskedTitle = props => {
  return (
    <MaskedView maskElement={<Text {...props}></Text>}>
      <LinearGradient
        colors={[colors.active, colors.cyan]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <Text {...props} style={[props.style, {opacity: 0}]}></Text>
      </LinearGradient>
    </MaskedView>
  );
};
export default MaskedTitle;

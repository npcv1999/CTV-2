import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import LottieView from 'lottie-react-native';
export default function Loading() {
  return (
    <View style={styles.loading}>
      <LottieView
        resizeMode="cover"
        autoSize
        source={require('../paperplane.json')}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

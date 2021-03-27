import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';

export default class FeedBack extends React.Component {
  render() {
    return (
      <View style={styles.FeedBack}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.facebook.com/chivinh.2999/')
          }>
          <Text style={styles.fb}>Liên lạc qua FB</Text>
        </TouchableOpacity>
        <Text>Hoặc</Text>
        <TouchableOpacity>
          <Text style={styles.gmail}>
            Liên lạc qua gmail: support@gmail.com
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  FeedBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fb: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  gmail: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff3333',
  },
});

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {ImageBackground} from 'react-native';
function notifiapp() {
  async function onDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    // Display a notification
    await notifee.displayNotification({
      title: 'Chào ',
      body: 'Bạn có việc làm mới',
      android: {
        channelId,
        setSmallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  async function onAppBootstrap() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();

    // Save the token
    console.log(token);
    fetch('https://congtimviec.firebaseio.com/notifi/users.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time: new Date().toLocaleString(),
        tokenID: token,
      }),
    }).then((response) => {
      if (response.status == 200) {
        alert('Bạn đã đăng kí nhận thông báo thành công');
      }
    });
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        Bạn có muốn nhận thông báo khi có việc cập nhật mói không?
      </Text>
      <View>
        <Button title="Nhận thông báo" onPress={() => onAppBootstrap()} />
      </View>
    </View>
  );
}
export default notifiapp;

const styles = StyleSheet.create({});

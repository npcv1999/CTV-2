import React, {useState, useEffect} from 'react';

import {StyleSheet, Text, View, Button, Alert} from 'react-native';

import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import notifee from '@notifee/react-native';
function notifiapp() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [dataNoti, setDataNoti] = useState([]);

  //SAVE TOKEN TO DB
  async function saveTokenToDatabase(token) {
    // Assume user is already signed in
    const userId = auth().currentUser.uid;
    console.log(userId);
    // Add the token to the users datastore
    await firestore()
      .collection('users')
      .doc(userId)
      .set({
        tokens: firestore.FieldValue.arrayUnion(token),
      })
      .then(() => {
        setSuccess(true);
      });
  }

  async function setStringValue(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Done.');
      return true;
    } catch (e) {
      console.error('error');
      return false;
    }
  }

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@sub', 'sub');
      await AsyncStorage.setItem('@payload', jsonValue);
      console.log('thanh cong');
    } catch (e) {
      // saving error
      console.log('that bai');
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@sub');
      if (value !== null && value == 'sub') {
        setSuccess(true);
        console.log('success');
      }
    } catch (e) {
      console.log('lỗi');
      // error reading value
    }
  };
  const getPayLoad = async () => {
    try {
      const value = await AsyncStorage.getItem('@payload');
      if (value !== null) {
        setDataNoti(JSON.parse(value));
        console.log(dataNoti);
      }
    } catch (e) {
      console.log('lỗi get');
      // error reading value
    }
  };

  async function onAppBootstrap() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();

    // Save the token
    console.log(token);
    saveTokenToDatabase(token);
    storeData();
    // fetch('https://congtimviec.firebaseio.com/notifi/users.json', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     time: new Date().toLocaleString(),
    //     tokenID: token,
    //   }),
    // }).then(response => {
    //   if (response.status == 200) {
    //     alert('Bạn đã đăng kí nhận thông báo thành công');
    //   }
    // });
  }

  useEffect(() => {
    getData();
    getPayLoad();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage.notification.title);
      storeData(remoteMessage);
      getPayLoad();
      // setDataNoti(remoteMessage);
    });
    setLoading(false);
    return unsubscribe;
  }, []);

  if (!loading) {
    let time = dataNoti?.sentTime;
    let date = new Date(time).toLocaleString();
    return (
      <View
        style={{
          borderWidth: 0.5,
          padding: 10,
          borderRadius: 5,
          marginHorizontal: 10,
          marginVertical: 5,
          backgroundColor: 'white',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          {dataNoti?.notification?.title}
        </Text>
        <Text>{dataNoti?.notification?.body}</Text>
        <Text style={{fontWeight: 'bold'}}>{`Time: ${date}`}</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 30,
      }}>
      {!success ? (
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            Bạn có muốn nhận thông báo khi có việc cập nhật mới không?
          </Text>
          <Button title="Nhận thông báo" onPress={() => storeData()} />
        </View>
      ) : (
        <Text>abc</Text>
      )}
    </View>
  );
}
export default notifiapp;

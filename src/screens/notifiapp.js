import React, {useState, useEffect} from 'react';

import {StyleSheet, Text, View, Button, FlatList} from 'react-native';

import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import notifee from '@notifee/react-native';
function notifiapp() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [reload, setReload] = useState(true);

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

  const storeData = async value => {
    try {
      messaging()
        .subscribeToTopic('job')
        .then(() => setSuccess(true));
      // const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@sub', 'sub');
      console.log('thanh cong');
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const addStoreData = async value => {
    try {
      const valueItem = await AsyncStorage.getItem('@payload');
      const array = [];
      if (valueItem !== null) {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('@payload', jsonValue);
        console.log('value', jsonValue);
        setReload(!reload);
      } else {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('@payload', jsonValue);
        console.log('Tạo lần đầu');
        setReload(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@sub');
      if (value !== null && value == 'sub') {
        setSuccess(true);
        setLoading(false);
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
        console.log('data', dataNoti);
      }
    } catch (e) {
      console.log('lỗi get');
      // error reading value
    }
  };

  useEffect(() => {
    //testGetData();
    // console.log('dada', testGetData);
    getData();
    getPayLoad();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage.notification.title);
      setReload(!reload);
      addStoreData(remoteMessage);
    });
    // setLoading(false);
    AsyncStorage.clear();
    return unsubscribe;
  }, [reload]);

  if (!loading) {
    console.log('noti', dataNoti);
    let time = dataNoti?.sentTime;
    let date = new Date(time).toLocaleString();
    if (dataNoti.length < 1) return <Text>Thông báo khi có việc</Text>;
    else
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
          <FlatList></FlatList>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {dataNoti?.notification?.title}
          </Text>
          <Text>{dataNoti?.notification?.body}</Text>
          <Text
            style={{
              fontWeight: 'bold',
              marginBottom: 10,
            }}>{`Time: ${date}`}</Text>
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
        <View>
          <Text>Đăng kí nhận thông báo thành công</Text>
        </View>
      )}
    </View>
  );
}
export default notifiapp;

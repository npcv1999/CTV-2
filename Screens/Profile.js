import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/Octicons';
import {Avatar, Divider} from 'react-native-elements';
import DialogLogOut from '../Component/DialogLogOut';
import notifee from '@notifee/react-native';
import Shape from '../Component/Shape';
const W = Dimensions.get('window').width;

const Profile = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  return (
    <>
      <View style={styles.container}>
        <Shape block color={'white'}>
          <Shape style={styles.oval}></Shape>
          <Shape style={styles.avt} middle centered>
            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 90,
                borderWidth: 1,
                borderColor: '#4747ff',
              }}>
              <Avatar
                size={88}
                rounded
                source={{
                  uri: user.photoURL,
                }}
              />
            </View>
          </Shape>
          <View style={styles.info}>
            <Text style={styles.txtuser}>{user.displayName}</Text>
          </View>
          <View style={styles.space}></View>
          <View style={styles.mail}>
            <Icon name="mail" size={30} color={'orange'}></Icon>
            <Text style={styles.txtmail}>{user.email}</Text>
          </View>
          <View style={styles.space}></View>
          <View
            style={{
              marginTop: 15,
              justifyContent: 'center',
              margin: 5,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.txtAbout}>Thông tin ứng dụng</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
            <View style={styles.about}>
              <Text style={{height: 40}}>
                <Image source={require('../src/images/shield.png')}></Image>
                {'\t'}Chính sách bảo mật
              </Text>
              <Icon name="chevron-right" size={20}></Icon>
            </View>
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
            <View style={styles.about}>
              <Text style={{height: 40}}>
                <Image source={require('../src/images/comments.png')}></Image>
                {'\t'}Trợ giúp và phản hồi
              </Text>
              <Icon name="chevron-right" size={20}></Icon>
            </View>
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity>
            <View style={styles.about}>
              <Text style={{height: 40}}>
                <Image source={require('../src/images/reply.png')}></Image>
                {'\t'}Đánh giá ứng dụng
              </Text>
              <Icon name="chevron-right" size={20}></Icon>
            </View>
          </TouchableOpacity>
          <View style={styles.space}></View>
          <Text style={{margin: 15, marginTop: 85}}>
            Phiên bản ứng dụng ver.0.0.1
          </Text>
        </Shape>
        <View style={styles.viewLogOut}>
          <DialogLogOut></DialogLogOut>
        </View>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  avt: {
    marginTop: 30,
  },
  oval: {
    position: 'absolute',
    width: W + W / 5,
    height: W + W / 5,
    backgroundColor: '#ff9c59',
    borderRadius: W / 5.8,
    alignSelf: 'center',
    top: -W * 0.95,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  info: {
    justifyContent: 'center',
    marginLeft: 10,
    margin: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
    color: '#338533',
  },
  txtuser: {
    alignContent: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 18,
    color: '#333333',
  },
  txtmail: {
    alignContent: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
    color: '#333333',
  },
  txtAbout: {
    marginTop: 50,
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 18,
    color: '#333333',
  },
  viewLogOut: {
    // flexDirection: 'row',
    backgroundColor: 'white',
  },
  space: {
    backgroundColor: '#d9d9d9',
    height: 2,
  },
  mail: {
    backgroundColor: 'white',
    margin: 15,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  about: {
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

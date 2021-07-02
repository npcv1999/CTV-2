import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {AuthContext} from '../../navigations/AuthProvider';
import Icon from 'react-native-vector-icons/Octicons';
import DialogLogOut from '../../components/DialogLogOut';
import Shape from '../../components/Shape';

import styles from './style';

const Profile = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  return (
    <>
      <View style={styles.container}>
        <Shape block color={'white'}>
          <Shape style={styles.oval}></Shape>
          <Shape style={styles.avt} middle centered>
            <View style={styles.viewAvt}>
              <Image
                style={{width: 70, height: 70, borderRadius: 35}}
                source={{
                  uri: user.photoURL,
                }}></Image>
              {/* <Avatar
                size={88}
                avatarStyle={{resizeMode: 'contain'}}
                rounded
                source={{
                  uri: user.photoURL,
                }}
              /> */}
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
                <Image source={require('../../images/shield.png')}></Image>
                {'\t'}Chính sách bảo mật
              </Text>
              <Icon name="chevron-right" size={20}></Icon>
            </View>
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
            <View style={styles.about}>
              <Text style={{height: 40}}>
                <Image source={require('../../images/comments.png')}></Image>
                {'\t'}Trợ giúp và phản hồi
              </Text>
              <Icon name="chevron-right" size={20}></Icon>
            </View>
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity>
            <View style={styles.about}>
              <Text style={{height: 40}}>
                <Image source={require('../../images/reply.png')}></Image>
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

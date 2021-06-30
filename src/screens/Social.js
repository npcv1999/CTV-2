import React, {useContext} from 'react';
import {View} from 'react-native';
import FBLoginButton from '../components/FacebookLogin';
import GoogleSign from '../components/GoogleSign';
import {AuthContext} from '../navigations/AuthProvider';

export default function ButtonSocial() {
  const {fbLogin} = useContext(AuthContext);
  const {googleLogin} = useContext(AuthContext);
  return (
    <>
      <GoogleSign></GoogleSign>
      <View style={{height: 10}}></View>
      <FBLoginButton></FBLoginButton>
    </>
  );
}

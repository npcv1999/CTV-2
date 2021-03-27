import React, {useContext} from 'react';
import {View} from 'react-native';
import FBLoginButton from '../Component/FacebookLogin';
import GoogleSign from '../Component/GoogleSign';
import {AuthContext} from '../navigation/AuthProvider';

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

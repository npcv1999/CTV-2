import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../navigation/AuthProvider';

//Sign-in function

export default function GoogleSign() {
  // signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const {accessToken, idToken} = await GoogleSignin.signIn();
  //     setloggedIn(true);
  //     const credential = auth.GoogleAuthProvider.credential(
  //       idToken,
  //       accessToken,
  //     );
  //     await auth().signInWithCredential(credential);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       alert('Cancel');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       alert('Signin in progress');
  //       // operation (f.e. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       alert('PLAY_SERVICES_NOT_AVAILABLE');
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };
  // //
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
  //     webClientId:
  //       '722208165186-febbp7jvpd8ut014vcpria1u6obf9bp4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //   });
  // }, []);

  // signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     setloggedIn(false);
  //     setuserInfo([]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const [loggedIn, setloggedIn] = useState(false);
  // const [userInfo, setuserInfo] = useState([]);
  const {googleLogin} = useContext(AuthContext);
  return (
    <>
      <View style={styles.container}>
        <GoogleSigninButton
          style={{width: 300, height: 60}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => googleLogin()}
        />
      </View>
    </>
  );
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

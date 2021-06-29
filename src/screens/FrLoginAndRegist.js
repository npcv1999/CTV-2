import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import ButtonIcon from '../Component/ButtonIcon';
import MaskedTitle from '../Component/MaskedTitle';
import Login from './Login';
import Register from './Register';


export default function FrLoginAndRegist() {
  const [state, setState] = useState(0);
  return (
    <>
      {/* <StatusBar barStyle={"dark-content"}></StatusBar> */}
      <SafeAreaView style={styles.container}>
        <MaskedTitle style={styles.title}>
          {state == 0 ? 'ĐĂNG NHẬP TÀI KHOẢN ' : ' ĐĂNG KÝ\nTÀI KHOẢN MỚI'}
        </MaskedTitle>

        <View style={styles.tab}>
          <TouchableOpacity
            onPress={() => setState(0)}
            style={[styles.button, state === 0 && {borderBottomColor: 'blue'}]}>
            <Text style={[styles.btnText, state === 0 && {color: 'blue'}]}>
              ĐĂNG NHẬP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setState(1)}
            style={[styles.button, state === 1 && {borderBottomColor: 'blue'}]}>
            <Text style={[styles.btnText, state === 1 && {color: 'blue'}]}>
              ĐĂNG KÝ TÀI KHOẢN
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wrapper}>
          {state === 0 && <Login />}
          {state === 1 && <Register />}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Hoặc {state == 0 ? 'đăng nhập' : 'đăng ký'} với
            </Text>
            <View style={styles.btnAcc}>
              <TouchableOpacity>
                <ButtonIcon icon="google" color="#ff1414" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAcc}>
                <ButtonIcon icon="facebook" color="#4d79ff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    padding: 35,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: 'monospace',
  },
  container: {
    flex: 1,
  },
  tab: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#b2b2ff',
  },
  btnText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#8c8cff',
  },
  wrapper: {
    //backgroundColor:"red",
    //marginTop:"10%",
    flex: 1 / 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 20,
    color: '#ff7d26',
    fontWeight: '500',
    textAlign: 'center',
    margin: 10,
  },
  btnAcc: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footer: {
    margin: '-5%',
    //backgroundColor:"blue"
  },
});

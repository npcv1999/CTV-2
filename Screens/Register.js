import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ViewBtn from '../Component/ViewBtn';
import firebase from '../db/firebase';
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      pass: '',
      errorMessage: null,
      icon: 'eye-off',
      pwd: true,
    };
  }

  onChangUser = (value) => this.setState({email: value});
  onChangPass = (value) => this.setState({pass: value});

  oneRegist = () => {
    const {email, pass} = this.state;
    console.log({email, pass});
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    // firebase.auth().createUserWithEmailAndPassword(email, pass)
    // .catch(console.error())
    // .then(()=> this.props.navigation.navigate("Main"))
    // .catch(error => this.setState({errorMessage: error.message}))
  };
  changeIcon() {
    this.setState((prevState) => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      pwd: !prevState.pwd,
    }));
  }
  render() {
    const {email, pass} = this.state;
    return (
      <>
        <View>
          <Text style={styles.title}>Tên</Text>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Icon name="user" style={styles.icon} size={25} color="#D3D4D5" />
              <TextInput
                style={styles.input}
                // value={name}
                placeholder="Nhập tên"
              />
            </View>
          </View>

          <Text style={styles.title}>Email</Text>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Icon name="mail" style={styles.icon} size={25} color="#D3D4D5" />
              <TextInput
                style={styles.input}
                placeholder="Nhập email"
                value={email}
                onChangeText={this.onChangUser}
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Mật khẩu</Text>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Icon name="lock" style={styles.icon} size={25} color="#D3D4D5" />
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                value={pass}
                secureTextEntry={this.state.pwd}
                onChangeText={this.onChangPass}
              />
              <Icon
                name={this.state.icon}
                style={styles.eye}
                size={25}
                color="#EC80B5"
                onPress={() => this.changeIcon()}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={this.oneRegist}>
          <ViewBtn btn="Đăng ký tài khoản" />
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#F8F9FA',
    flexDirection: 'row',
    padding: 1,
    borderWidth: 1,
    //width:'80%',
    borderColor: '#D3D4D5',
    borderRadius: 50,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 6,
    fontSize: 15,
    marginLeft: '10%',
  },
  icon: {
    marginLeft: '3%',
    marginTop: '3%',
    color: '#ff8c1a',
  },
  eye: {
    marginRight: '3%',
    marginTop: '3%',
    color: '#ff8c1a',
  },
  input: {
    color: 'black',
    flex: 1,
  },
});

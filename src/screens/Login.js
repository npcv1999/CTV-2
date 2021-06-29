import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  CheckBox,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ViewBtn from '../Component/ViewBtn';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      icon: 'eye-off',
      pwd: true,
    };
  }
  onChangUser = (value) => this.setState({email: value});
  onChangPass = (value) => this.setState({pass: value});

  // toggleRememberMe = value => {
  //     this.setState({rememberMe: value});
  //     if (value === true) {
  //       this.rememberUser();
  //     } else {
  //       this.forgetUser();
  //     }
  //   };

  //   rememberUser = async () => {
  //     try {
  //       await AsyncStorage.setItem('email', this.state.user);
  //       await AsyncStorage.setItem('pass', this.state.pass);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getRememberUser = async () => {
  //     try {
  //       const email = await AsyncStorage.getItem('email');
  //       const pass = await AsyncStorage.getItem('pass');
  //       const userid = {email: user, pass: pass};
  //       if (email !== null && pass !== null) {
  //         return userid;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   forgetUser = async () => {
  //     try {
  //       await AsyncStorage.removeItem('user');
  //       await AsyncStorage.removeItem('pass');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  onLogin = () => {
    const {email, pass} = this.state;
    console.log({email, pass});
    // if(
    //    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    //        user,
    //    )
    // ){
    //     this.setState({error:"Email not valid"})
    // }
    // console.log({user,pass});
    // fetch('https://myfreshfruits.000webhostapp.com/Login.php',{
    //     method:'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email: user,

    //         password: pass,
    //       }),
    // })
    // .then(response => response.json())
    // .then(responseJson => {
    //   // If server response message same as Data Matched
    //   if (responseJson === 'Data Matched') {
    //     //Then open Profile activity and send user email to profile activity.
    //     Alert.alert('Hola!', 'Chào mừng bạn trở lại')
    //   } else {
    //     Alert.alert('Không thành công', responseJson);
    //   }
    //     console.log(responseJson);
    // })
    // .catch(error => {
    //     console.error(error);
    //   });
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
      <View style={styles.Login}>
        <View>
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
                onChangeText={this.onChangPass}
                secureTextEntry={this.state.pwd}
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
        {/* <View style={styles.saveUser}>
              <CheckBox
                value={rememberMe}
                onValueChange={value => this.toggleRememberMe(value)}
              />
              <Text gray2 caption>
                Lưu tài khoản
              </Text>
        </View> */}
        {/* <Text style={styles.errorText}>{error}</Text> */}
        <TouchableOpacity onPress={this.onLogin}>
          <ViewBtn btn="ĐĂNG NHẬP" />
        </TouchableOpacity>
      </View>
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
  saveUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  errorText: {
    color: 'red',
    fontSize: 10,
  },
});

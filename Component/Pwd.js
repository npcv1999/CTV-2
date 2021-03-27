import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
export default class Pwd extends React.Component {
  state = {
    icon: 'eye-off',
    pwd: true,
  };
  changeIcon() {
    this.setState((prevState) => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      pwd: !prevState.pwd,
    }));
  }
  render() {
    const {title, icon, isPwd, placeholder} = this.props;
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Icon
              name={icon}
              style={styles.icon}
              size={25}
              color="#D3D4D5"></Icon>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              secureTextEntry={this.state.pwd}></TextInput>
            {isPwd && (
              <Icon
                name={this.state.icon}
                style={styles.eye}
                size={25}
                color="#EC80B5"
                onPress={() => this.changeIcon()}></Icon>
            )}
          </View>
        </View>
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
});

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import Loading from '../Component/Loading';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Quote from 'react-native-vector-icons/FontAwesome5';
import {Image, Tooltip} from 'react-native-elements';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import firebase from '../db/firebase';
export default class HomeBuilding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
    const {navigation} = this.props;
  }
  comments() {
    return (
      <View>
        <TextInput
          style={styles.comments}
          value={this.state.comments.toString()}
          onChangeText={this.setState.comments}></TextInput>
        <TouchableOpacity
          onPress={() => this.save()}
          style={{
            position: 'absolute',
            top: 10,
            right: 20,
          }}>
          <Icon name="send" size={25}></Icon>
        </TouchableOpacity>
      </View>
    );
  }
  //Key
  // Fetch data
  componentDidMount() {
    // var ref = firebase.database().ref('list');
    // ref.once('value').then(function (snapshot) {
    //   console.log(snapshot.numChildren());
    // });
    const url = 'https://congtimviec.firebaseio.com/top.json';
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({data: json, loading: false});
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        // ADD THIS THROW error
        throw error;
      });
  }
  //Key
  keyExtractor = (item, index) => item.title;

  render() {
    if (this.state.loading) {
      return <Loading></Loading>;
    }
    //Check array[index] !=null------------------------
    var filtered = this.state.data.filter(function (el) {
      return el != null;
    });
    console.log(filtered);

    return (
      <>
        <View
          style={{
            margin: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
        <View style={{flex: 1, marginHorizontal: 5}}>
          <FlatList
            numColumns={2}
            data={filtered}
            renderItem={({item, index}) => (
              <View style={styles.item}>
                <Image
                  resizeMode={'contain'}
                  source={{uri: item.logo}}
                  style={styles.img}
                  PlaceholderContent={<ActivityIndicator />}></Image>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Detail', {index, item})
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.info}>Chi tiết công ty</Text>
                    <AntDesign
                      style={styles.info}
                      name="doubleright"
                      size={14}></AntDesign>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ListJob', {index, item})
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.info}>Việc làm</Text>
                    <AntDesign
                      style={styles.info}
                      name="doubleright"
                      size={14}></AntDesign>
                  </View>
                </TouchableOpacity>
                {/* <Text numberOfLines={5} style={styles.text}>
                {description}
              </Text> */}
              </View>
            )}
            keyExtractor={this.keyExtractor}></FlatList>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    //set item lẻ
    minWidth: (WIDTH - 25) / 3,
    maxWidth: (WIDTH - 25) / 2,
    //
    padding: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 8,
    height: HEIGHT / 2.4,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
  },
  img: {
    width: 100,
    height: 100,
  },
  title: {
    flex: 0.5,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'auto',
  },
  info: {
    margin: 3,
    color: 'green',
    justifyContent: 'center',
  },
});

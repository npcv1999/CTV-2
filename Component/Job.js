import React, {Component} from 'react';
import {Image} from 'react-native-elements';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  TextInput,
  LogBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import firebase from '../db/firebase';
import Loading from './Loading';
export default class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      text: '',
    };
    this.arrayHolder = [];
  }
  async componentDidMount() {
    LogBox.ignoreLogs(['Setting a timer']);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    try {
      var commentRef = firebase.database().ref('job');
      commentRef.on('value', (childSnapshot) => {
        const data = [];
        childSnapshot.forEach((doc) => {
          data.push({
            key: doc.key,
            id: doc.toJSON().id,
            logo: doc.toJSON().logo,
            title: doc.toJSON().title,
            href: doc.toJSON().href,
            source: doc.toJSON().source,
            salary: doc.toJSON().salary,
          });
          this.setState({
            data: data,
            loading: false,
          });
          this.arrayHolder = data;

          console.log(this.state.data);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  renderItem = (obj) => {
    // const {favorite} =this.state;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.img}>
            <Image
              resizeMode={'contain'}
              source={{uri: obj.item.logo}}
              style={{width: 60, height: 60}}
              PlaceholderContent={<ActivityIndicator />}></Image>
          </View>
          <View style={styles.detail}>
            <View style={styles.info}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(obj.item.href);
                }}>
                <Text style={styles.title}>{obj.item.title}</Text>
                <View style={{justifyContent: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'column',
                    }}>
                    <Text style={styles.cpn}>Mức lương:</Text>
                    <Text style={styles.money}>{obj.item.salary}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.cpn}>Nguồn:</Text>
                    <Text style={styles.text}>{obj.item.source}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };
  keyExtractor = (item, index) => index.toString();
  //Separator
  ItemSeparatorComponent = () => <View style={styles.separator}></View>;
  ListEmptyComponent = () => (
    <View style={styles.viewEmpty}>
      <Text style={styles.textEmpty}>
        Không tìm thấy dữ liệu!{'\n'}
        Vui lòng nhập lại...
      </Text>
    </View>
  );
  searchData(text) {
    const newData = this.arrayHolder.filter((item) => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log(newData);
    this.setState({
      data: newData,
      text: text,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading></Loading>;
    }
    return (
      <View style={styles.MainContainer}>
        <View style={styles.textInput}>
          <Icon name="search1" size={20}></Icon>
          <TextInput
            onChangeText={(text) => this.searchData(text)}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="Tìm kiếm ..."
          />
        </View>

        <FlatList
          data={this.state.data}
          ListEmptyComponent={this.ListEmptyComponent}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,
  },
  textInput: {
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: '#FFFF',
  },
  container: {
    //Shadow item
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3.67,

    elevation: 2,
    //
    padding: 5,
    height: 'auto',
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    borderRadius: 3.67,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flex: 1 / 6,
    marginRight: 5,
  },
  info: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    textAlign: 'auto',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'blue',
  },
  text: {
    fontSize: 15,
  },
  tag: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'green',
  },
  heart: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  separator: {
    height: 10,
    width: '100%',
  },
  detail: {
    flex: 1,
  },
  textEmpty: {
    color: 'red',
    fontSize: 16,
  },
  viewEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cpn: {
    fontWeight: '600',
    color: 'green',
    marginRight: 10,
  },
  money: {
    marginLeft: 5,
    color: '#fe0e55',
  },
});

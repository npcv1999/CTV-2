import React from 'react';
import {
  TextInput,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import Loading from '../Component/Loading';
import Icon from 'react-native-vector-icons/AntDesign';
import {Image} from 'react-native-elements';
import RNAnimated from 'react-native-animated-component';
export default class DbDevWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: '',
      loading: true,
    };
    this.arrayHolder = [];
  }
  renderItem1 = (obj) => {
    return (
      <>
        <RNAnimated appearFrom="bottom" animationDuration={1000}>
          <View style={styles.container}>
            <View style={styles.img}>
              <Image
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
                  <Text style={styles.tag}>Công ty:</Text>
                  <Text style={styles.text}>{obj.item.company}</Text>
                  <Text style={styles.tag}>Mô tả:</Text>
                  <Text numberOfLines={4} style={styles.description}>
                    {obj.item.description}
                  </Text>
                  <Text style={styles.cpn}>Mức lương:</Text>
                  <Text style={styles.money}>{obj.item.luong}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </RNAnimated>
      </>
    );
  };
  //Key
  keyExtractor = (item) => item.title;
  //Separator
  ItemSeparatorComponent = () => <View style={styles.separator}></View>;
  //EmptyItem
  ListEmptyComponent = () => (
    <View style={styles.viewEmpty}>
      <Text style={styles.textEmpty}>
        Không tìm thấy dữ liệu!{'\n'}
        Vui lòng nhập lại...
      </Text>
    </View>
  );
  //Fetch data
  componentDidMount() {
    const url = 'https://congtimviec.firebaseio.com/devwork.json';
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState(
          {
            data: json,
            loading: false,
          },
          () => {
            this.arrayHolder = json;
          },
        );
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        // ADD THIS THROW error
        throw error;
      });
    this.getData();
    console.log(this.getData);
  }
  //Search item
  async getData() {
    try {
      const value = await AsyncStorage.getItem('@search');
      alert(value);
      if (value !== null) {
        this.setState({text: value});
      }
    } catch (e) {
      // error reading value
    }
  }
  searchData(text) {
    const newData = this.arrayHolder.filter((item) => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
      text: text,
    });
  }

  render() {
    // console.log(this.state.data);
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
          extraData={this.state}
          data={this.state.data}
          renderItem={this.renderItem1}
          // ListEmptyComponent={this.ListEmptyComponent}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.ListEmptyComponent}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //Search
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
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    textAlign: 'auto',
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'blue',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    textAlign: 'auto',
  },
  text: {
    fontSize: 14,
    textAlign: 'auto',
  },
  tag: {
    fontWeight: '700',
  },
  cpn: {
    fontWeight: '600',
    marginVertical: 5,
    color: 'green',
  },
  money: {
    color: '#fe0e55',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

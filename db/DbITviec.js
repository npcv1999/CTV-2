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
import Icon from 'react-native-vector-icons/AntDesign';
import Loading from '../Component/Loading';
import {Image} from 'react-native-elements';
import RNAnimated from 'react-native-animated-component';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default class DbITviec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: '',
      loading: true,
      favorite: false,
    };
    this.arrayHolder = [];
    this.add = this.add.bind(this);
  }
  add = (e) => {
    this.setState({
      favorite: !this.state.favorite,
    });
    console.log('da press');
    console.log(this.state.favorite);
  };

  //RenderItem for flatlist
  renderItem = (obj) => {
    // const {favorite} =this.state;
    return (
      <>
        <RNAnimated appearFrom="bottom" animationDuration={1000}>
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
                  <Text style={styles.tag}>Description:</Text>
                  <Text style={styles.text}>{obj.item.decription}</Text>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity style={styles.heart} onPress={(e) => this.add(e)}>
              <Icon
                name={this.state.favorite ? 'heart' : 'hearto'}
                size={20}
                color="#ff0066"></Icon>
            </TouchableOpacity> */}
            </View>
          </View>
        </RNAnimated>
      </>
    );
  };

  //Key, Separator, Empty
  keyExtractor = (item) => item.id;
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
  //Fetch data from REST API firebase
  componentDidMount() {
    const url = 'https://congtimviec.firebaseio.com/itviec.json';
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState(
          {
            data: json,
            // set loading false
            loading: false,
          },
          () => {
            //arraySearch
            this.arrayHolder = json;
          },
        );
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        throw error;
      });
  }
  //Search item
  storeData = async (text) => {
    try {
      await AsyncStorage.setItem('@search', text);
    } catch (e) {
      // saving error
    }
  };
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
    //Loading
    if (this.state.loading) {
      // return (
      //   <SkeletonPlaceholder>
      //     <View style={{flexDirection: 'row', alignItems: 'center'}}>
      //       <View style={{width: 60, height: 60, borderRadius: 50}} />
      //       <View style={{marginLeft: 20}}>
      //         <View style={{width: 120, height: 20, borderRadius: 4}} />
      //         <View
      //           style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
      //         />
      //       </View>
      //     </View>
      //   </SkeletonPlaceholder>
      // );
      return <Loading></Loading>;
    }
    //FlatListJob
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
          renderItem={this.renderItem}
          ListEmptyComponent={this.ListEmptyComponent}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.ItemSeparatorComponent}></FlatList>
      </View>
    );
  }
}
//Styles
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
    marginRight: 5,
  },
  info: {
    flex: 1,
    alignItems: 'center',
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
    fontSize: 12,
    textAlign: 'auto',
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
});

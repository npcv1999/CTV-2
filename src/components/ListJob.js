import React, {Component} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Image} from 'react-native-elements';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import firebase from '../db/firebase';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default class ListJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }
  async componentDidMount() {
    const route = this.props.route.params;
    const item = route.item;
    const index = route.index;
    const id = index;
    fetch;
    try {
      var commentRef = firebase.database().ref('top/' + id + '/list');
      commentRef.on('value', (childSnapshot) => {
        const data = [];
        childSnapshot.forEach((doc) => {
          data.push({
            key: doc.key,
            title: doc.toJSON().title,
            href: doc.toJSON().href,
            salary: doc.toJSON().salary,
            type: doc.toJSON().type,
            add: doc.toJSON().add,
          });
          this.setState({
            data: data,
          });
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
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.cpn}>Mức lương:</Text>
                    <Text style={styles.money}>{obj.item.salary}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.cpn}>Loại việc:</Text>
                    <Text style={styles.text}>{obj.item.type}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.cpn}>Khu vực:</Text>
                    <Text style={styles.text}>{obj.item.add}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };
  keyExtractor = (item, index) => item.key;
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
  render() {
    const route = this.props.route.params;
    const item = route.item;
    const index = route.index;
    const id = index;
    return (
      <ImageHeaderScrollView
        maxHeight={200}
        minHeight={0}
        renderHeader={() => (
          <Image
            resizeMode={'contain'}
            source={{uri: item.banner}}
            style={styles.banner}
            PlaceholderContent={<ActivityIndicator />}></Image>
        )}>
        <View>
          <TriggeringView>
            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
            />
          </TriggeringView>
        </View>
      </ImageHeaderScrollView>
      // <View style={styles.MainContainer}>
      //   <Image
      //     resizeMode={'cover'}
      //     source={{uri: item.banner}}
      //     style={styles.banner}
      //     PlaceholderContent={<ActivityIndicator />}></Image>
      //   <FlatList
      //     data={this.state.data}
      //     renderItem={this.renderItem}
      //     keyExtractor={this.keyExtractor}
      //   />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  banner: {
    width: WIDTH,
    height: 200,
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

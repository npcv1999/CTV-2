import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import firebase from '../../db/firebase';
import Loading from '../../components/Loading';
import MaskedTitle from '../../components/MaskedTitle';
import BaseUrl from '../../db/BaseUrl';

import {Image} from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';

import styles from './style';

import TopJob from '../TopJob';
export default class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      text: '',
      sumData: [],
      page: 1,
    };
    this.arrayHolder = [];
  }
  async componentDidMount() {
    try {
      //--------------------------------Firebase---------------------------------------------
      // var commentRef = await firebase.database().ref('job1');
      // commentRef.on('value', (childSnapshot) => {
      //   const data = [];
      //   childSnapshot.forEach((doc) => {
      //     data.push({
      //       key: doc.key,
      //       id: doc.toJSON().id,
      //       logo: doc.toJSON().logo,
      //       title: doc.toJSON().title,
      //       href: doc.toJSON().href,
      //       source: doc.toJSON().source,
      //       slary: doc.toJSON().slary,
      //     });
      //--------------------------Convert Object to arr ES6-----------------------
      await fetch(BaseUrl.baseUrl + `job.json`)
        .then(res => res.json())
        .then(result => {
          this.setState({
            data: Object.values(result).slice(0, 20),
            loading: false,
            sumData: Object.values(result),
          });
          this.arrayHolder = Object.values(result);
        });
    } catch (error) {
      console.log(error);
    }
  }
  renderItem = obj => {
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
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.cpn}>Mức lương:</Text>
                    <Text style={styles.money}>{obj.item.slary}</Text>
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

  //search
  comp(a, b) {
    return a.toLowerCase().trim() === b.toLowerCase().trim();
  }
  findJob(text, datas) {
    if (text === '') {
      return [];
    }
    const regex = new RegExp(`${text.replace(/[^a-zA-Z0-9]/g, '')}`, 'i');
    return datas.filter(item => item.title.search(regex) >= 0);
  }
  searchData(text) {
    const newData = this.arrayHolder.filter(item => {
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
  //Scroll
  async handleLoadMore(page) {
    await fetch(BaseUrl.baseUrl + `job.json?`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          page: page + 1,
          data: this.state.data.concat(
            Object.values(result).slice((page + 1) * 20, (page + 1) * 20 + 20),
          ),
        });
      });
    //console.log(this.state.startIndex);
    // this.setState({
    //   page: page + 1,
    //   startIndex: (page + 1) * 20,
    //   endIndex: (page + 1) * 20 + 20,
    // });
    //console.log(this.state.endIndex);
    // this.startIndex = 20;
    // (this.startIndex = (page + 1) * 20), (this.endIndex = startIndex + 20);
  }

  render() {
    const {data} = this.state;
    const {text} = this.state;
    const datas = this.findJob(text, data);
    if (this.state.loading) {
      return <Loading></Loading>;
    }
    // console.log(this.state.data);
    const listData = this.state.data;
    return (
      <View style={styles.MainContainer}>
        <MaskedTitle style={styles.titleSearchJb}>
          Danh sách việc làm
        </MaskedTitle>
        {/* <View style={styles.textInput}>
          <Icon name="search1" size={20}></Icon>
          <TextInput
            onChangeText={(text) => this.searchData(text)}
            value={this.state.text}
            placeholder="Tìm kiếm ...                                                                       "
          />
        </View> */}
        <View style={styles.textInput}>
          <Icon
            name="search1"
            size={20}
            style={{alignItems: 'center', marginTop: 10}}></Icon>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            data={datas.length === 1 && comp(text, datas[0].title) ? [] : datas}
            value={text}
            onChangeText={text => this.searchData(text)}
            placeholder="Tìm kiếm"
            flatListProps={{
              renderItem: ({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.searchData(item.title);
                  }}>
                  <Text style={styles.itemText}>{item.title}</Text>
                </TouchableOpacity>
              ),
            }}
          />
        </View>

        <View style={{marginTop: 30}}>
          <TopJob></TopJob>
        </View>
        <FlatList
          data={listData}
          ListEmptyComponent={this.ListEmptyComponent}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          onEndReached={() => this.handleLoadMore(this.state.page)}
          onEndThreshold={0.1}
        />
      </View>
    );
  }
}

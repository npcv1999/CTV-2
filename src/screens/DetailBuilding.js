import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  LogBox,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import {Avatar, Image} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Comment from 'react-native-vector-icons/MaterialCommunityIcons';
const WIDTH = Dimensions.get('screen').width;

import firebase from '../db/firebase';
import LoadingComments from '../Component/LoadingComments';

export class BtnComment extends React.Component {
  render() {
    const {onPress, btn} = this.props;
    if (!btn)
      return (
        <TouchableHighlight style={styles.openButton} onPress={onPress}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <MaterialIcons
              name="add-comment"
              size={25}
              color="white"></MaterialIcons>
            <Text style={styles.textStyle}>Thêm đánh giá</Text>
          </View>
        </TouchableHighlight>
      );
    else return null;
  }
}
export default class DetailBuilding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      disabled: true,
      value: '',
      comments: '',
      emailComment: '',
      showBtn: false,
      modalVisible: false,
      error: '',
      loading: true,
    };
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible, showBtn: visible});
    console.log(this.state.showBtn);
  };

  onComments = (text) => {
    this.setState({
      comments: text,
    });
  };
  onUser = (text) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(text) == false) {
      this.setState({error: 'Email không hợp lệ'});
    }
    if (text.length <= 0 || re.test(text) == true) {
      this.setState({error: ''});
    }
    this.setState({
      emailComment: text,
    });
  };

  save(index) {
    if (
      this.state.comments.length <= 0 ||
      this.state.emailComment.length <= 0
    ) {
      this.setState({error: ''});
      return alert('Cần phải nhập đủ thông tin');
    }
    console.log(index);
    const id = index;
    fetch('https://congtimviec.firebaseio.com/top/' + id + '/comments.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time: new Date().toLocaleString(),
        email: this.state.emailComment,
        comments: this.state.comments,
      }),
    }).then((response) => {
      if (response.status == 200) {
        alert('Gửi đánh giá thành công');
        this.setState({comments: ''});
        this.setModalVisible(!this.state.modalVisible);
      }
    });
  }
  async componentDidMount() {
    const route = this.props.route.params;
    const item = route.item;
    const index = route.index;
    const id = index;
    try {
      var commentRef = firebase.database().ref('top/' + id + '/comments');
      commentRef.on('value', (childSnapshot) => {
        const data = [];
        childSnapshot.forEach((doc) => {
          data.push({
            key: doc.key,
            email: doc.toJSON().email,
            comments: doc.toJSON().comments,
          });
          this.setState({
            data: data,
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  renderItem = (item) => {
    return (
      <>
        <Text style={styles.title}>{item.key}</Text>
      </>
    );
  };
  keyExtractor = (item, index) => index.toString();
  //Separator
  ItemSeparatorComponent = () => <View style={styles.separator}></View>;
  //empty
  ListEmptyComponent = () => {
    return (
      <View style={styles.viewEmpty}>
        <Text style={styles.textEmpty}>Chưa có đánh giá!{'\n'}</Text>
      </View>
    );
  };

  render() {
    // const data = this.state.data;
    console.log(this.state.data);
    const route = this.props.route.params;
    const item = route.item;
    const index = route.index;
    console.log(route.index);

    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Image
                resizeMode={'cover'}
                source={{uri: item.banner}}
                style={styles.img}
                PlaceholderContent={<ActivityIndicator />}></Image>
            </View>
            <View style={[styles.viewAvt, {translateX: 10}, {translateY: 160}]}>
              <Avatar
                avatarStyle={{resizeMode: 'contain'}}
                rounded
                size="large"
                source={{uri: item.logo}}></Avatar>
            </View>
            <View style={styles.viewInfo}>
              <Text style={styles.txtTitle}>{item.title}</Text>
              <View>
                <Text
                  style={{marginTop: 10, marginBottom: 5, fontWeight: '700'}}>
                  Giới thiệu công ty
                </Text>
                <Text style={{textAlign: 'justify'}}>{item.content}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              width: 'auto',
              height: 'auto',
              margin: 15,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Comment name="comment-multiple-outline" size={20}></Comment>
              <Text
                style={{
                  fontSize: 16,
                  fontStyle: 'italic',
                  fontWeight: '700',
                  borderBottomWidth: 0.2,
                  marginLeft: 5,
                }}>
                Đánh giá
              </Text>
            </View>
            <FlatList
              data={this.state.data}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.title}>
                    <Text style={{fontWeight: '700'}}>{item.email}</Text>
                    <Text style={{fontSize: 13, marginLeft: 2}}>
                      "{item.comments}"
                    </Text>
                  </View>
                );
              }}
              ListEmptyComponent={this.ListEmptyComponent}
              keyExtractor={this.keyExtractor}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Viết đáng giá</Text>
                <TextInput
                  multiline
                  value={this.state.emailComment}
                  placeholder="Nhập email"
                  style={styles.comments}
                  onChangeText={this.onUser}></TextInput>
                <Text style={(styles.modalText, {color: 'red'})}>
                  {this.state.error}
                </Text>
                <TextInput
                  multiline
                  value={this.state.comments}
                  placeholder="Viết đánh giá..."
                  style={styles.comments}
                  onChangeText={this.onComments}></TextInput>
                <TouchableOpacity
                  onPress={() => this.save(index)}
                  style={{
                    ...styles.openButton,
                  }}>
                  <View
                    style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <Icon name="send" size={25} color="white"></Icon>
                    <Text style={styles.textStyle}>Gửi bình đánh giá</Text>
                  </View>
                </TouchableOpacity>
                <TouchableHighlight
                  style={{...styles.openButton, backgroundColor: '#2196F3'}}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Thoát đánh giá</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </ScrollView>
        {/* modal */}
        <BtnComment
          btn={this.state.showBtn}
          onPress={() => {
            this.setModalVisible(true);
          }}></BtnComment>
        {/* <View>
          <TouchableOpacity
            disabled={this.state.disabled}
            onPress={() => this.save(index)}
            style={{
              position: 'absolute',
              top: 10,
              right: 20,
            }}>
            <Icon name="send" size={25}></Icon>
          </TouchableOpacity>
        </View> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: WIDTH,
    height: 200,
  },
  viewAvt: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 71,
    borderWidth: 0.2,
  },
  viewInfo: {
    flex: 1,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  txtTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00b14f',
  },
  comments: {
    borderRadius: 10,
    borderWidth: 0.5,
    // backgroundColor: 'red',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    position: 'relative',
    paddingLeft: 20,
  },
  container1: {
    flex: 1,
    // backgroundColor: 'red',
    //Shadow item
  },
  title: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#cccccc',
    fontSize: 15,
    fontWeight: 'normal',
  },
  //MODAL
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  modalView: {
    // flex: 1 / 2,
    width: WIDTH,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerModal: {
    width: WIDTH / 2,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  openButton: {
    backgroundColor: '#b3b300',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

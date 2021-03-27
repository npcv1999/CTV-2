import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/AntDesign';
import Dialog from 'react-native-dialog';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const DialogLogOut = () => {
  const [visible, setVisible] = useState(false);
  const {logout} = useContext(AuthContext);
  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    logout();
    setVisible(false);
  };
  return (
    <>
      <TouchableOpacity style={styles.btnlogout} onPress={showDialog}>
        <Icon name="logout" size={16} color="white"></Icon>
        <Text style={styles.txtLogout}>Đăng xuất</Text>
      </TouchableOpacity>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Đăng xuất</Dialog.Title>
        <Dialog.Description>
          Bạn có chắc muốn đăng xuất không?
        </Dialog.Description>
        <Dialog.Button label="Đăng xuất" onPress={handleDelete} />
        <Dialog.Button label="Hủy" onPress={handleCancel} />
      </Dialog.Container>
    </>
  );
};
export default DialogLogOut;
const styles = StyleSheet.create({
  btnlogout: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ff8533',
    color: 'white',
    // height: HEIGHT / 18,
    // width: WIDTH,
    borderRadius: 6,
    padding: 10,
    elevation: 5,
    margin: 10,
  },
  txtLogout: {
    marginLeft: 10,
    fontSize: 18,
    color: 'white',
  },
});

import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
import {W} from '../../utils/size';

const styles = StyleSheet.create({
  avt: {
    marginTop: 30,
  },
  viewAvt: {
    width: 72,
    height: 72,
    borderRadius: 72 / 2,
    borderWidth: 0.5,
    borderColor: '#4747ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  oval: {
    position: 'absolute',
    width: W + W / 5,
    height: W + W / 5,
    backgroundColor: colors.cyan,
    borderRadius: W / 5.8,
    alignSelf: 'center',
    top: -W * 0.95,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  info: {
    justifyContent: 'center',
    marginLeft: 10,
    margin: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
    color: '#338533',
  },
  txtuser: {
    alignContent: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 18,
    color: '#333333',
  },
  txtmail: {
    alignContent: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
    color: '#333333',
  },
  txtAbout: {
    marginTop: 50,
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 18,
    color: '#333333',
  },
  viewLogOut: {
    // flexDirection: 'row',
    backgroundColor: 'white',
  },
  space: {
    backgroundColor: '#d9d9d9',
    height: 2,
  },
  mail: {
    backgroundColor: 'white',
    margin: 15,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  about: {
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;

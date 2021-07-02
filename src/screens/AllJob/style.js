import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    position: 'relative',
    zIndex: 0,
    backgroundColor: 'white',
  },
  textInput: {
    // alignItems: 'center',
    // paddingLeft: 10,
    // flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: '#009688',
    borderRadius: 8,
    // backgroundColor: '#FFFF',
    flexDirection: 'row',
    // alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 30,
    height: 200,
    zIndex: 1,
  },

  itemText: {
    fontSize: 15,
    margin: 2,
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
    marginRight: 5,
  },
  money: {
    color: '#fe0e55',
  },
  titleSearchJb: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '700',
  },
});
export default styles;

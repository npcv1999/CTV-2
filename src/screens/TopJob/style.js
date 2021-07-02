import {StyleSheet} from 'react-native';

import colors from '../../utils/colors';
import {W, H} from '../../utils/size';

const styles = StyleSheet.create({
  container: {flex: 1},
  viewLabelNew: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  txtLabel: {
    fontSize: 18,
    color: colors.orange,
    fontWeight: 'bold',
  },
  viewItem: {
    width: W - 30,
    borderRadius: 10,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cyan,
    padding: 15,
    marginHorizontal: 10,
  },
  txtJob: {
    color: colors.white,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});
export default styles;

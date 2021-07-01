import {StyleSheet} from 'react-native';

import colors from '../../utils/colors';
import {W, H} from '../../utils/size';

const styles = StyleSheet.create({
  container: {flex: 1},
  viewItem: {
    width: W / 3 - 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.active,
    padding: 10,
  },
});
export default styles;

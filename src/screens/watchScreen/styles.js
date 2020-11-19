import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const navIconSize = 25;

const styles = new StyleSheet.create({
  doubleNavIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  navIcon: {
    width: navIconSize,
    height: navIconSize,
    margin: 6,
  },
  navIconMenuOptions: {
    flexDirection: 'row',
    width: null,
  },
});

export default styles;

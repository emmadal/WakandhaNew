import { StyleSheet } from 'react-native';
import mainStyles from '../../mainStyles';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const styles = new StyleSheet.create({
  ...mainStyles,

  buttonNewPage: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    borderRadius: 150,
    backgroundColor: '#DDB937',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageNewPage: {
    width: '20%',
    height: '20%',
  },
});

export default styles;

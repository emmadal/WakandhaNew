import { StyleSheet } from 'react-native';
import mainStyles from '../../mainStyles';

import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const styles = new StyleSheet.create({
  ...mainStyles,

  // Marketplace style
  containerItemMarket: {
    flex: 1,
    height: responsiveHeight(30),
    width: responsiveWidth(15),
    margin: 10,
    marginBottom: 20,
  },
  imageItemMarket: {
    width: '100%',
    height: '80%',
    borderRadius: 12,
    marginBottom: 10,
  },

  containerBecomeSeller: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 50,
    backgroundColor: '#DDB937',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  buttonNewPublication: {
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

  imageNewPublication: {
    width: '20%',
    height: '20%',
  },

  modalBodyContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(100),
  },
});

export default styles;

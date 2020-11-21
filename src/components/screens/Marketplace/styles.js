import { StyleSheet } from 'react-native';
import AppStyles from '../../../AppStyles';

import { responsiveWidth } from 'react-native-responsive-dimensions';

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    feedContainer: {
      flex: 1,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    emptyStateView: {
      marginTop: 50,
    },

    buttonNewPublication: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      height: responsiveWidth(15),
      width: responsiveWidth(15),
      borderRadius: 150,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },

    imageNewPublication: {
      width: '20%',
      height: '20%',
    },
  });
};

export default dynamicStyles;

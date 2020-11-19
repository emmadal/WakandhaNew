import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      paddingTop: 20,
    },
    textTitle: {
      fontSize: 30,
      fontWeight: '700',
      marginHorizontal: 10,
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    emptyViewContainer: {
      marginTop: height / 5,
    },
  });
};

export default dynamicStyles;

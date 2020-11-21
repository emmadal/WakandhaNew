import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    headerButtonContainer: {
      padding: 10,
    },
    Image: {
      width: 25,
      height: 25,
      margin: 6,
    },
    title: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 15,
    },
  });
};

export default dynamicStyles;

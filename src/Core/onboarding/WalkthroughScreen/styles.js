import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 25,
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      paddingLeft: 10,
      paddingRight: 10,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 60,
      tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    button: {
      fontSize: 18,
      color: 'white',
      marginTop: 10,
    },
  });
};

export default dynamicStyles;

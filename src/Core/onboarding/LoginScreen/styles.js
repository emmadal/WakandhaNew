import { I18nManager } from 'react-native';
import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    orTextStyle: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      marginTop: 40,
      marginBottom: 10,
      alignSelf: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: 25,
      marginBottom: 20,
      alignSelf: 'stretch',
      textAlign: 'center',
    },
    loginContainer: {
      width: '80%',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: 5,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
    },
    loginText: {
      fontSize: 15,
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    placeholder: {
      color: 'red',
    },
    InputContainer: {
      height: 42,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].mainTextColor,
      paddingLeft: 20,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 5,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    phoneNumberContainer: {
      marginTop: 20,
    },
    textPhoneNumber: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
  });
};

export default dynamicStyles;

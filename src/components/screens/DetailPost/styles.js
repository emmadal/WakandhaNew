import { I18nManager, StyleSheet } from 'react-native';
import AppStyles from '../../../AppStyles';

const commentBodyPaddingLeft = 8;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    detailPostContainer: {
      flex: 1,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    InputContainer: {
      height: 150,
      borderWidth: 1,
      borderColor: AppStyles.colorSet[colorScheme].mainTextColor,
      paddingLeft: 20,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      width: '100%',
      marginTop: 20,
      borderRadius: 5,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      textAlignVertical: 'top',
    },
    loginText: {
      fontSize: 15,
      color: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    loginContainer: {
      width: '80%',
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: 5,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
      marginBottom: 10,
    },
    commentItemContainer: {
      alignSelf: 'center',
      flexDirection: 'row',
      marginVertical: 2,
      marginTop: 30,
    },
    commentItemImageContainer: {
      position: 'absolute',
      top: -20,
      left: 50,
    },
    commentItemImage: {
      height: 40,
      width: 40,
      borderRadius: 50,
      borderColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderWidth: 1,
      marginVertical: 5,
      marginLeft: 5,
    },
    commentItemBodyContainer: {
      flex: 5,
      marginHorizontal: 30,
    },
    commentItemBodyRadiusContainer: {
      width: Math.floor(AppStyles.WINDOW_WIDTH * 0.71),
      padding: 15,
      paddingTop: 30,
      borderRadius: 25,
      margin: 5,
      backgroundColor: AppStyles.colorSet[colorScheme].whiteSmoke,
    },
    commentItemBodyTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      paddingVertical: 3,
      paddingLeft: commentBodyPaddingLeft,
      lineHeight: 12,
    },
    commentItemBodySubtitle: {
      fontSize: 13,
      color: 'white',
      paddingVertical: 3,
      paddingLeft: commentBodyPaddingLeft,
    },
    commentInputContainer: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      flexDirection: 'row',
      width: '100%',
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },
    commentTextInputContainer: {
      flex: 4,
      borderRadius: 150,
      backgroundColor: AppStyles.colorSet[colorScheme].whiteSmoke,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      height: '70%',
      width: '90%',
      margin: 8,
      justifyContent: 'center',
    },
    commentTextInput: {
      padding: 8,
      paddingHorizontal: 15,
      color: 'white',
    },
    commentInputIconContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      marginRight: 10,
    },
    commentInputIcon: {
      height: 35,
      width: 25,
      tintColor: 'rgba(255,255,255,0.8)',
    },
    placeholderTextColor: {
      color: 'white',
    },
    repondreTextColor: {
      color: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      fontSize: 12,
      paddingHorizontal: '5%',
    },
  });
};

export default dynamicStyles;

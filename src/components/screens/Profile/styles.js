import { I18nManager, StyleSheet } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

import AppStyles from '../../../AppStyles';
import mainStyles from '../../../mainStyles';

// const imageContainerWidth = 66;
const imageWidth = 110;

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    ...mainStyles,
    InputContainer: {
      height: 42,
      borderWidth: 1,
      borderColor: AppStyles.colorSet[colorScheme].mainTextColor,
      paddingLeft: 20,
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 5,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
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
    },
    container: {
      flex: 1,
      backgroundColor: AppStyles.colorSet[colorScheme].whiteSmoke,
    },
    progressBar: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      height: 3,
      shadowColor: '#000',
      width: 0,
    },

    containerCoverPicture: {
      width: '100%',
      height: responsiveHeight(30),
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginBottom: 30,
    },

    containerEditPicture: {
      width: 30,
      height: 30,
      borderRadius: 50,
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },

    userImage: {
      width: imageWidth,
      height: imageWidth,
      borderRadius: Math.floor(imageWidth / 2),
      borderColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderWidth: 2,
    },
    userImageContainer: {
      width: imageWidth,
      height: imageWidth,
      borderWidth: 0,
    },
    userImageMainContainer: {
      alignItems: 'flex-start',
      marginTop: -70,
      marginLeft: 10,
      alignSelf: 'flex-start',
    },
    userName: {
      fontSize: 25,
      textAlign: 'left',
      fontWeight: '600',
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      paddingTop: 15,
    },
    profileSettingsButtonContainer: {
      width: '95%',
      height: 40,
      borderRadius: 8,
      backgroundColor: AppStyles.colorSet[colorScheme].mainButtonColor,
      marginVertical: 9,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileSettingsTitle: {
      color: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      fontSize: 13,
      fontWeight: '600',
    },
    FriendsTitle: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 20,
      fontWeight: '600',
      alignSelf: 'flex-start',
      padding: 10,
    },
    FriendsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '98%',
    },
    friendCardContainer: {
      height: Math.floor(AppStyles.WINDOW_HEIGHT * 0.18),
      width: Math.floor(AppStyles.WINDOW_WIDTH * 0.292),
      borderRadius: Math.floor(AppStyles.WINDOW_WIDTH * 0.013),
      justifyContent: 'flex-start',
      overflow: 'hidden',
      margin: 5,
    },
    friendCardImage: {
      height: '75%',
      width: '100%',
    },
    friendCardTitle: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 13,
      padding: 4,
    },
    subButtonColor: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
  });
};

export default dynamicStyles;

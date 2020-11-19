import { StyleSheet } from 'react-native';

const imageSize = 60;

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      paddingTop: 20,
    },
    userImageMainContainer: {
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20,
      marginBottom: 7,
    },
    userImageContainer: {
      width: imageSize,
      height: imageSize,
      borderWidth: 0,
      alignItems: 'flex-end',
    },
    userImage: {
      width: imageSize,
      height: imageSize,
    },
    notificationItemBackground: {
      flex: 1,
      paddingVertical: 15,
      marginBottom: 1,
    },
    notificationItemContainer: {
      flexDirection: 'row',
      width: '95%',
      height: 82,
      alignSelf: 'center',
    },
    notificationLabelContainer: {
      flex: 5.4,
      justifyContent: 'center',
    },
    description: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 15,
    },
    name: {
      fontWeight: '700',
      marginBottom: 5,
    },
    moment: {
      fontSize: 12,
    },
    seenNotificationBackground: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    unseenNotificationBackground: {
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
    textTitle: {
      fontSize: 30,
      fontWeight: '700',
      marginHorizontal: 10,
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
  });
};

export default dynamicStyles;

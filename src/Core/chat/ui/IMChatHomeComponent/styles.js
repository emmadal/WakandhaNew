import { StyleSheet } from 'react-native';
import AppStyles from '../../../../AppStyles';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      paddingTop: 15,
    },
    userImageContainer: {
      borderWidth: 0,
    },
    chatsChannelContainer: {
      // flex: 1,
      padding: 10,
    },
    content: {
      flexDirection: 'row',
    },
    message: {
      flex: 2,
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
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
      width: '40%',
      height: '40%',
    },

    // Swipe tabs
    segmentContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    segmentItemContainer: {
      width: '100%',
    },
    textTab: {
      color: '#DDB937',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
      paddingBottom: 10,
    },
    viewUnderlineActive: {
      alignSelf: 'center',
      height: 3,
      width: '40%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#DDB937',
    },

    containerItemTab: {
      flex: 1,
    },
  });
};

export default dynamicStyles;

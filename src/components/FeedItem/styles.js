import { StyleSheet } from 'react-native';
import AppStyles from '../../AppStyles';

import { responsiveHeight } from 'react-native-responsive-dimensions';

const reactionIconSize = Math.floor(AppStyles.WINDOW_WIDTH * 0.09);

const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      width: Math.floor(AppStyles.WINDOW_WIDTH * 0.97),
      alignSelf: 'center',
      marginVertical: 3,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userImageContainer: {
      width: 30,
      height: 30,
      borderWidth: 1,
      overflow: 'hidden',
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    title: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 15,
      fontWeight: '600',
    },
    mainSubtitleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginVertical: 3,
    },
    subtitleContainer: {
      flex: 1.3,
    },
    subtitle: {
      color: 'rgba(255,255,255,0.3)',
      fontSize: 15,
    },
    moreIconContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
    moreIcon: {
      height: 25,
      width: 25,
      tintColor: 'rgba(255,255,255,0.3)',
      margin: 0,
    },
    bodyTitleContainer: {
      marginHorizontal: 8,
    },
    body: {
      paddingHorizontal: 12,
    },
    moreText: {
      color: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      fontSize: 13,
      lineHeight: 18,
      paddingBottom: 15,
      paddingHorizontal: 12,
    },
    bodyImageContainer: {
      height: responsiveHeight(50),
    },
    bodyImage: {
      height: '100%',
      width: '100%',
      resizeMode: 'stretch',
    },
    inactiveDot: {
      backgroundColor: 'rgba(255,255,255,.3)',
      width: 6,
      height: 6,
      borderRadius: 3,
      marginLeft: 3,
      marginRight: 3,
    },
    activeDot: {
      backgroundColor: '#fff',
      width: 6,
      height: 6,
      borderRadius: 3,
      marginLeft: 3,
      marginRight: 3,
    },
    reactionContainer: {
      flexDirection: 'row',
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      position: 'absolute',
      bottom: 55,
      width: Math.floor(AppStyles.WINDOW_WIDTH * 0.9),
      height: 55,
      borderRadius: Math.floor(AppStyles.WINDOW_WIDTH * 0.07),
      borderWidth: 3,
      borderColor: 'rgba(255,255,255,0.3)',
      borderStyle: 'solid',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    reactionIconContainer: {
      margin: 3,
      padding: 0,
      backgroundColor: 'transparent',
      width: reactionIconSize,
      height: reactionIconSize,
      borderRadius: reactionIconSize / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    reactionIcon: {
      width: reactionIconSize,
      height: reactionIconSize,
      margin: 0,
    },
    footerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    footerIconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
    },
    footerIcon: {
      margin: 3,
      height: 25,
      width: 22,
    },
    mediaVideoLoader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    centerItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    playVideoIconContainer: {
      position: 'absolute',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    playVideoIcon: {
      tintColor: '#fff',
      width: 50,
      height: 50,
    },

    containerDonateButton: {
      position: 'absolute',
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
      bottom: 15,
      right: 15,
      padding: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textDonateButton: {
      color: 'black',
    },
    tintColor: { tintColor: AppStyles.colorSet[colorScheme].mainTextColor },
  });
};

export default dynamicStyles;

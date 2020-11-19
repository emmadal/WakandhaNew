import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    friendItemContainer: {
      padding: 10,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    chatIconContainer: {
      flex: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    photo: {
      width: 80,
      height: 80,
      borderRadius: 150,
    },
    name: {
      fontSize: 16,
      fontWeight: '700',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    addFlexContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButton: {
      width: 82,
      height: 35,
      justifyContent: 'center',
      borderRadius: 5,
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
    followButton: {
      width: 82,
      height: 35,
      justifyContent: 'center',
      borderRadius: 5,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      color: appStyles.colorSet[colorScheme].whiteSmoke,
    },
    followActionTitle: {
      padding: 0,
      alignSelf: 'center',
      fontSize: 14,
      fontWeight: '500',
      color: appStyles.colorSet[colorScheme].whiteSmoke,
    },
    divider: {
      bottom: 0,
      left: 80,
      right: 10,
      position: 'absolute',
      height: 0.5,
      backgroundColor: appStyles.colorSet[colorScheme].hairlineColor,
    },
  });
};

export default dynamicStyles;

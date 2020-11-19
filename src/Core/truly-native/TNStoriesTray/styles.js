import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    storiesContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      marginBottom: 20,
      paddingHorizontal: 15,
      flexDirection: 'row',
    },
    seenStyle: {
      borderColor: appStyles.colorSet[colorScheme].grey,
      borderWidth: 1,
    },

    thumbnailStoryContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      height: 150,
      width: 100,
      borderRadius: 5,
      marginRight: 10,
      overflow: 'hidden',
    },
    bottomBlackGradient: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      height: 30,
    },
    thumbnailStoryPicture: {
      position: 'absolute',
      top: 10,
      left: 10,
      height: 35,
      width: 35,
      borderRadius: 150,
      borderWidth: 2,
      borderColor: 'white',
    },
    thumbnailStoryUserName: {
      position: 'absolute',
      bottom: 15,
      left: 10,
      color: 'white',
      fontSize: 13,
      width: '90%',
    },
  });
};

export default dynamicStyles;

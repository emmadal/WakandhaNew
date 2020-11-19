import { StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const imageContainerWidth = responsiveWidth(15);
const imageWidth = imageContainerWidth - 6;

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      margin: 8,
      overflow: 'hidden',
    },
    imageContainer: {
      width: imageContainerWidth,
      height: imageContainerWidth,
      borderRadius: 500,
      borderColor: 'white',
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    image: {
      width: 500,
      height: 500,
      borderRadius: Math.floor(imageWidth / 2),
      borderColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderWidth: 1,
      overflow: 'hidden',
    },
    text: {
      fontSize: 12,
      textAlign: 'center',
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
      paddingTop: 5,
    },
    isOnlineIndicator: {
      position: 'absolute',
      backgroundColor: '#4acd1d',
      height: 16,
      width: 16,
      borderRadius: 16 / 2,
      borderWidth: 3,
      borderColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      right: 5,
      bottom: 0,
    },
  });
};

export default dynamicStyles;

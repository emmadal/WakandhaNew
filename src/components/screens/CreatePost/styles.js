import { StyleSheet, Dimensions } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import AppStyles from '../../../AppStyles';

const height = Dimensions.get('window').height;
const imageContainerWidth = Math.floor(height * 0.076);
const imageWidth = imageContainerWidth - 6;

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const dynamicStyles = (colorScheme) => {
  return new StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    topContainer: {
      width: '100%',
      height: 124,
    },
    headerContainer: {
      flexDirection: 'row',
      flex: 4.3,
      // backgroundColor: 'blue',
    },
    userIconContainer: {
      width: imageContainerWidth,
      height: imageContainerWidth,
      borderRadius: Math.floor(imageContainerWidth / 2),
    },
    userIcon: {
      width: imageWidth,
      height: imageWidth,
      borderRadius: Math.floor(imageWidth / 2),
    },
    titleContainer: {
      marginTop: 19,
      marginBottom: 7,
    },
    title: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 15,
      fontWeight: '600',
    },
    subtitle: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 10,
    },
    postInputContainer: {
      // flex: 6,
      // alignItems: 'center',
      position: 'absolute',
      width: '100%',
      top: 65,
    },
    postInput: {
      height: '90%',
      width: '90%',
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      textAlignVertical: 'top',
      minHeight: 120,
      maxHeight: 195,
      width: '100%',
      fontSize: 20,
      overflow: 'scroll',
      borderRadius: 12,
    },
    bottomContainer: {
      height: '100%',
      justifyContent: 'flex-end',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    blankBottom: {
      ...ifIphoneX(
        {
          flex: 1.1,
        },
        {
          flex: 1.4,
        },
      ),
    },
    postImageAndLocationContainer: {
      width: '100%',
      backgroundColor: AppStyles.colorSet[colorScheme].whiteSmoke,
    },
    imagesContainer: {
      width: '100%',
      // marginBottom: 23,
    },
    imageItemcontainer: {
      width: 65,
      height: 65,
      margin: 3,
      marginTop: 5,
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'grey',
      overflow: 'hidden',
    },
    imageItem: {
      width: '100%',
      height: '100%',
    },
    addImageIcon: {
      width: '50%',
      height: '50%',
    },
    addTitleAndlocationIconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    addTitleContainer: {
      flex: 5.8,
      justifyContent: 'center',
    },
    addTitle: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 13,
      padding: 8,
    },
    iconsContainer: {
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    iconContainer: {
      height: 50,
      width: 30,
      marginHorizontal: 2,
    },
    icon: {
      height: 23,
      width: 23,
    },
    imageBackground: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    cameraFocusTintColor: {
      tintColor: AppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    cameraUnfocusTintColor: {
      tintColor: AppStyles.colorSet[colorScheme].mainTextColor,
    },
    pinpointTintColor: {
      tintColor: AppStyles.colorSet[colorScheme].mainTextColor,
    },
    parentContainer: {
      height: screenHeight,
      position: 'relative',
    },
    // container: {
    //   height: "100%",
    //   width: '100%',
    //   backgroundColor: '#fff'
    // },
    navigationBar: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      height: 50,
    },
    naviIcon: {
      padding: 10,
    },
    naviTitle: {
      paddingHorizontal: 10,
      fontSize: 16,
    },
    btnPost: {
      position: 'absolute',
      right: 10,
      justifyContent: 'center',
    },
    infoWrapper: {
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    areaWrapper: {
      flexDirection: 'row',
    },
    areaOption: {
      marginRight: 10,
      paddingHorizontal: 5,
      paddingVertical: 2.5,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      marginRight: 10,
      borderRadius: 50,
      width: 40,
      height: 40,
    },
    name: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    editorWrapper: {
      overflow: 'hidden',
      // padding: 10,
      // paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: 300,
      position: 'absolute',
      width: '100%',
      top: 90,
    },
    editor: {
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    },
    toolOptionsWrapper: {
      // position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      // paddingBottom: 55,
    },
    optionsWrapper: {
      backgroundColor: '#fff',
      position: 'absolute',
      width: '100%',
      left: 0,
      zIndex: 999999,
    },
    optionTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      height: 55,
      alignItems: 'center',
      borderTopColor: '#ddd',
      borderTopWidth: 1,
    },
    optionImagesWrapper: {
      flexDirection: 'row',
      zIndex: 1,
    },
    optionImage: {
      height: 25,
      resizeMode: 'contain',
    },
    bgColorsWrapper: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      height: 50,
    },
    bgColorsScrollView: {
      flexDirection: 'row',
    },
    btnBgColor: {
      height: 30,
      width: 30,
    },
    bgColor: {
      height: 30,
      width: 30,
      marginHorizontal: 5,
    },
    bgImage: {
      resizeMode: 'cover',
      height: 30,
      width: 30,
      borderRadius: 10,
      borderWidth: 1,
    },
    toggleBgColors: {
      padding: 5,
      borderWidth: 0,
      position: 'absolute',
      top: 0,
      left: 0,
    },
    moreBgColors: {},
  });
};

export default dynamicStyles;

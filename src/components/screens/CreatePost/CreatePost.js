import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  BackHandler,
  Animated,
  Dimensions,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import * as Permissions from 'expo-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import { Video } from 'expo-av';
import { useColorScheme } from 'react-native-appearance';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
import { TNStoryItem, TNTouchableIcon } from '../../../Core/truly-native';
import IMLocationSelectorModal from '../../../Core/location/IMLocationSelectorModal/IMLocationSelectorModal';
import IMCameraModal from '../../../Core/camera/IMCameraModal';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import '../../../Core/chat/IMChat/BottomAudioRecorder';
import { extractSourceFromFile } from '../../../Core/helpers/retrieveSource';
import dynamicStyles from './styles';
import AppStyles from '../../../AppStyles';
import * as Progress from 'react-native-progress';
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
// https://stackoverflow.com/questions/17901692/set-up-adb-on-mac-os-x
// import Marker, { Position, ImageFormat } from 'react-native-image-marker'

const Image = createImageProgress(FastImage);

const bgColors = [
  {
    id: 0,
    group: 'Popular',
    isPureColor: true,
    color: '#fff',
    textColor: '#000',
  },
  {
    id: 1,
    group: 'Popular',
    isPureColor: true,
    color: '#000',
    textColor: '#fff',
  },
  // 1
  {
    id: 2,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F1.jpg?alt=media&token=dee82ee9-14ae-4ebd-9628-44dbf62dcdfe',
    textColor: '#fff',
  },
  // 2
  {
    id: 3,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F10.jpg?alt=media&token=13992de2-f03d-4fdd-a757-7ffaaaeda0e6',
    textColor: '#fff',
  },
  //3
  {
    id: 4,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F11.jpg?alt=media&token=fc668119-49bc-4478-abdd-28514bcf388f',
    textColor: '#fff',
  },
  //4
  {
    id: 5,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F12.jpg?alt=media&token=abf6b4e6-b7e7-418d-8da3-3f800f7a9ba1',
    textColor: '#fff',
  },
  // 5
  {
    id: 6,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F13.jpg?alt=media&token=59d78d28-acce-4938-a53d-45a62af6cab9',
    textColor: '#fff',
  },
  //6
  {
    id: 7,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F14.jpg?alt=media&token=2c489d09-9757-4f0b-b2a0-656944388c30',
    textColor: '#fff',
  },
  //7
  {
    id: 8,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F15.jpg?alt=media&token=f3449e01-eaa3-40b9-9d17-3fdbf5c79fb9',
    textColor: '#fff',
  },
  //8
  {
    id: 9,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F16.jpg?alt=media&token=af40d73d-40d7-464f-9170-1a9364188d69',
    textColor: '#fff',
  },
  //9
  {
    id: 10,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F17.jpg?alt=media&token=bb3a19ff-412d-4223-bf89-3aa6b13d1483',
    textColor: '#fff',
  },
  //10
  {
    id: 11,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F18.jpg?alt=media&token=b53a901e-3903-4d2e-b684-1d4770031055',
    textColor: '#fff',
  },
  //11
  {
    id: 12,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F19.jpg?alt=media&token=1c258146-1d40-4a27-8aa7-181b693c5d13',
    textColor: '#fff',
  },
  //12
  {
    id: 13,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F2.jpg?alt=media&token=a4546383-866c-45aa-9896-0de495d57290',
    textColor: '#fff',
  },
  //13
  {
    id: 14,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F20.jpg?alt=media&token=8ee2f9a0-e717-4638-9f0d-26feba348815',
    textColor: '#000',
  },
  //14
  {
    id: 15,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F21.jpg?alt=media&token=88efc40b-1407-48bf-b6da-ef766166a0ec',
    textColor: '#000',
  },
  //15
  {
    id: 16,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F23.jpg?alt=media&token=cb32891f-6db5-44f5-80e1-63262ae39abe',
    textColor: '#000',
  },
  //16
  {
    id: 17,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F3.jpg?alt=media&token=3a0f566c-a5e1-42b9-bdbd-7650663f90f6',
    textColor: '#fff',
  },
  //17
  {
    id: 18,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F4.jpg?alt=media&token=cad64b50-f45f-4184-9626-ea6cf11f79ab',
    textColor: '#fff',
  },
  //18
  {
    id: 19,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F5.jpg?alt=media&token=0cc03ffb-49ef-42f0-8353-dba713f724cb',
    textColor: '#fff',
  },
  //19
  {
    id: 20,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F6.jpg?alt=media&token=2b78aeae-2e06-49f4-8352-9f822edb1841',
    textColor: '#fff',
  },
  //20
  {
    id: 21,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F7.jpg?alt=media&token=bc5706e0-5cd7-47c7-baff-b371d372524a',
    textColor: '#fff',
  },
  //21
  {
    id: 22,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F8.jpg?alt=media&token=5121d2a5-79b2-4410-927a-3e4dfe82cc15',
    textColor: '#fff',
  },
  //22
  {
    id: 23,
    group: 'Other',
    isPureColor: false,
    bgImage_url:
      'https://firebasestorage.googleapis.com/v0/b/wakandha-c7cea.appspot.com/o/ressources%2F9.jpg?alt=media&token=84f61dad-ae1e-4958-84a9-ee893d0f299f',
    textColor: '#fff',
  },
];
const _editorWrapperHeight = new Animated.Value(100);

function CreatePost(props) {
  const {
    onPostDidChange,
    onSetMedia,
    appStyles,
    onLocationDidChange,
    user,
    inputRef,
    blurInput,
    loader,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const [customKeyboard, setCustomKeyboard] = useState({
    component: undefined,
    initialProps: undefined,
  });
  const [address, setAddress] = useState('');
  const [locationSelectorVisible, setLocationSelectorVisible] = useState(false);
  const [media, setMedia] = useState([]);
  const [mediaSources, setMediaSources] = useState([]);
  const [value, setValue] = useState('');
  const [heiht, setHeiht] = useState(0);
  const [isCameralContainer, setIsCameralContainer] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const photoUploadDialogRef = useRef();
  const removePhotoDialogRef = useRef();
  const [selectedBgColorId, setSelectedBgColorId] = useState(0);
  const [selectedBgColor, setSelectedBgColor] = useState(bgColors[0]);
  const [isTextExceeded, setIsTextExceeded] = useState(false);
  const [backgroundPickCol, setBackgroundPickCol] = useState('#fff');

  let _isShowBgColors = true;
  let _bgColorListWidth = new Animated.Value(screenWidth - 60);
  let _toggleZindexValue = new Animated.Value(2);
  let _degTransformToggle = new Animated.Value(0);
  let _scaleTransformToggle = new Animated.Value(0);
  let _isKeyBoardVisibled = false;
  let _distanceTopOption = new Animated.Value(0);
  let _prevTranslatetionY = 0;

  const androidAddPhotoOptions = [
    IMLocalized('Importer depuis la bibliothèque'),
    IMLocalized('Prendre une photo'),
    IMLocalized('Enregistrer une vidéo'),
    IMLocalized('Annuler'),
  ];

  const iosAddPhotoOptions = [
    IMLocalized('Importer depuis la bibliothèque'),
    IMLocalized('Ouvrir la caméra'),
    IMLocalized('Annuler'),
  ];

  const addPhotoCancelButtonIndex = {
    ios: 2,
    android: 3,
  };

  const showKeyboardView = (component) => {
    setCustomKeyboard({
      component,
      initialProps: { appStyles },
    });
  };

  const onVoiceRecord = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    if (response.status === 'granted') {
      // Alert.alert("permission granted");
      showKeyboardView('BottomAudioRecorder');
    } else {
      Alert.alert(
        IMLocalized('Audio permission denied'),
        IMLocalized(
          'You must enable audio recording permissions in order to send a voice note.',
        ),
      );
    }
  };

  const addPhotoOptions =
    Platform.OS === 'android' ? androidAddPhotoOptions : iosAddPhotoOptions;

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    let keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    let keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      _keyboardWillShow,
    );
    let keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );
    if (bgColors.length === 0) {
      return;
    }

    preloadBgImages(bgColors);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const _keyboardWillShow = () => {
    _distanceTopOption.setValue(0);
    _prevTranslatetionY = 0;
  };
  const _keyboardDidShow = () => {
    _isKeyBoardVisibled = true;
    if (!_isShowBgColors) {
      Animated.timing(_scaleTransformToggle, {
        toValue: 0,
        duration: 100,
      }).start(() => {
        _toggleZindexValue.setValue(2);
        Animated.timing(_degTransformToggle, {
          toValue: 0,
          duration: 200,
        }).start(() => {});
      });
      Animated.spring(_bgColorListWidth, {
        toValue: screenWidth - 60,
        duration: 300,
      }).start(() => {
        _isShowBgColors = true;
      });
    }
  };

  const onContentSizeChangeHandler = ({ nativeEvent }) => {
    const { height } = nativeEvent.contentSize;
    Animated.timing(_editorWrapperHeight, {
      toValue: height + 20,
      duration: 0,
    }).start();
  };
  const onGestureEventHandler = ({ nativeEvent }) => {
    if (!_isKeyBoardVisibled) {
      const { translationY } = nativeEvent;
      if (_prevTranslatetionY - translationY > 610) {
        return;
      }
      _distanceTopOption.setValue(_prevTranslatetionY - translationY);
    }
  };
  const onHandlerStateChangeHandler = ({ nativeEvent }) => {
    if (_isKeyBoardVisibled) {
      return;
    }
    if (nativeEvent.state === State.END) {
      let { translationY } = nativeEvent;
      translationY = _prevTranslatetionY - translationY;
      if (Math.abs(translationY) < 150) {
        Animated.spring(_distanceTopOption, {
          toValue: 0,
          duration: 200,
        }).start(() => (_prevTranslatetionY = 0));
      } else if (Math.abs(translationY) > 150 && Math.abs(translationY) < 350) {
        Animated.spring(_distanceTopOption, {
          toValue: 247.5,
          duration: 200,
        }).start(() => (_prevTranslatetionY = 247.5));
      } else {
        Animated.spring(_distanceTopOption, {
          toValue: 600,
          duration: 200,
        }).start(() => (_prevTranslatetionY = 600));
      }
    }
  };
  const onSelectBgColorHandler = async (bgColorId) => {
    // this.setState({
    //   ...this.state,
    //   selectedBgColorId: bgColorId
    // })
    const selectedBgColor = bgColors.filter(
      (bgColor) => bgColor.id === bgColorId,
    )[0];

    setSelectedBgColor(selectedBgColor);

    setSelectedBgColorId(bgColorId);
  };
  const onTogglebBgColorListHandler = () => {
    if (!_isShowBgColors) {
      Animated.timing(_scaleTransformToggle, {
        toValue: 0,
        duration: 100,
      }).start(() => {
        _toggleZindexValue.setValue(2);
        Animated.timing(_degTransformToggle, {
          toValue: 0,
          duration: 200,
        }).start(() => {});
      });
      Animated.spring(_bgColorListWidth, {
        toValue: screenWidth - 60,
        duration: 300,
      }).start(() => {
        _isShowBgColors = true;
      });
    } else {
      Animated.timing(_degTransformToggle, {
        toValue: -90,
        duration: 100,
      }).start(() => {
        _toggleZindexValue.setValue(0);
        Animated.timing(_scaleTransformToggle, {
          toValue: 1,
          duration: 200,
        }).start(() => {});
      });
      Animated.timing(_bgColorListWidth, {
        toValue: 0,
        duration: 300,
      }).start(() => {
        _isShowBgColors = false;
      });
    }
  };
  const onPressShowOptions = () => {
    Keyboard.dismiss();
    if (_prevTranslatetionY == 0) {
      Animated.spring(_distanceTopOption, {
        toValue: 247.5,
        duration: 200,
      }).start(() => (_prevTranslatetionY = 247.5));
    } else if (_prevTranslatetionY === 247.5) {
      Animated.spring(_distanceTopOption, {
        toValue: 600,
        duration: 200,
      }).start(() => (_prevTranslatetionY = 600));
    } else {
      Animated.spring(_distanceTopOption, {
        toValue: 247.5,
        duration: 200,
      }).start(() => (_prevTranslatetionY = 247.5));
    }
  };

  const _keyboardDidHide = () => {
    _isKeyBoardVisibled = false;
  };

  const onLocationSelectorPress = () => {
    setLocationSelectorVisible(!locationSelectorVisible);
  };

  const onLocationSelectorDone = (address) => {
    setLocationSelectorVisible(!locationSelectorVisible);
    setAddress(address);
  };

  const onChangeLocation = (address) => {
    setAddress(address);
    onLocationDidChange(address);
  };

  const onChangeText = (value) => {
    const Post = {
      postText: value,
      commentCount: 0,
      reactionsCount: 0,
      reactions: {
        surprised: 0,
        angry: 0,
        sad: 0,
        laugh: 0,
        like: 0,
        cry: 0,
        love: 0,
      },
      imageOrColor: {
        isImage: !selectedBgColor.isPureColor,
        textColor: selectedBgColor.textColor,
        url: selectedBgColor.isPureColor
          ? selectedBgColor.color
          : selectedBgColor.bgImage_url,
      },
    };

    setValue(value);
    onPostDidChange(Post);

    if (value.length > 140) {
      setIsTextExceeded(true);
    } else {
      setIsTextExceeded(false);
    }
  };

  const onCameraIconPress = () => {
    if (Platform.OS === 'ios') {
      setIsCameraOpen(true);
    } else {
      photoUploadDialogRef.current.show();
    }
  };

  const preloadBgImages = (bgImages) => {
    let preFetchTasks = [];
    for (let bgImage of bgImages) {
      if (!bgImage.isPureColor) {
        preFetchTasks.push(Image.prefetch(bgImage.bgImage_url));
      }
    }
    Promise.all(preFetchTasks).then((results) => {
      let downloadedAll = true;
      results.forEach((result) => {
        if (!result) {
          downloadedAll = false;
        }
      });
    });
  };

  const onPhotoUploadDialogDoneIOS = (index) => {
    if (index == 1) {
      onLaunchCamera();
    }

    if (index == 0) {
      onOpenPhotos();
    }
  };

  const onPhotoUploadDialogDoneAndroid = (index) => {
    if (index == 2) {
      onLaunchVideoCamera();
    }

    if (index == 1) {
      onLaunchCamera();
    }

    if (index == 0) {
      onOpenPhotos();
    }
  };

  const onPhotoUploadDialogDone = (index) => {
    const onPhotoUploadDialogDoneSetter = {
      ios: () => onPhotoUploadDialogDoneIOS(index),
      android: () => onPhotoUploadDialogDoneAndroid(index),
    };

    onPhotoUploadDialogDoneSetter[Platform.OS]();
  };

  const onLaunchCamera = () => {
    ImagePicker.openCamera({
      cropping: false,
    }).then((image) => {
      const { source, mime, filename, uploadUri } = extractSourceFromFile(
        image,
      );

      setMedia([...media, { source, mime }]);
      setMediaSources([...mediaSources, { filename, uploadUri, mime }]);
      onSetMedia([...mediaSources, { filename, uploadUri, mime }]);
    });
  };

  const onLaunchVideoCamera = () => {
    ImagePicker.openCamera({
      cropping: false,
      mediaType: 'video',
    }).then((image) => {
      const { source, mime, filename, uploadUri } = extractSourceFromFile(
        image,
      );

      setMedia([...media, { source, mime }]);
      setMediaSources([...mediaSources, { filename, uploadUri, mime }]);
      onSetMedia([...mediaSources, { filename, uploadUri, mime }]);
    });
  };

  const onOpenPhotos = () => {
    ImagePicker.openPicker({
      cropping: false,
      multiple: true,
    }).then((image) => {
      const newPhotos = [];
      const sources = image.map((image) => {
        const { source, mime, filename, uploadUri } = extractSourceFromFile(
          image,
        );

        newPhotos.push({ source, mime });

        return { filename, uploadUri, mime };
      });
      setMedia([...media, ...newPhotos]);
      setMediaSources([...mediaSources, ...sources]);
      onSetMedia([...mediaSources, ...sources]);
    });
  };

  const onRemovePhotoDialogDone = (index) => {
    if (index === 0) {
      removePhoto();
    } else {
      setSelectedIndex(null);
    }
  };

  const onMediaPress = async (index) => {
    await setSelectedIndex(index);
    removePhotoDialogRef.current.show();
  };

  const onCameraClose = () => {
    setIsCameraOpen(false);
  };

  const onImagePost = (item) => {
    const { source, mime, filename, uploadUri } = extractSourceFromFile({
      uri: item.uri,
      mime: item.mime,
    });
    setMedia([...media, { source, mime }]);
    setMediaSources([...mediaSources, { filename, uploadUri, mime }]);
    onSetMedia([...mediaSources, { filename, uploadUri, mime }]);
  };

  const removePhoto = async () => {
    const slicedMedia = [...media];
    const slicedMediaSources = [...mediaSources];
    await slicedMedia.splice(selectedIndex, 1);
    await slicedMediaSources.splice(selectedIndex, 1);
    setMedia([...slicedMedia]);
    setMediaSources([...slicedMediaSources]);
    onSetMedia([...slicedMediaSources]);
  };

  const onTextFocus = () => {
    // setIsCameralContainer(false);
  };

  const onToggleImagesContainer = () => {
    blurInput();
    toggleImagesContainer();
  };

  const toggleImagesContainer = () => {
    setIsCameralContainer(!isCameralContainer);
  };

  const onStoryItemPress = (item) => {
    console.log('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      // enabled={false}
      style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerContainer}>
          <TNStoryItem
            onPress={onStoryItemPress}
            item={user}
            imageContainerStyle={styles.userIconContainer}
            imageStyle={styles.userIcon}
            appStyles={AppStyles}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{user.pageName || user.firstName}</Text>
            <Text style={styles.subtitle}>{address}</Text>
          </View>
        </View>
        {isTextExceeded && (
          <View style={styles.postInputContainer}>
            <TextInput
              placeholder={'Exprime ta pensée'}
              placeholderTextColor="grey"
              ref={inputRef}
              style={[
                styles.postInput,
                { backgroundColor: '#3a3a3a', height: Math.max(35, heiht) },
              ]}
              onChangeText={onChangeText}
              value={value}
              multiline={true}
              editable={true}
              onFocus={onTextFocus}
              onContentSizeChange={(event) => {
                setHeiht(event.nativeEvent.contentSize.height);
              }}
            />
          </View>
        )}

        {selectedBgColor && !isTextExceeded && (
          <ImageBackground
            source={
              !selectedBgColor.isPureColor
                ? { uri: selectedBgColor.bgImage_url }
                : {}
            }
            style={{
              ...styles.editorWrapper,
              backgroundColor: selectedBgColor.isPureColor
                ? selectedBgColor.color
                : '',
            }}>
            <Animated.View
              style={{
                height: _editorWrapperHeight,
                alignSelf: 'stretch',
                width: '100%',
                justifyContent: 'center',
              }}>
              <TextInput
                onChangeText={onChangeText}
                ref={inputRef}
                value={value}
                onContentSizeChange={onContentSizeChangeHandler}
                placeholderTextColor={selectedBgColor.textColor}
                placeholder={'Exprime ta pensée'}
                multiline
                style={{
                  ...styles.editor,
                  fontSize: 26,
                  textAlign: 'center',
                  color: selectedBgColor.textColor,
                  fontWeight: 'bold',
                }}
              />
            </Animated.View>
          </ImageBackground>
        )}
      </View>
      <View style={[styles.bottomContainer]}>
        {!isTextExceeded && (
          <Animated.View style={styles.toolOptionsWrapper}>
            <View style={styles.bgColorsWrapper}>
              <TouchableWithoutFeedback
                style={styles.btnBgColor}
                onPress={onTogglebBgColorListHandler}>
                <Animated.Image
                  style={{
                    ...styles.bgImage,
                    ...styles.toggleBgColors,
                    zIndex: _toggleZindexValue,
                  }}
                  source={require('../../../../assets/icons/left-arrow.png')}
                />
                <Animated.Image
                  style={{
                    ...styles.bgImage,
                    ...styles.toggleBgColors,
                    zIndex: 1,
                    transform: [{ scale: _scaleTransformToggle }],
                  }}
                  source={require('../../../../assets/icons/letter-a.png')}
                />
              </TouchableWithoutFeedback>
              <Animated.View
                style={{ flexDirection: 'row', width: _bgColorListWidth }}>
                <ScrollView
                  horizontal={true}
                  style={{ ...styles.bgColorsScrollView }}
                  showsHorizontalScrollIndicator={false}>
                  {bgColors.map((bgColor, index) => (
                    <View key={index}>
                      {bgColor.isPureColor && (
                        <TouchableWithoutFeedback
                          style={styles.bgColor}
                          onPress={() => onSelectBgColorHandler(bgColor.id)}>
                          <View
                            style={{
                              backgroundColor: bgColor.color,
                              ...styles.bgImage,
                              borderColor:
                                selectedBgColorId === bgColor.id
                                  ? '#318bfb'
                                  : '#333',
                              borderWidth:
                                selectedBgColorId === bgColor.id ? 3 : 1,
                            }}
                          />
                        </TouchableWithoutFeedback>
                      )}
                      {!bgColor.isPureColor && (
                        <TouchableWithoutFeedback
                          style={styles.bgColor}
                          onPress={() => onSelectBgColorHandler(bgColor.id)}>
                          <Image
                            style={{
                              ...styles.bgImage,
                              borderColor:
                                selectedBgColorId === bgColor.id
                                  ? '#318bfb'
                                  : '#333',
                              borderWidth:
                                selectedBgColorId === bgColor.id ? 3 : 1,
                            }}
                            source={{ uri: bgColor.bgImage_url }}
                          />
                        </TouchableWithoutFeedback>
                      )}
                    </View>
                  ))}
                </ScrollView>
                <TouchableWithoutFeedback
                  style={styles.btnBgColor}
                  onPress={() => console.log('okeee')}>
                  <Image
                    style={{ ...styles.bgImage, ...styles.moreBgColors }}
                    source={require('../../../../assets/icons/more.png')}
                  />
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
          </Animated.View>
        )}
        <View style={styles.postImageAndLocationContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[
              styles.imagesContainer,
              isCameralContainer ? { display: 'flex' } : { display: 'none' },
            ]}>
            {media.map((singleMedia, index) => {
              const { source, mime } = singleMedia;

              if (mime.startsWith('image')) {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onMediaPress(index)}
                    style={styles.imageItemcontainer}>
                    <Image style={styles.imageItem} source={{ uri: source }} />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onMediaPress(index)}
                    style={styles.imageItemcontainer}>
                    <Video
                      source={{
                        uri: source,
                      }}
                      resizeMode={'cover'}
                      shouldPlay={false}
                      isMuted={true}
                      style={styles.imageItem}
                    />
                  </TouchableOpacity>
                );
              }
            })}
            <TouchableOpacity
              onPress={onCameraIconPress}
              style={[styles.imageItemcontainer, styles.imageBackground]}>
              <Image
                style={styles.addImageIcon}
                source={AppStyles.iconSet.cameraFilled}
              />
            </TouchableOpacity>
          </ScrollView>
          <View style={[styles.addTitleAndlocationIconContainer]}>
            <View style={styles.addTitleContainer}>
              {!loader ? (
                <Text style={styles.addTitle}>
                  {!isCameralContainer
                    ? IMLocalized('Ajoute du contenu à ta publication')
                    : IMLocalized('Ajoute une photo à ta publication')}
                </Text>
              ) : (
                <Progress.Bar indeterminate={true} progress={0.3} width={200} />
              )}
            </View>
            <View style={[styles.iconsContainer, { marginRight: 20 }]}>
              <TNTouchableIcon
                containerStyle={styles.iconContainer}
                imageStyle={[styles.icon, styles.pinpointTintColor]}
                iconSource={require('../../../../assets/menuIcons/music.png')}
                onPress={() => {
                  console.log('onMusicSelectorPress');
                }}
                appStyles={AppStyles}
              />
              <TNTouchableIcon
                containerStyle={styles.iconContainer}
                imageStyle={[styles.icon, styles.pinpointTintColor]}
                iconSource={require('../../../../assets/menuIcons/audio.png')}
                onPress={onVoiceRecord}
                appStyles={AppStyles}
              />
              <TNTouchableIcon
                onPress={onToggleImagesContainer}
                containerStyle={styles.iconContainer}
                imageStyle={[
                  styles.icon,
                  isCameralContainer
                    ? styles.cameraFocusTintColor
                    : styles.cameraUnfocusTintColor,
                ]}
                iconSource={AppStyles.iconSet.cameraFilled}
                appStyles={AppStyles}
              />
              <TNTouchableIcon
                containerStyle={styles.iconContainer}
                imageStyle={[styles.icon, styles.pinpointTintColor]}
                iconSource={AppStyles.iconSet.pinpoint}
                onPress={onLocationSelectorPress}
                appStyles={AppStyles}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.blankBottom} />

      <IMLocationSelectorModal
        isVisible={locationSelectorVisible}
        onCancel={onLocationSelectorPress}
        onDone={onLocationSelectorDone}
        onChangeLocation={onChangeLocation}
        appStyles={AppStyles}
      />
      <ActionSheet
        ref={photoUploadDialogRef}
        title={IMLocalized('Ajouter une photo')}
        options={addPhotoOptions}
        cancelButtonIndex={addPhotoCancelButtonIndex[Platform.OS]}
        onPress={onPhotoUploadDialogDone}
      />
      <ActionSheet
        ref={removePhotoDialogRef}
        title={IMLocalized('Supprimer la photo')}
        options={[IMLocalized('Supprimer'), IMLocalized('Annuler')]}
        destructiveButtonIndex={0}
        cancelButtonIndex={1}
        onPress={onRemovePhotoDialogDone}
      />
      <IMCameraModal
        isCameraOpen={isCameraOpen}
        onImagePost={onImagePost}
        onCameraClose={onCameraClose}
      />
    </KeyboardAvoidingView>
  );
}

CreatePost.propTypes = {
  user: PropTypes.object,
  onPostDidChange: PropTypes.func,
  onSetMedia: PropTypes.func,
  onLocationDidChange: PropTypes.func,
  blurInput: PropTypes.func,
  inputRef: PropTypes.any,
};

export default withNavigation(CreatePost);

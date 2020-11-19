import React, { Component, PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  ProgressBarAndroid,
  Button,
  TouchableOpacity,
  Dimensions,
  Alert,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { RNCamera } from 'expo-camera';
// import CameraRoll from 'expo-camera';
import EmojiBoard from 'react-native-emoji-board';

/**
This is the Camera Screen; it handles the capturing of images to be sent as a message or to be sent as a story/status
**/
export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flash: true, // if true the camera flash is on; otherwise it is off
      cameratype: true, //if true the camera is at the back; otherwise it is at the front,
      capturedimage: null,
      message: '',
      showEmojiKeyboard: false,
    };
  }

  requestCameraPermission = async function (camera) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //we can now use the storage
        this.takePicture(camera);
      } else {
        Alert.alert('Please allow storage permission!');
      }
    } catch (err) {
      console.warn('err:', err);
    }
  };

  takePicture = async function (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);

    //save the image to device
    //   CameraRoll.saveToCameraRoll(data.uri)
    //     .then((uri) => {
    //       //pass the stored image to the capturedimage state
    //       this.setState({ capturedimage: data.uri });
    //     })
    //     .catch((err) => console.warn('err:', err));
    // };

    //uncomment this if you need to delete stored images
    // componentWillUnmount() {
    //     this.clearCapturedImage();
    // }
    //
    // //when the back button is pressed, we need to delete any image taken with the camera to avoid having unneccessary images in the Gallery
    // clearCapturedImage =()=> {
    //   if(this.state.capturedimage != null){
    //     CameraRoll.deletePhotos([this.state.capturedimage]);
    //   }
  };

  handleMessageTextChange = (event) => {
    this.setState((previousState) => {
      return { message: event.trim() };
    });
  };

  onEmojiClick = (emoji) => {
    this.setState({ message: this.state.message + emoji.code });
  };

  render() {
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'Maria Guttenberg ');
    const userimage = navigation.getParam('userimage', null);
    const onlinestatus = navigation.getParam('onlinestatus', 'offline');

    if (this.state.capturedimage == null) {
      return (
        <View style={styles.container}>
          <RNCamera
            style={styles.preview}
            type={
              this.state.cameratype == true
                ? RNCamera.Constants.Type.back
                : RNCamera.Constants.Type.front
            }
            flashMode={
              this.state.flash == true
                ? RNCamera.Constants.FlashMode.on
                : RNCamera.Constants.FlashMode.off
            }
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'WhatsApp needs permission to use your camera device',
              buttonPositive: 'Ok',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio',
              message: 'WhatsApp needs permission to use your audio device',
              buttonPositive: 'Ok',
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.warn(barcodes);
            }}>
            {({ camera, status, recordAudioPermissionStatus }) => {
              return (
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    marginBottom: 20,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: Dimensions.get('screen').width * 0.95,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ flash: !this.state.flash })}
                    style={{ height: 40, width: 40 }}>
                    <Image
                      source={
                        this.state.flash == true
                          ? require('../../../assets/icons/whtasappicon/flash.png')
                          : require('../../../assets/icons/whtasappicon/flash_of.png')
                      }
                      style={{ height: 30, width: 30, tintColor: 'white' }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.requestCameraPermission(camera)}
                    style={styles.capture}>
                    <View
                      style={{
                        height: 70,
                        width: 70,
                        backgroundColor: 'red',
                        borderRadius: 200,
                      }}></View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ cameratype: !this.state.cameratype })
                    }
                    style={{ height: 40, width: 40 }}>
                    <Image
                      source={require('../../../assets/icons/whtasappicon/sync.png')}
                      style={{ height: 30, width: 30, tintColor: 'white' }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          </RNCamera>
        </View>
      );
    } else {
      return (
        <View style={styles.containerPreview}>
          <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle="light-content"
            animated={true}
          />
          <View style={[styles.innerContainer, { ...StyleSheet.absoluteFill }]}>
            <Image
              source={{ uri: this.state.capturedimage }}
              style={styles.fullImage}
            />

            <View style={styles.overlay}>
              <View
                style={[
                  { backgroundColor: 'black', opacity: 0.3 },
                  { ...StyleSheet.absoluteFill },
                ]}
              />

              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 30,
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/arrow_back_long.png')}
                  style={{
                    height: 30,
                    width: 30,
                    alignSelf: 'flex-start',
                    marginLeft: 10,
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 30,
                  marginLeft: -15,
                }}>
                <Image
                  source={userimage}
                  style={{
                    height: 40,
                    width: 40,
                    alignSelf: 'flex-start',
                    marginLeft: 10,
                    borderRadius: 200,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 35,
                  marginLeft: 50,
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/crop.png')}
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'flex-start',
                    marginLeft: 10,
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    showEmojiKeyboard: !this.state.showEmojiKeyboard,
                  })
                }
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 35,
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/emoticon.png')}
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'flex-start',
                    marginLeft: 10,
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 35,
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/text.png')}
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'flex-start',
                    marginLeft: 10,
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 35,
                  marginRight: 10,
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/edit.png')}
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'flex-start',
                    marginLeft: 10,
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.overlayBottom}>
              <View
                style={{
                  borderRadius: 20,
                  flex: 1,
                  marginLeft: 10,
                  marginTop: 20,
                  marginRight: 20,
                }}>
                <View
                  style={[
                    {
                      backgroundColor: 'black',
                      opacity: 0.3,
                      borderRadius: 20,
                    },
                    { ...StyleSheet.absoluteFill },
                  ]}
                />

                <TextInput
                  onChangeText={this.handleMessageTextChange}
                  keyboardType="default"
                  placeholderTextColor="white"
                  returnKeyType={'done'}
                  value={this.state.message}
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    borderRadius: 20,
                    color: 'white',
                    paddingLeft: 10,
                  }}
                  multiline={false}
                  placeholder="Write message"
                />
              </View>

              <TouchableOpacity style={styles.btnCancel}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/paper.png')}
                  style={styles.buttonIconCancel}
                />
              </TouchableOpacity>
            </View>
          </View>

          <EmojiBoard
            containerStyle={{ marginBottom: 70 }}
            showBoard={true}
            showBoard={this.state.showEmojiKeyboard}
            onClick={(emoji) => this.onEmojiClick(emoji)}
            code
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    height: 80,
    width: 80,
    marginBottom: 20,
  },
  containerPreview: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullImage: {
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Flex to fill, position absolute,
  // Fixed left/top, and the width set to the window width
  overlay: {
    height: 80,
    width: Dimensions.get('screen').width,
    position: 'absolute',
    top: 0,
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  overlayBottom: {
    height: 60,
    width: Dimensions.get('screen').width,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  btnCancel: {
    backgroundColor: '#ffbf00',
    borderRadius: 200,
    height: 40,
    marginRight: 10,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonIconCancel: {
    tintColor: 'white',
    height: 30,
    width: 30,
  },
});

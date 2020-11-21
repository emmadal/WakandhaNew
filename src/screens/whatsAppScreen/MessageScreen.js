import React, { Component } from 'react';
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
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar, Icon, Divider } from 'react-native-elements';
import EmojiBoard from 'react-native-emoji-board';

/**
This is the message screen; this is where chats are been sent and received
**/
export default class MessageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      message: '',
      showEmojiKeyboard: false,
    };
  }

  handleMessageTextChange = (event) => {
    this.setState((previousState) => {
      return { message: event.trim() };
    });
  };

  gotoVoiceCall = (username, userimage) => {
    this.props.navigation.navigate('VoiceCallScreen', {
      username: username,
      userimage: userimage,
    });
  };

  gotoVideoCall = (username, userimage) => {
    this.props.navigation.navigate('VideoCallScreen', {
      username: username,
      userimage: userimage,
    });
  };

  gotoCameraScreen = (username, userimage) => {
    this.props.navigation.navigate('CameraScreen', {
      username: username,
      userimage: userimage,
    });
  };

  gotoFriendsProfileScreen = (username, userimage) => {
    this.props.navigation.navigate('FriendsProfileScreen', {
      username: username,
      userimage: userimage,
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
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'#ffbf00'}
          barStyle="light-content"
          animated={true}
        />

        {/*HEADER*/}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: Dimensions.get('screen').width * 0.95,
            marginTop: 40,
          }}>
          <TouchableOpacity
            style={{ marginLeft: 5 }}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../../../assets/icons/whtasappicon/arrow_back_long.png')}
              style={{ height: 25, width: 25, tintColor: '#ffbf00' }}
            />
          </TouchableOpacity>

          <View>
            <TouchableOpacity
              onPress={() => this.gotoFriendsProfileScreen(username, userimage)}
              style={{ marginLeft: 20 }}>
              <Image
                source={userimage}
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 200,
                  marginLeft: -20,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.gotoFriendsProfileScreen(username, userimage)}
              style={{
                height: 10,
                width: 10,
                borderRadius: 200,
                backgroundColor:
                  onlinestatus == 'online' ? '#ffbf00' : '#d3d3d3',
                justifyContent: 'center',
                position: 'absolute',
                top: 20,
                right: 0,
                left: 8,
              }}></TouchableOpacity>
          </View>

          <Text
            numberOfLines={1}
            style={{
              alignSelf: 'center',
              fontSize: 16,
              color: 'black',
              width: 100,
            }}>
            {username}aldalkdal
          </Text>

          <TouchableOpacity
            onPress={() => this.gotoVideoCall(username, userimage)}
            style={{ marginLeft: 10 }}>
            <Image
              source={require('../../../assets/icons/whtasappicon/video.png')}
              style={{ height: 20, width: 20, tintColor: '#ffbf00' }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.gotoVoiceCall(username, userimage)}>
            <Image
              source={require('../../../assets/icons/whtasappicon/phone.png')}
              style={{ height: 20, width: 20, tintColor: '#ffbf00' }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.gotoFriendsProfileScreen(username, userimage)}
            style={{
              borderRadius: 200,
              backgroundColor: '#ffbf00',
              height: 20,
              width: 20,
            }}>
            <Image
              source={require('../../../assets/icons/whtasappicon/more_horizontal.png')}
              style={{ height: 20, width: 20, tintColor: 'white' }}
            />
          </TouchableOpacity>
        </View>

        <Divider
          style={{
            width: Dimensions.get('screen').width * 0.95,
            marginTop: 10,
            height: 1,
            backgroundColor: '#d7d7d7',
          }}
        />
        {/*END HEADER */}
        <ImageBackground
          source={require('../../../assets/images/bgMsgScreen.jpg')}
          style={styles.fullImage}>
          {/* CHAT CONTENTS */}
          <ScrollView
            contentContainerStyle={{ alignItems: 'center' }}
            style={{ width: Dimensions.get('screen').width }}
            vertical
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'column',
                width: '100%',
                marginTop: 20,
                marginRight: 20,
              }}>
              {/* <View
              style={{
                backgroundColor: '#ffbf00',
                color: 'white',
                alignSelf: 'flex-end',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                padding: 10,
              }}>
              <Text style={{ color: 'white' }}>ohh!! Hi, long time</Text>
            </View> */}

              {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
                justifyContent: 'flex-end',
              }}>
              <Text style={{ color: 'gray', fontSize: 10 }}>1:18 pm</Text>
              <Image
                source={require('../../../assets/icons/whtasappicon/done_all.png')}
                style={{ height: 15, width: 15, tintColor: '#ffbf00' }}
              />
            </View> */}
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginTop: 20,
                width: '100%',
                marginLeft: 20,
              }}>
              {/* <View
              style={{
                backgroundColor: '#f2f2f2',
                color: 'black',
                borderBottomLeftRadius: 5,
                alignSelf: 'flex-start',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 5,
                padding: 10,
              }}>
              <Text>Yeah, I was busy with some work</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Text style={{ color: 'gray', fontSize: 10 }}>1:20 pm</Text>
            </View> */}
            </View>

            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'column',
                width: '100%',
                marginTop: 20,
                marginRight: 20,
              }}>
              {/* <View
              style={{
                backgroundColor: '#ffbf00',
                color: 'white',
                alignSelf: 'flex-end',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                padding: 10,
              }}>
              <Text style={{ color: 'white' }}>Nice work 😋</Text>
            </View> */}

              {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
                justifyContent: 'flex-end',
              }}>
              <Text style={{ color: 'gray', fontSize: 10 }}>1:21 pm</Text>
              <Image
                source={require('../../../assets/icons/whtasappicon/done_all.png')}
                style={{ height: 15, width: 15, tintColor: '#ffbf00' }}
              />
            </View> */}
            </View>

            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'column',
                width: '100%',
                marginTop: 20,
                marginRight: 20,
              }}>
              {/* <View
              style={{
                backgroundColor: '#ffbf00',
                color: 'white',
                alignSelf: 'flex-end',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                padding: 10,
              }}>
              <Text style={{ color: 'white' }}>You working again?</Text>
            </View> */}

              {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
                justifyContent: 'flex-end',
              }}>
              <Text style={{ color: 'gray', fontSize: 10 }}>1:21 pm</Text>
              <Image
                source={require('../../../assets/icons/whtasappicon/done_all.png')}
                style={{ height: 15, width: 15, tintColor: '#ffbf00' }}
              />
            </View> */}
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginTop: 20,
                width: '100%',
                marginLeft: 20,
              }}>
              {/* <View
              style={{
                backgroundColor: '#f2f2f2',
                color: 'black',
                borderBottomLeftRadius: 5,
                alignSelf: 'flex-start',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 5,
                padding: 10,
              }}>
              <Text>Not really 😂</Text>
            </View> */}
              {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Text style={{ color: 'gray', fontSize: 10 }}>1:22 pm</Text>
            </View> */}
            </View>

            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'column',
                width: '100%',
                marginTop: 20,
                marginRight: 20,
              }}>
              {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                elevation: 2,
                color: 'white',
                alignSelf: 'flex-end',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                padding: 10,
              }}>
              <Text style={{ color: '#ffbf00', alignSelf: 'center' }}>₦ </Text>
              <Text style={{ color: '#ffbf00', fontWeight: 'bold' }}>⇅ </Text>
              <Text
                style={{
                  color: '#ffbf00',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginRight: 5,
                }}>
                500
              </Text>
              <Image
                source={require('../../../assets/icons/whtasappicon/arrow_back_long.png')}
                style={{ height: 25, width: 25, tintColor: '#ffbf00' }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
                justifyContent: 'flex-end',
              }}>
              <Text style={{ color: 'gray', fontSize: 10 }}>1:21 pm</Text>
              <Image
                source={require('../../../assets/icons/whtasappicon/done_all.png')}
                style={{ height: 15, width: 15, tintColor: '#ffbf00' }}
              />
            </View> */}
            </View>

            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'column',
                width: '100%',
                marginTop: 20,
                marginRight: 20,
                marginBottom: 80,
              }}>
              {/* <View
              style={{
                backgroundColor: '#ffbf00',
                color: 'white',
                alignSelf: 'flex-end',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                padding: 10,
              }}>
              <Image
                source={require('../../../assets/images/marie.jpg')}
                style={{ height: 200, width: 200, borderRadius: 5 }}
              />
              <Text style={{ color: 'white' }}>
                This is the lady I told you about
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
                justifyContent: 'flex-end',
              }}>
              <Text style={{ color: 'gray', fontSize: 10 }}>1:21 pm</Text>
              <Image
                source={require('../../../assets/icons/whtasappicon/done_all.png')}
                style={{ height: 15, width: 15, tintColor: '#ffbf00' }}
              />
            </View> */}
            </View>
          </ScrollView>
          {/* END OF CHAT CONTENTS*/}

          {/* MESSAGE OPTIONS DIALOG */}
          <View
            style={{
              display: this.state.isVisible == true ? 'flex' : 'none',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 250,
                width: Dimensions.get('screen').width * 0.9,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#d3d3d3',
                borderRadius: 5,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'space-around',
                bottom: 60,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'column' }}>
                  <TouchableOpacity
                    style={{
                      borderColor: '#7a81d3',
                      borderWidth: 1,
                      borderRadius: 200,
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../../assets/icons/whtasappicon/file.png')}
                      style={{ tintColor: '#7a81d3', height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
                    Document
                  </Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                  <TouchableOpacity
                    style={{
                      borderColor: '#69c8b7',
                      borderWidth: 1,
                      borderRadius: 200,
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../../assets/icons/whtasappicon/credit_card.png')}
                      style={{ tintColor: '#69c8b7', height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
                    Payment
                  </Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                  <TouchableOpacity
                    style={{
                      borderColor: '#9153a7',
                      borderWidth: 1,
                      borderRadius: 200,
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../../assets/icons/whtasappicon/image.png')}
                      style={{ tintColor: '#9153a7', height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
                    Gallery
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'column' }}>
                  <TouchableOpacity
                    style={{
                      borderColor: '#f09030',
                      borderWidth: 1,
                      borderRadius: 200,
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../../assets/icons/whtasappicon/headphones.png')}
                      style={{ tintColor: '#f09030', height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
                    Audio
                  </Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                  <TouchableOpacity
                    style={{
                      borderColor: '#3ab17b',
                      borderWidth: 1,
                      borderRadius: 200,
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../../assets/icons/whtasappicon/map.png')}
                      style={{ tintColor: '#3ab17b', height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
                    Location
                  </Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                  <TouchableOpacity
                    style={{
                      borderColor: '#0fabf5',
                      borderWidth: 1,
                      borderRadius: 200,
                      height: 60,
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../../assets/icons/whtasappicon/profile.png')}
                      style={{ tintColor: '#0fabf5', height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
                    Profile
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* END OF MESSAGE OPTIONS DIALOG */}

          <EmojiBoard
            containerStyle={{ marginBottom: 50 }}
            showBoard={true}
            showBoard={this.state.showEmojiKeyboard}
            onClick={(emoji) => this.onEmojiClick(emoji)}
            code
          />

          {/*BOTTOM CONTROLS*/}

          <View style={styles.bottomControlView}>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  showEmojiKeyboard: !this.state.showEmojiKeyboard,
                })
              }
              style={styles.btnCall}>
              <Image
                source={require('../../../assets/icons/whtasappicon/emoticon.png')}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>

            <TextInput
              onChangeText={this.handleMessageTextChange}
              keyboardType="default"
              returnKeyType={'done'}
              value={this.state.message}
              style={{ width: 135, marginLeft: -10 }}
              multiline={false}
              placeholder="Type your message"
            />

            <TouchableOpacity style={styles.btnSent}>
              <Image
                source={require('../../../assets/icons/whtasappicon/paper.png')}
                style={styles.buttonIconSent}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.setState({ isVisible: !this.state.isVisible })
              }
              style={styles.btnCall}>
              <Image
                source={require('../../../assets/icons/whtasappicon/attach.png')}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => this.gotoCameraScreen(username, userimage)}
              style={styles.btnCall}>
              <Image
                source={require('../../../assets/icons/whtasappicon/camera.png')}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnCancel}>
              <Image
                source={require('../../../assets/icons/whtasappicon/mic.png')}
                style={styles.buttonIconCancel}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/*END OF BOTTOM CONTROLS*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textView: {
    fontSize: 18,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 35,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 40,
    paddingLeft: 40,
    marginTop: 30,
    color: 'black',
  },
  btnCall: {
    backgroundColor: 'white',
    borderRadius: 200,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    tintColor: 'gray',
    height: 25,
    width: 25,
  },
  info: {
    color: '#d3d3d3',
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  btnSent: {
    backgroundColor: '#ffbf00',
    borderRadius: 200,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIconSent: {
    tintColor: 'white',
    height: 25,
    width: 25,
  },
  btnCancel: {
    backgroundColor: '#ffbf00',
    borderRadius: 200,
    height: 40,
    marginRight: 5,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIconCancel: {
    tintColor: 'white',
    height: 25,
    width: 25,
  },
  singleView: {
    height: 20,
    width: Dimensions.get('screen').width,
    backgroundColor: '#71c55d',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 70,
  },
  bottomControlView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    elevation: 5,
  },

  fullImage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.8,
    resizeMode: 'cover',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

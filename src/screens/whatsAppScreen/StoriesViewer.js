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
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import EmojiBoard from 'react-native-emoji-board';

/**
This is the story viewer screen; it is where the users view their stories or the stories of their friends
**/

export default class StoriesViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      showEmojiKeyboard: false,
      statuscounter: 0,
      progressStatus: 0,
      noOfStatus: props.navigation.getParam('storycount', null),
    };
  }

  componentDidMount() {
    this.start_Progress();
  }

  componentWillUnmount() {
    this.stop_Progress();
    this.clear_Progress();
  }

  handleMessageTextChange = (event) => {
    this.setState((previousState) => {
      return { message: event.trim() };
    });
  };

  onEmojiClick = (emoji) => {
    this.setState({ message: this.state.message + emoji.code });
  };

  start_Progress = () => {
    if (this.state.statuscounter == this.state.noOfStatus) {
      this.props.navigation.goBack();
    } else {
      this.clear_Progress();
      this.stop_Progress();
      this.setState({ statuscounter: this.state.statuscounter + 1 });
      this.value = setInterval(() => {
        if (this.state.progressStatus < 1) {
          this.setState({ progressStatus: this.state.progressStatus + 0.2 });
        } else {
          this.start_Progress();
        }
      }, 1000);
    }
  };

  stop_Progress = () => {
    clearInterval(this.value);
  };

  clear_Progress = () => {
    this.setState({ progressStatus: 0.0 });
  };

  render() {
    const { navigation } = this.props;
    const userimage = navigation.getParam('userimage', null);
    const storyimage = navigation.getParam('storyimage', null);
    const viewer = navigation.getParam('viewer', null);
    const viewcount = navigation.getParam('viewcount', null);

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
            source={storyimage[this.state.statuscounter - 1]}
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
                marginLeft: -30,
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

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ffbf00',
                  marginRight: 5,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 10,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}>
                  {this.state.statuscounter}
                </Text>
              </TouchableOpacity>

              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={this.state.progressStatus}
                color="white"
                width={100}
                height={5}
              />
            </View>

            {viewer == 'my' ? (
              <TouchableOpacity
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 200,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 35,
                  marginRight: 30,
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/eye.png')}
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: 'flex-start',
                    marginLeft: 10,
                    tintColor: 'white',
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>
                  {viewcount}
                </Text>
              </TouchableOpacity>
            ) : (
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
                  marginRight: 30,
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
            )}
          </View>

          {viewer == 'my' ? null : (
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
          )}
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

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
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

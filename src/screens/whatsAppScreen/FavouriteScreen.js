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
  FlatList,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar, Icon, Divider, Overlay } from 'react-native-elements';
import favouritesListData from '../../data/favouritesListData';

/**
This is the user Favourites screen; it handles the display of the user's favourite items/chats
**/
export default class FavouriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      isVisible: false,
      username: '',
      userimage: null,
      onlinestatus: 'offline',
    };
  }

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

  gotoFriendsProfileScreen = (username, userimage) => {
    this.props.navigation.navigate('FriendsProfileScreen', {
      username: username,
      userimage: userimage,
    });
  };

  gotoMessageScreen = (username, userimage, onlinestatus) => {
    this.props.navigation.navigate('MessageScreen', {
      username: username,
      userimage: userimage,
      onlinestatus: onlinestatus,
    });
  };

  chatAlertDialog(username, userimage, onlinestatus) {
    this.setState({
      isVisible: true,
      username: username,
      userimage: userimage,
      onlinestatus: onlinestatus,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/*HEADER*/}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: Dimensions.get('screen').width * 0.95,
            marginTop: 30,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={this.props.navigation.openDrawer}>
            <Image
              source={require('../../../assets/icons/whtasappicon/arrow_back_long.png')}
              style={{ height: 25, width: 25, tintColor: '#ffbf0f' }}
            />
          </TouchableOpacity>

          <Text style={{ fontWeight: 'bold', position: 'absolute', left: 50 }}>
            Your Favourites
          </Text>

          <TouchableOpacity
            style={{
              borderRadius: 200,
              height: 20,
              width: 20,
              marginRight: 10,
              backgroundColor: '#ffbf0f',
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
            height: 1,
            backgroundColor: '#d7d7d7',
          }}
        />
        {/*END HEADER */}

        {/* STORIES BODY*/}
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={{ justifyContent: 'center' }}
          data={favouritesListData}
          renderItem={({ item, index }) => {
            return (
              // implemented with Text and Button as children
              <TouchableOpacity
                onPress={() =>
                  this.chatAlertDialog(item.name, item.image, item.onlinestatus)
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    alignItems: 'center',
                    marginLeft: 20,
                    width: Dimensions.get('screen').width * 0.95,
                  }}>
                  {item.onlinestatus == 'online' ? (
                    <TouchableOpacity
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 200,
                        backgroundColor: '#ffbf0f',
                      }}
                    />
                  ) : (
                    <TouchableOpacity
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 200,
                        backgroundColor: '#d3d3d3',
                      }}
                    />
                  )}

                  <Avatar
                    rounded
                    source={item.image}
                    size="large"
                    style={{
                      height: 65,
                      width: 65,
                      borderRadius: 200,
                      borderWidth: 2,
                      marginLeft: 10,
                      borderColor: '#ffbf0f',
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 10,
                      width: '50%',
                    }}>
                    <Text
                      style={{
                        width: '100%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}>
                      {item.name}
                    </Text>
                    {item.messagetype == 'text' ? (
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={require('../../../assets/icons/whtasappicon/done_all.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: item.seen == true ? 'gray' : '#ffbf0f',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: item.seen == true ? null : 'bold',
                            color: item.seen == true ? 'gray' : 'black',
                          }}>
                          {item.message}
                        </Text>
                      </View> //if
                    ) : item.messagetype == 'voice' ? (
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={require('../../../assets/icons/whtasappicon/done_all.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: item.seen == true ? 'gray' : '#ffbf0f',
                          }}
                        />
                        <Image
                          source={require('../../../assets/icons/whtasappicon/mic.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: item.seen == true ? 'gray' : '#ffbf0f',
                          }}
                        />
                        <Text
                          style={{
                            color: item.seen == true ? 'gray' : '#ffbf0f',
                            fontSize: 10,
                            marginLeft: 10,
                          }}>
                          {item.duration}
                        </Text>
                      </View> //else if
                    ) : item.messagetype == 'audio' ? (
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={require('../../../assets/icons/whtasappicon/done_all.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: item.seen == true ? 'gray' : '#ffbf0f',
                          }}
                        />
                        <Image
                          source={require('../../../assets/icons/whtasappicon/music.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: item.seen == true ? 'gray' : '#ffbf0f',
                          }}
                        />
                        <Text
                          style={{
                            color: item.seen == true ? 'gray' : '#ffbf0f',
                            fontSize: 10,
                            marginLeft: 10,
                          }}>
                          {item.duration}
                        </Text>
                      </View> //else if
                    ) : item.messagetype == 'video' ? (
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={require('../../../assets/icons/whtasappicon/done_all.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: item.seen == true ? 'gray' : '#ffbf0f',
                          }}
                        />
                        <Image
                          source={require('../../../assets/icons/whtasappicon/video.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: item.seen == true ? 'gray' : '#71c55d',
                          }}
                        />
                        <Text
                          style={{
                            color: item.seen == true ? 'gray' : '#71c55d',
                            fontSize: 10,
                            marginLeft: 10,
                          }}>
                          {item.duration}
                        </Text>
                      </View> //else if
                    ) : item.messagetype == 'image' ? (
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={require('../../../assets/icons/whtasappicon/done_all.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: item.seen == true ? 'gray' : '#ffbf0f',
                          }}
                        />
                        <Image
                          source={require('../../../assets/icons/whtasappicon/image.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: item.seen == true ? 'gray' : '#ffbf0f',
                          }}
                        />
                        <Text
                          style={{
                            color: item.seen == true ? 'gray' : '#ffbf0f',
                            fontSize: 10,
                            marginLeft: 10,
                          }}>
                          {item.size}
                        </Text>
                      </View> //else if
                    ) : item.messagetype == 'document' ? (
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={require('../../../assets/icons/whtasappicon/done_all.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: item.seen == true ? 'gray' : '#ffbf0f',
                          }}
                        />
                        <Image
                          source={require('../../../assets/icons/whtasappicon/file.png')}
                          style={{
                            height: 15,
                            width: 15,
                            tintColor: item.seen == true ? 'gray' : '#ffbf0f',
                          }}
                        />
                        <Text
                          style={{
                            color: item.seen == true ? 'gray' : '#ffbf0f',
                            fontSize: 10,
                            marginLeft: 10,
                          }}>
                          {item.size}
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      width: '100%',
                    }}>
                    <TouchableOpacity
                      style={{
                        height: 20,
                        width: 20,
                        elevation: 2,
                        borderRadius: 200,
                        backgroundColor: 'white',
                        marginRight: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../../assets/icons/whtasappicon/star.png')}
                        style={{ height: 15, width: 15, tintColor: 'gray' }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Divider
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 10,
                    backgroundColor: '#d7d7d7',
                  }}
                />
              </TouchableOpacity>
            );
          }}
          vertical={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}></FlatList>

        {/* END STORIES BODY*/}

        {/*OVERLAY*/}

        <Overlay
          containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="white"
          width={Dimensions.get('screen').width * 0.85}
          height={300}>
          <Image
            source={this.state.userimage}
            style={{
              height: 250,
              width: Dimensions.get('screen').width * 0.85,
              // position: 'absolute',
            }}
          />
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              height: 25,
              width: Dimensions.get('screen').width * 0.85,
              textAlign: 'center',
              alignSelf: 'center',
              marginBottom: 10,
              fontSize: 16,
              backgroundColor: '#ffbf0f',
              position: 'absolute',
              bottom: 50,
              top: 0,
            }}>
            {this.state.username}
          </Text>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: Dimensions.get('screen').width * 0.85,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isVisible: false,
                });
                this.gotoVoiceCall(this.state.username, this.state.userimage);
              }}
              style={styles.btnCallOverlay}>
              <Image
                source={require('../../../assets/icons/whtasappicon/phonecall.png')}
                style={styles.buttonIconOverlay}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isVisible: false,
                });
                this.gotoVideoCall(this.state.username, this.state.userimage);
              }}
              style={styles.btnCallOverlay}>
              <Image
                source={require('../../../assets/icons/whtasappicon/video.png')}
                style={styles.buttonIconOverlay}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isVisible: false,
                });
                this.gotoMessageScreen(
                  this.state.username,
                  this.state.userimage,
                  this.state.onlinestatus,
                );
              }}
              style={styles.btnCallOverlay}>
              <Image
                source={require('../../../assets/icons/whtasappicon/chat.png')}
                style={styles.buttonIconOverlay}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isVisible: false,
                });
                this.gotoFriendsProfileScreen(
                  this.state.username,
                  this.state.userimage,
                );
              }}
              style={styles.btnCallOverlay}>
              <Image
                source={require('../../../assets/icons/whtasappicon/profile.png')}
                style={styles.buttonIconOverlay}
              />
            </TouchableOpacity>
          </View>
        </Overlay>

        {/*END OVERLAY*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
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

  iconForward: {
    tintColor: 'white',
    height: 30,
    width: 30,
  },
  btnChats: {
    backgroundColor: '#71c55d',
    borderRadius: 200,
    height: 50,
    alignSelf: 'flex-end',
    marginRight: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 140,
    right: 40,
  },

  btnCall: {
    backgroundColor: '#71c55d',
    borderRadius: 200,
    height: 50,
    alignSelf: 'flex-end',
    marginRight: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 140,
    right: -12,
  },
  colored: {
    tintColor: '#71c55d',
  },
  uncolored: {
    tintColor: '#d3d3d3',
  },
  textActive: {
    color: '#263238',
    marginTop: 5,
  },
  textInActive: {
    color: '#c6c6c6',
    marginTop: 5,
  },
  hidden: {
    display: 'none',
    flexDirection: 'column',
    marginBottom: 45,
  },
  shown: {
    display: 'flex',
    flexDirection: 'column',
  },
  btnCallOverlay: {
    backgroundColor: 'white',
    borderRadius: 200,
    height: 40,
    marginRight: 10,
    borderColor: '#ffbf0f',
    borderWidth: 1,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIconOverlay: {
    tintColor: '#ffbf0f',
    height: 25,
    width: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 30,
  },
  imageHeader: {
    height: 24,
    tintColor: '#71c55d',
    width: 24,
  },
});

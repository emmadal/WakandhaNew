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
import * as Animatable from 'react-native-animatable';
import { Avatar, Icon, Divider, Overlay } from 'react-native-elements';
import storydatalist from '../../data/storydatalist';
import chatlistdata from '../../data/chatlistdata';
import callslistdata from '../../data/callslistdata';
import contactslistdata from '../../data/contactslistdata';
import pageslistdata from '../../data/pageslistdata';
/**
This is the Chats Screen of the app; it handles the display of Calls, Chats, and Contacts
Each section is well separated with comments for easy understanding
**/
export default class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 3,
      checked: true,
      screen: 'Kongossa',
      isVisible: false,
      username: '',
      userimage: null,
      onlinestatus: 'offline',
      showOptions: false,
    };
  }

  changePosition(value, screenname) {
    this.setState({
      position: value,
      screen: screenname,
    });
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

  gotoStoryViewer = (userimage, storyimage, storycount) => {
    this.props.navigation.navigate('StoriesViewer', {
      userimage: userimage,
      storyimage: storyimage,
      storycount: storycount,
    });
  };

  gotoSelectContact = () => {
    this.props.navigation.navigate('SelectCallContactScreen');
  };

  gotoSelectChatWithContact = () => {
    this.props.navigation.navigate('SelectChatContactScreen');
  };

  gotoUserPageScreen = () => {
    this.props.navigation.navigate('UserPageScreen');
  };

  chatAlertDialog(username, userimage, onlinestatus) {
    this.setState({
      isVisible: true,
      username: username,
      userimage: userimage,
      onlinestatus: onlinestatus,
    });
  }
  placeCall(username, userimage) {
    // Works on both Android and iOS
    Alert.alert(
      'Call ' + username + '?',
      '',
      [
        {
          text: 'Voice Call',
          onPress: () => this.gotoVoiceCall(username, userimage),
        },
        {
          text: 'Video Call',
          onPress: () => this.gotoVideoCall(username, userimage),
        },
      ],
      { cancelable: true },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View
          style={[
            styles.header,
            {
              marginLeft: this.state.position == 3 ? 32 : -20,
              marginRight: this.state.position == 3 ? 32 : -20,
            },
          ]}>
          <TouchableOpacity
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginLeft: 10,
            }}
            onPress={this.props.navigation.openDrawer}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/menu.png')}
                style={styles.imageHeader}
              />
              <Animatable.View
                animation="bounce"
                delay={0}
                duration={1000}
                iterationCount="infinite"
                iterationDelay={2000}
                useNativeDriver>
                <View
                  style={{
                    width: 24,
                    height: 20,
                    backgroundColor: '#ffbf00',
                    borderRadius: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: 'white', fontSize: 10 }}>29+</Text>
                </View>
              </Animatable.View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.setState({ showOptions: !this.state.showOptions })
            }
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginRight: 10,
              backgroundColor: '#ffbf00',
              borderRadius: 200,
            }}>
            <Image
              source={require('../../../assets/icons/whtasappicon/more_horizontal.png')}
              style={[styles.imageHeader, { tintColor: 'white' }]}
            />
          </TouchableOpacity>
        </View>
        {/* END HEADER */}

        {/* VIEWPAGER INDICATOR */}
        <Text
          style={{
            color: 'black',
            width: 150,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            marginTop: -25,
          }}>
          {this.state.screen}
        </Text>
        {/* END VIEWPAGER INDICATOR */}

        {/*VIEWPAGER CONTAINER */}
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            // justifyContent: 'space-around',
            justifyContent: 'space-evenly',
            marginTop: 20,
            marginBottom: 40,
            marginLeft:
              this.state.position == 1 || this.state.position == 5 ? -50 : 0,
            marginRight:
              this.state.position == 1 || this.state.position == 5 ? -50 : 0,
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.changePosition(1, 'Calls')}
              style={{ alignItems: 'center', height: 50, width: 50 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/phone-call.png')}
                style={[
                  { height: 20, width: 20 },
                  this.state.position == 1 ? styles.colored : styles.uncolored,
                ]}
              />
              {this.state.position == 1 ? (
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 200,
                    backgroundColor: '#ffbf00',
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}>
            <TouchableOpacity
              onPress={() => this.changePosition(2, 'Group')}
              style={{ alignItems: 'center', height: 50, width: 50 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/groupChat.png')}
                style={[
                  { height: 20, width: 20 },
                  this.state.position == 2 ? styles.colored : styles.uncolored,
                ]}
              />
              {this.state.position == 2 ? (
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 200,
                    backgroundColor: '#ffbf00',
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => this.changePosition(3, 'Kongossa')}
              style={{ alignItems: 'center', height: 50, width: 50 }}>
              <Image
                source={require('../../../assets/images/whatsAppLogo.png')}
                style={[
                  { height: 20, width: 20 },
                  this.state.position == 3 ? '' : styles.uncolored,
                ]}
              />
              {this.state.position == 3 ? (
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 200,
                    backgroundColor: '#ffbf00',
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => this.changePosition(4, 'Pages')}
              style={{ alignItems: 'center', height: 50, width: 50 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/Pages.png')}
                style={[
                  { height: 20, width: 20 },
                  this.state.position == 4 ? styles.colored : styles.uncolored,
                ]}
              />
              {this.state.position == 4 ? (
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 200,
                    backgroundColor: '#ffbf00',
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => this.changePosition(5, 'Contacts')}
              style={{ alignItems: 'center', height: 50, width: 50 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/contact-tab.png')}
                style={[
                  { height: 20, width: 20 },
                  this.state.position == 5 ? styles.colored : styles.uncolored,
                ]}
              />
              {this.state.position == 5 ? (
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 200,
                    backgroundColor: '#ffbf00',
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        <Divider style={{ height: 1, backgroundColor: '#d7d7d7' }} />
        {/* END OF VIEWPAGER CONTAINER */}

        {/* VIEWPAGER CONTENT */}

        {/* CALLS CONTENT */}
        <View style={this.state.position == 1 ? styles.shown : styles.hidden}>
          <FlatList
            style={{
              width: Dimensions.get('screen').width * 0.9,
              flex: 1,
              marginBottom: 58,
            }}
            data={callslistdata}
            renderItem={({ item, index }) => {
              return (
                // implemented with Text and Button as children
                <TouchableOpacity
                  onPress={() => this.placeCall(item.name, item.image)}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginTop: 20,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <View style={{ marginRight: 5 }}>
                      <Avatar
                        rounded
                        source={item.image}
                        size="large"
                        style={{
                          height: 60,
                          width: 60,
                          borderRadius: 200,
                          borderWidth: 2,
                          borderColor: '#ffbf00',
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        marginLeft: 20,
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
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: '#d3d3d3',
                        }}>
                        {item.timecalled}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: -20,
                        justifyContent: 'flex-end',
                      }}>
                      {item.type == 'incomming' ? (
                        <TouchableOpacity
                          style={{
                            height: 20,
                            width: 20,
                            elevation: 2,
                            borderRadius: 200,
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor:
                              item.missed == true ? 'red' : '#ffbf00',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../../../assets/icons/whtasappicon/arrow_downward.png')}
                            style={{
                              height: 15,
                              width: 15,
                              tintColor:
                                item.missed == true ? 'red' : '#ffbf00',
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{
                            height: 20,
                            width: 20,
                            elevation: 2,
                            borderRadius: 200,
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor:
                              item.missed == true ? 'red' : '#ffbf00',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../../../assets/icons/whtasappicon/arrow_upward.png')}
                            style={{
                              height: 15,
                              width: 15,
                              tintColor:
                                item.missed == true ? 'red' : '#ffbf00',
                            }}
                          />
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        style={{
                          height: 20,
                          width: 20,
                          marginLeft: 5,
                          elevation: 2,
                          borderRadius: 200,
                          backgroundColor:
                            item.missed == true ? 'red' : '#ffbf00',
                          borderWidth: 1,
                          borderColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            alignSelf: 'center',
                            fontSize: 10,
                          }}>
                          {item.callcount}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Divider
                    style={{ marginTop: 10, backgroundColor: '#ffbf00' }}
                  />
                </TouchableOpacity>
              );
            }}
            vertical={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id}></FlatList>

          <TouchableOpacity
            onPress={() => this.gotoSelectContact()}
            style={styles.btnCall}>
            <Image
              source={require('../../../assets/icons/whtasappicon/phonecall.png')}
              style={styles.iconForward}
            />
          </TouchableOpacity>
        </View>
        {/* END CALLS CONTENT */}

        {/* START GROUP CONTENT */}
        <View style={this.state.position == 2 ? styles.shown : styles.hidden}>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{ color: '#ffbf00', fontWeight: 'bold', marginTop: 10 }}>
              Create New Group
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: 5,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: '#ffbf00',
                  borderRadius: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/people.png')}
                  style={{ height: 30, width: 30, tintColor: 'white' }}
                />
              </TouchableOpacity>
              <Text
                style={{ color: 'black', fontWeight: 'bold', marginLeft: 20 }}>
                New Group
              </Text>
            </View>
          </View>

          <View
            style={{
              width: Dimensions.get('screen').width * 0.9,
              flex: 1,
              marginBottom: 58,
            }}></View>
          {/* 
          <TouchableOpacity style={styles.btnCall}>
            <Image
              source={require('../../../assets/icons/whtasappicon/add_person.png')}
              style={styles.iconForward}
            />
          </TouchableOpacity> */}
        </View>
        {/* END Group CONTENT */}

        {/* CHATS CONTENT */}
        <View style={this.state.position == 3 ? styles.shown : styles.hidden}>
          <View style={{ margin: 30, flexDirection: 'row' }}>
            <Text
              style={{ alignSelf: 'center', marginLeft: 20, color: '#d3d3d3' }}>
              Wak's
            </Text>

            <Divider
              style={{
                width: 1,
                height: '100%',
                backgroundColor: '#d7d7d7',
                marginLeft: 10,
              }}
            />

            <FlatList
              style={{ marginLeft: 2, paddingRight: 20, marginRight: 5 }}
              data={storydatalist}
              renderItem={({ item, index }) => {
                return (
                  // implemented with Text and Button as children
                  <TouchableOpacity
                    onPress={() =>
                      this.gotoStoryViewer(
                        item.image,
                        item.storyimage,
                        item.storycount,
                      )
                    }>
                    <View style={{ marginRight: 5 }}>
                      <Avatar
                        rounded
                        source={item.image}
                        size="large"
                        style={{
                          height: 60,
                          width: 60,
                          borderRadius: 200,
                          borderWidth: 2,
                          borderColor: '#ffbf00',
                        }}
                      />

                      <TouchableOpacity
                        style={{
                          height: 20,
                          width: 20,
                          borderRadius: 200,
                          backgroundColor: '#ffbf00',
                          justifyContent: 'center',
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            alignSelf: 'center',
                            fontSize: 10,
                          }}>
                          {item.storycount}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}></FlatList>
          </View>

          <Divider
            style={{
              marginLeft: 45,
              marginRight: 45,
              marginTop: -20,
              backgroundColor: '#d7d7d7',
            }}
          />

          <FlatList
            style={{
              marginLeft: 2,
              paddingRight: 25,
              marginRight: 5,
              marginBottom: 58,
            }}
            data={chatlistdata}
            renderItem={({ item, index }) => {
              return (
                // implemented with Text and Button as children
                <TouchableOpacity
                  onPress={() =>
                    this.chatAlertDialog(
                      item.name,
                      item.image,
                      item.onlinestatus,
                    )
                  }>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginTop: 20,
                      alignItems: 'center',
                      marginLeft: 50,
                    }}>
                    {item.onlinestatus == 'online' ? (
                      <TouchableOpacity
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: 200,
                          backgroundColor: '#ffbf00',
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
                        borderColor: '#ffbf00',
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
                              tintColor: item.seen == true ? 'gray' : '#ffbf00',
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
                              tintColor: item.seen == true ? 'gray' : '#ffbf00',
                            }}
                          />
                          <Image
                            source={require('../../../assets/icons/whtasappicon/mic.png')}
                            style={{
                              height: 15,
                              width: 15,
                              tintColor: item.seen == true ? 'gray' : '#ffbf00',
                            }}
                          />
                          <Text
                            style={{
                              color: item.seen == true ? 'gray' : '#ffbf00',
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
                              tintColor: item.seen == true ? 'gray' : '#ffbf00',
                            }}
                          />
                          <Image
                            source={require('../../../assets/icons/whtasappicon/music.png')}
                            style={{
                              height: 15,
                              width: 15,
                              tintColor: item.seen == true ? 'gray' : '#ffbf00',
                            }}
                          />
                          <Text
                            style={{
                              color: item.seen == true ? 'gray' : '#ffbf00',
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
                              tintColor: item.seen == true ? 'gray' : '#ffbf00',
                            }}
                          />
                          <Image
                            source={require('../../../assets/icons/whtasappicon/video.png')}
                            style={{
                              height: 15,
                              width: 15,
                              tintColor: item.seen == true ? 'gray' : '#ffbf00',
                            }}
                          />
                          <Text
                            style={{
                              color: item.seen == true ? 'gray' : '#ffbf00',
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
                              tintColor: item.seen == true ? 'gray' : '#ffbf00',
                            }}
                          />
                          <Image
                            source={require('../../../assets/icons/whtasappicon/image.png')}
                            style={{
                              height: 15,
                              width: 15,
                              tintColor: item.seen == true ? 'gray' : '#ffbf00',
                            }}
                          />
                          <Text
                            style={{
                              color: item.seen == true ? 'gray' : '#ffbf00',
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
                              tintColor: item.seen == true ? 'gray' : '#ffbf00',
                            }}
                          />
                          <Image
                            source={require('../../../assets/icons/whtasappicon/file.png')}
                            style={{
                              height: 15,
                              width: 15,
                              tintColor: item.seen == true ? 'gray' : '#ffbf00',
                            }}
                          />
                          <Text
                            style={{
                              color: item.seen == true ? 'gray' : '#ffbf00',
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
                        marginTop: -40,
                        justifyContent: 'flex-end',
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: item.seen == true ? 'gray' : '#ffbf00',
                        }}>
                        {item.messagetime}
                      </Text>
                      {item.seen == true ? null : (
                        <TouchableOpacity
                          style={{
                            height: 15,
                            width: 15,
                            borderRadius: 200,
                            backgroundColor: '#ffbf00',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              alignSelf: 'center',
                              fontSize: 10,
                            }}>
                            {item.messagecount}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <Divider
                    style={{
                      marginLeft: 50,
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

          <TouchableOpacity
            onPress={() => this.gotoSelectChatWithContact()}
            style={styles.btnChats}>
            <Image
              source={require('../../../assets/icons/whtasappicon/message.png')}
              style={styles.iconForward}
            />
          </TouchableOpacity>
        </View>
        {/* END CHATS CONTENT */}

        {/* START PAGES CONTENT */}
        <View style={this.state.position == 4 ? styles.shown : styles.hidden}>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 10,
              justifyContent: 'center',
            }}></View>
          <FlatList
            style={{
              width: Dimensions.get('screen').width * 0.9,
              flex: 1,
              marginBottom: 58,
            }}
            data={pageslistdata}
            renderItem={({ item, index }) => {
              return (
                // implemented with Text and Button as children
                <TouchableOpacity
                  onPress={() =>
                    this.gotoUserPageScreen(item.image, item.page)
                  }>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginTop: 20,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <View style={{ marginRight: 5 }}>
                      <Avatar
                        rounded
                        source={item.image}
                        size="large"
                        style={{
                          height: 60,
                          width: 60,
                          borderRadius: 200,
                          borderWidth: 2,
                          borderColor: '#ffbf00',
                        }}
                      />
                    </View>
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
                        {item.page}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: -20,
                        justifyContent: 'flex-end',
                      }}></View>
                  </View>
                  <Divider
                    style={{ marginTop: 10, backgroundColor: '#d7d7d7' }}
                  />
                </TouchableOpacity>
              );
            }}
            vertical={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id}></FlatList>
        </View>
        {/* END PAGES CONTENT */}

        {/* CONTACTS CONTENT */}
        <View style={this.state.position == 5 ? styles.shown : styles.hidden}>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{ color: '#ffbf00', fontWeight: 'bold', marginTop: 10 }}>
              List of Contact
            </Text>
          </View>
          <FlatList
            style={{
              width: Dimensions.get('screen').width * 0.9,
              flex: 1,
              marginBottom: 58,
            }}
            data={contactslistdata}
            renderItem={({ item, index }) => {
              return (
                // implemented with Text and Button as children
                <TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginTop: 20,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <View style={{ marginRight: 5 }}>
                      <Avatar
                        rounded
                        source={item.image}
                        size="large"
                        style={{
                          height: 60,
                          width: 60,
                          borderRadius: 200,
                          borderWidth: 2,
                          borderColor: '#ffbf00',
                        }}
                      />
                    </View>
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
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: -20,
                        justifyContent: 'flex-end',
                      }}></View>
                  </View>
                  <Divider
                    style={{ marginTop: 10, backgroundColor: '#d7d7d7' }}
                  />
                </TouchableOpacity>
              );
            }}
            vertical={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id}></FlatList>

          <TouchableOpacity style={styles.btnCall}>
            <Image
              source={require('../../../assets/icons/whtasappicon/add_person.png')}
              style={styles.iconForward}
            />
          </TouchableOpacity>
        </View>
        {/* END CONTACTS CONTENT */}

        {/* END VIEWPAGER CONTENT */}

        {/*OVERLAY*/}
        <Overlay
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
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

        {/* OPTIONS DIALOG */}
        <View
          style={{
            display: this.state.showOptions == true ? 'flex' : 'none',
            flexDirection: 'column',
            height: this.state.showOptions == true ? 200 : 0,
            width: this.state.showOptions == true ? 200 : 0,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#d3d3d3',
            borderRadius: 5,
            position: 'absolute',
            justifyContent: 'space-around',
            top: 60,
            right: this.state.position == 3 ? 45 : -10,
          }}>
          <TouchableOpacity style={{ marginLeft: 20, marginTop: 10 }}>
            <Text>New Group</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: 20, marginTop: 10 }}>
            <Text>New BroadCast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('WhatsAppWebScreen')}
            style={{ marginLeft: 20, marginTop: 10 }}>
            <Text>Wakandha Web</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: 20, marginTop: 10 }}>
            <Text>Starred Messages</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Settings')}
            style={{ marginLeft: 20, marginTop: 10, marginBottom: 10 }}>
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>
        {/* END OPTIONS DIALOG*/}
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
    backgroundColor: '#ffbf00',
    borderRadius: 200,
    height: 50,
    alignSelf: 'flex-end',
    marginRight: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    right: 40,
  },

  btnCall: {
    backgroundColor: '#ffbf00',
    borderRadius: 200,
    height: 50,
    alignSelf: 'flex-end',
    marginRight: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    right: -12,
  },
  colored: {
    tintColor: '#ffbf00',
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
    marginBottom: 50,
  },
  btnCallOverlay: {
    backgroundColor: 'white',
    borderRadius: 200,
    height: 40,
    marginRight: 10,
    borderColor: '#ffbf00',
    borderWidth: 1,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIconOverlay: {
    tintColor: '#ffbf00',
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
    tintColor: '#ffbf00',
    width: 24,
  },
});

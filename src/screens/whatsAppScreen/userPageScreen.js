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
import { Avatar, Icon, Divider, Overlay } from 'react-native-elements';
import userpagelistdata from '../../data/userpagelistdata';

class UserPageScreen extends Component {
  state = {};
  // gotoPagesMessageScreen=()=>{
  //   this.props.navigation
  // }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {/* <View style={{ margin: 30, flexDirection: 'row' }}></View> */}
        {/* <Divider
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: -20,
            backgroundColor: '#d7d7d7',
          }}
        /> */}

        <FlatList
          data={userpagelistdata}
          renderItem={({ item, index }) => {
            return (
              // implemented with Text and Button as children
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('PagesMessageScreen')
                }>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 20,
                    alignItems: 'center',
                    marginLeft: 20,
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
                    marginLeft: 10,
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

        {/* END CHATS CONTENT */}
      </View>
    );
  }
}

export default UserPageScreen;

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
    borderColor: '#71c55d',
    borderWidth: 1,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIconOverlay: {
    tintColor: '#71c55d',
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

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
  ScrollView,
  FlatList,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar, Icon, Divider, Overlay } from 'react-native-elements';
import contactslistdata from '../../data/contactslistdata';

/**
This is where a user selects the contact he/she wants to call
**/

export default class SelectCallContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      username: '',
      userimage: null,
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

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'#ffbf00'}
          barStyle="light-content"
          animated={true}
        />

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
          <Text style={{ alignSelf: 'center', fontSize: 16, color: 'black' }}>
            Select Contact
          </Text>

          <TouchableOpacity style={{ marginLeft: 20 }}>
            <Image
              source={require('../../../assets/icons/whtasappicon/search.png')}
              style={{ height: 20, width: 20, tintColor: '#ffbf00' }}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require('../../../assets/icons/whtasappicon/add_person.png')}
              style={{ height: 20, width: 20, tintColor: '#ffbf00' }}
            />
          </TouchableOpacity>

          <TouchableOpacity
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
            marginTop: 20,
            height: 1,
            backgroundColor: '#d7d7d7',
          }}
        />

        <FlatList
          style={{ width: Dimensions.get('screen').width * 0.9, flex: 1 }}
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
                    <TouchableOpacity
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 200,
                        backgroundColor:
                          item.online == true ? '#ffbf00' : '#d3d3d3',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 5,
                        right: 0,
                      }}></TouchableOpacity>
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
                    <Text style={{ fontSize: 10, color: 'gray' }}>
                      {item.profile}
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
                    <TouchableOpacity
                      onPress={() => this.gotoVoiceCall(item.name, item.image)}
                      style={{
                        height: 30,
                        width: 30,
                        elevation: 3,
                        borderRadius: 200,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../../assets/icons/whtasappicon/phone.png')}
                        style={{ height: 20, width: 20, tintColor: '#ffbf00' }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.gotoVideoCall(item.name, item.image)}
                      style={{
                        height: 30,
                        width: 30,
                        marginLeft: 5,
                        elevation: 2,
                        borderRadius: 200,
                        elevation: 2,
                        backgroundColor: '#ffbf00',
                        borderWidth: 1,
                        borderColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../../assets/icons/whtasappicon/video.png')}
                        style={{ height: 20, width: 20, tintColor: 'white' }}
                      />
                    </TouchableOpacity>
                  </View>
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
});

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
} from 'react-native';
import { NavigationActions } from 'react-navigation';

/**
This is the voice call screen where users can make voice calls with friends/contacts
**/

export default class VoiceCallScreen extends Component {
  render() {
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'Maria Guttenberg ');
    const userimage = navigation.getParam('userimage', null);
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'#ffbf00'}
          barStyle="light-content"
          animated={true}
        />
        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          vertical
          showsVerticalScrollIndicator={false}>
          <Image
            source={userimage}
            style={{
              height: 350,
              width: Dimensions.get('screen').width,
              resizeMode: 'cover',
            }}
          />
          <Text style={styles.text}>{username}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../../assets/icons/whtasappicon/chat.png')}
              style={{
                height: 22,
                width: 22,
                tintColor: '#d3d3d3',
                marginTop: 10,
              }}
            />
            <Text style={styles.info}>WhatsApp Calling...</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
              width: Dimensions.get('screen').width * 0.95,
            }}>
            <TouchableOpacity style={styles.btnCall}>
              <Image
                source={require('../../../assets/icons/whtasappicon/mic.png')}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnCall}>
              <Image
                source={require('../../../assets/icons/whtasappicon/volume.png')}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnCall}>
              <Image
                source={require('../../../assets/icons/whtasappicon/video.png')}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnCall}>
              <Image
                source={require('../../../assets/icons/whtasappicon/phonecall.png')}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnCancel}>
            <Image
              source={require('../../../assets/icons/whtasappicon/phoneoff.png')}
              style={styles.buttonIconCancel}
            />
          </TouchableOpacity>
        </ScrollView>
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
  text: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  btnCall: {
    backgroundColor: 'white',
    borderRadius: 200,
    height: 50,
    marginRight: 10,
    borderColor: '#ffbf00',
    borderWidth: 1,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    tintColor: '#ffbf00',
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
  btnCancel: {
    backgroundColor: 'red',
    borderRadius: 200,
    height: 50,
    marginRight: 10,
    marginTop: 40,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonIconCancel: {
    tintColor: 'white',
    height: 25,
    width: 25,
  },
});

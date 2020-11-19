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
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar, Icon, Divider } from 'react-native-elements';

/**
This is the video call screen where users can make video calls
**/

export default class VideoCallScreen extends Component {
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

        <View style={[styles.innerContainer, { ...StyleSheet.absoluteFill }]}>
          <Image
            source={userimage}
            style={[styles.fullImage, { ...StyleSheet.absoluteFill }]}
          />

          <View
            style={{
              width: 150,
              height: 200,
              position: 'absolute',
              left: 150,
              right: 0,
              bottom: 300,
            }}>
            <Image
              source={require('../../../assets/images/marie.jpg')}
              style={{
                height: 200,
                width: 150,
                borderWidth: 2,
                borderColor: 'white',
              }}
            />
            <TouchableOpacity
              style={[
                styles.btnCancel,
                { position: 'absolute', right: 0, left: 50, bottom: 5 },
              ]}>
              <Image
                source={require('../../../assets/icons/whtasappicon/phoneoff.png')}
                style={styles.buttonIconCancel}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/*BOTTOM CONTROLS*/}
        <View style={styles.singleView} />

        <View style={styles.bottomControlView}>
          <TouchableOpacity style={styles.btnCall}>
            <Image
              source={require('../../../assets/icons/whtasappicon/video.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCall}>
            <Image
              source={require('../../../assets/icons/whtasappicon/mic.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCall}>
            <Image
              source={require('../../../assets/icons/whtasappicon/mic.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCancel}>
            <Image
              source={require('../../../assets/icons/whtasappicon/phoneoff.png')}
              style={styles.buttonIconCancel}
            />
          </TouchableOpacity>

          <Divider
            style={{
              width: 1,
              height: '50%',
              backgroundColor: '#d7d7d7',
              marginLeft: 10,
            }}
          />

          <Text
            style={{ color: '#ffbf00', textAlign: 'center', marginLeft: 10 }}>
            00:09:54
          </Text>
        </View>
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
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
  },

  btnCall: {
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
    height: 40,
    marginRight: 10,
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
    backgroundColor: '#ffbf00',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 70,
  },
  bottomControlView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
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

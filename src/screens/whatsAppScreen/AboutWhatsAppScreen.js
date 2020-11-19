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

/**
This is the about screen of the app
**/
export default class AboutWhatsAppScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.innerContainer, { ...StyleSheet.absoluteFill }]}>
          <Image
            source={require('../../../assets/images/doll.jpg')}
            style={styles.fullImage}
          />
          <View
            style={[
              styles.overlay,
              {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              },
            ]}>
            <TouchableOpacity
              style={{
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-start',
                position: 'absolute',
                top: 40,
                left: 10,
              }}
              onPress={this.props.navigation.openDrawer}>
              <Image
                source={require('../../../assets/icons/whtasappicon/arrow_back_long.png')}
                style={{ height: 25, width: 25, tintColor: 'white' }}
              />
            </TouchableOpacity>

            <Text style={styles.text}>Wakandha Messenger</Text>
            <Text style={{ color: 'white' }}>Version 1.7.3</Text>

            <Image
              source={require('../../../assets/icons/whtasappicon/icon.png')}
              style={styles.image}
            />

            <Text style={{ color: 'white' }}> 2019-2020 Wakandha Inc.</Text>

            <TouchableOpacity style={{ marginTop: 40 }}>
              <Text
                style={{
                  color: '#ffbf0f',
                  fontWeight: 'bold',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}>
                LICENCES
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  fullImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.9,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Flex to fill, position absolute,
  // Fixed left/top, and the width set to the window width
  overlay: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 120,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

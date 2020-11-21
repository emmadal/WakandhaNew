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
  SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ChatScreen from '../../screens/whatsAppScreen/ChatScreen';
import StatusScreen from '../../screens/whatsAppScreen/StatusScreen';
import FavouriteScreen from '../../screens/whatsAppScreen/FavouriteScreen';
import WhatsAppWebScreen from '../../screens/whatsAppScreen/WhatsAppWebScreen';
import SettingsScreen from '../../screens/whatsAppScreen/SettingsScreen';
import AboutWhatsAppScreen from '../../screens/whatsAppScreen/AboutWhatsAppScreen';
import YourFeedbackScreen from '../../screens/whatsAppScreen/YourFeedbackScreen';
import ProfileScreen from '../../screens/whatsAppScreen/ProfileScreen';

//this is used to display the active navigation drawer item
export default class Screen extends Component {
  gotoProfileScreen = () => {
    this.props.navigation.navigate('ProfileScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={[
              styles.header,
              {
                display:
                  this.props.name == 'ProfileScreen'
                    ? 'none' // if
                    : this.props.name == 'Settings'
                    ? 'none' //else if
                    : this.props.name == 'YourFeedback'
                    ? 'none' //else if
                    : this.props.name == 'Chats'
                    ? 'none' //else if
                    : this.props.name == 'AboutWhatsApp'
                    ? 'none' //else if
                    : this.props.name == 'WhatsApp Web'
                    ? 'none' //else if
                    : this.props.name == 'Status'
                    ? 'none' //else if
                    : this.props.name == 'Favourite'
                    ? 'none'
                    : 'flex',
              },
            ]}>
            <TouchableOpacity
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginLeft: 20,
              }}
              onPress={this.props.navigation.openDrawer}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/menu.png')}
                  style={styles.image}
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
                      backgroundColor: '#71c55d',
                      borderRadius: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: 'white', fontSize: 10 }}>29+</Text>
                  </View>
                </Animatable.View>
              </View>
            </TouchableOpacity>

            {this.props.name == 'ProfileScreen' ? null : (
              <TouchableOpacity
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  marginRight: 20,
                  backgroundColor: '#71c55d',
                  borderRadius: 200,
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/more_horizontal.png')}
                  style={[styles.image, { tintColor: 'white' }]}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            {/* we pass the navigation as a prop to each screen for effective navigation to other screens*/}
            {this.props.name == 'Chats' ? (
              <ChatScreen navigation={this.props.navigation} /> //if
            ) : this.props.name == 'ProfileScreen' ? (
              <ProfileScreen navigation={this.props.navigation} /> // else if
            ) : this.props.name == 'Status' ? (
              <StatusScreen navigation={this.props.navigation} /> //else if
            ) : this.props.name == 'Favourite' ? (
              <FavouriteScreen navigation={this.props.navigation} /> //else if
            ) : this.props.name == 'WhatsApp Web' ? (
              <WhatsAppWebScreen navigation={this.props.navigation} /> //else if
            ) : this.props.name == 'Settings' ? (
              <SettingsScreen navigation={this.props.navigation} /> //else if
            ) : this.props.name == 'AboutWhatsApp' ? (
              <AboutWhatsAppScreen navigation={this.props.navigation} /> //else
            ) : (
              <YourFeedbackScreen navigation={this.props.navigation} />
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  image: {
    height: 24,
    tintColor: '#71c55d',
    width: 24,
  },
  text: {
    color: '#161924',
    fontSize: 20,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 30,
  },
});

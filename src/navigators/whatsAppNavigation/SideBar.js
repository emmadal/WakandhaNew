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
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import { DrawerItems, DrawerItem } from 'react-navigation-drawer';

/**
This is the component that determines the layout of the sidebar items/contents
**/

export default SideBar = (props) => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <StatusBar
      translucent={true}
      backgroundColor={'#ffbf00'}
      barStyle="light-content"
      animated={true}
    />

    <ImageBackground
      source={require('../../../assets/images/lady.jpg')}
      style={styles.imagebackground}>
      <Text style={styles.textName}>LAURA AMBER RAQUEL</Text>
    </ImageBackground>

    <View style={styles.container}>
      <DrawerItems {...props} />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagebackground: {
    width: undefined,
    padding: 16,
    paddingTop: 48,
    height: 280,
    resizeMode: 'cover',
  },
  textName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlignVertical: 'bottom',
  },
});

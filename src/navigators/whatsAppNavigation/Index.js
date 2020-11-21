import React, { Component } from 'react';
import Screen from './Screen';

/**
This Component exports all the <Screen/> components to be used by the DrawerNavigatorHandler.js file
**/

export const Chats = ({ navigation }) => (
  <Screen navigation={navigation} name="Chats" />
);
export const ProfileScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="ProfileScreen" />
);
export const Status = ({ navigation }) => (
  <Screen navigation={navigation} name="Status" />
);
export const Favourite = ({ navigation }) => (
  <Screen navigation={navigation} name="Favourite" />
);
export const WhatsAppWeb = ({ navigation }) => (
  <Screen navigation={navigation} name="WhatsApp Web" />
);
export const Settings = ({ navigation }) => (
  <Screen navigation={navigation} name="Settings" />
);
export const AboutWhatsApp = ({ navigation }) => (
  <Screen navigation={navigation} name="AboutWhatsApp" />
);
export const YourFeedback = ({ navigation }) => (
  <Screen navigation={navigation} name="YourFeedback" />
);

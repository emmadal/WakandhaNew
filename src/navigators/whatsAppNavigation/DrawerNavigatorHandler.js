import React, { Component } from 'react';
import { Dimensions, Image, View } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
  Chats,
  ProfileScreen,
  Status,
  Favourite,
  WhatsAppWeb,
  Settings,
  AboutWhatsApp,
  YourFeedback,
} from './Index';
import SideBar from './SideBar';

// This Component handles the Drawer navigation in the app

const DrawerNavigator = createDrawerNavigator(
  {
    Chats: {
      screen: Chats,
      navigationOptions: {
        title: 'Chats',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../assets/icons/whtasappicon/chat.png')}
            style={{ width: 24, height: 24, tintColor: tintColor }}
          />
        ),
      },
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../assets/icons/whtasappicon/profile.png')}
            style={{ width: 24, height: 24, tintColor: tintColor }}
          />
        ),
      },
    },
    Status: {
      screen: Status,
      navigationOptions: {
        title: 'Status',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../assets/icons/whtasappicon/status.png')}
            style={{ width: 24, height: 24, tintColor: tintColor }}
          />
        ),
      },
    },
    Favourite: {
      screen: Favourite,
      navigationOptions: {
        title: 'Favourite',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../assets/icons/whtasappicon/star.png')}
            style={{ width: 24, height: 24, tintColor: tintColor }}
          />
        ),
      },
    },
    WhatsAppWeb: {
      screen: WhatsAppWeb,
      navigationOptions: {
        title: 'Wakandha Web',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../assets/icons/whtasappicon/globe.png')}
            style={{ width: 24, height: 24, tintColor: tintColor }}
          />
        ),
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: 'Settings',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../assets/icons/whtasappicon/settings.png')}
            style={{ width: 24, height: 24, tintColor: tintColor }}
          />
        ),
      },
    },
    AboutWhatsApp: {
      screen: AboutWhatsApp,
      navigationOptions: {
        title: 'About Wakandha',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../assets/icons/whtasappicon/link.png')}
            style={{ width: 24, height: 24, tintColor: tintColor }}
          />
        ),
      },
    },
    YourFeedback: {
      screen: YourFeedback,
      navigationOptions: {
        title: 'Your Feedback',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../../../assets/icons/whtasappicon/feedback.png')}
            style={{ width: 24, height: 24, tintColor: tintColor }}
          />
        ),
      },
    },
  },
  {
    contentComponent: (props) => <SideBar {...props} />,
    drawerWidth: Dimensions.get('window').width * 0.95,
    hideStatusBar: true,
    drawerType: 'slide',

    contentOptions: {
      activeBackgroundColor: '#ffbf00',
      activeTintColor: '#d3d3d3',
      inactiveTintColor: '#d3d3d3',
      itemsContainerStyle: {
        marginTop: 16,
        marginHorizontal: 8,
      },
      itemStyle: {
        borderRadius: 4,
      },
    },
  },
);

export default createAppContainer(DrawerNavigator);

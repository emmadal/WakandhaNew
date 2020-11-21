import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import DrawerNavigatorHandler from './DrawerNavigatorHandler';
import ChatScreen from '../../screens/whatsAppScreen/ChatScreen';
import ProfileScreen from '../../screens/whatsAppScreen/ProfileScreen';
import StatusScreen from '../../screens/whatsAppScreen/StatusScreen';
import FavouriteScreen from '../../screens/whatsAppScreen/FavouriteScreen';
import WhatsAppWebScreen from '../../screens/whatsAppScreen/WhatsAppWebScreen';
import SettingsScreen from '../../screens/whatsAppScreen/SettingsScreen';
import AboutWhatsAppScreen from '../../screens/whatsAppScreen/AboutWhatsAppScreen';
import YourFeedbackScreen from '../../screens/whatsAppScreen/YourFeedbackScreen';
import VideoCallScreen from '../../screens/whatsAppScreen/VideoCallScreen';
import VoiceCallScreen from '../../screens/whatsAppScreen/VoiceCallScreen';
import FriendsProfileScreen from '../../screens/whatsAppScreen/FriendsProfileScreen';
import MessageScreen from '../../screens/whatsAppScreen/MessageScreen';
import SelectCallContactScreen from '../../screens/whatsAppScreen/SelectCallContactScreen';
import SelectChatContactScreen from '../../screens/whatsAppScreen/SelectChatContactScreen';
import CameraScreen from '../../screens/whatsAppScreen/CameraScreen';
import BarCodeScannerScreen from '../../screens/whatsAppScreen/BarCodeScannerScreen';
import StoriesViewer from '../../screens/whatsAppScreen/StoriesViewer';
import UserPageScreen from '../../screens/whatsAppScreen/userPageScreen';
import PagesMessageScreen from '../../screens/whatsAppScreen/pageMessageScreen';

const BottomTransition = (index, position, height) => {
  const sceneRange = [index - 1, index];
  const outputHeight = [height, 0];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputHeight,
  });

  return {
    transform: [{ translateY: transition }],
  };
};

const NavigationConfig = () => {
  return {
    screenInterpolator: (sceneProps) => {
      const position = sceneProps.position;
      const scene = sceneProps.scene;
      const index = scene.index;
      const height = sceneProps.layout.initHeight;

      // return FadeTransition(index,position);
      return BottomTransition(index, position, height);
    },
  };
};

const WhatsAppRootStack = createStackNavigator(
  {
    DrawerNavigatorHandler: {
      screen: DrawerNavigatorHandler,
      navigationOptions: {
        header: null,
      },
    },

    ChatScreen: {
      screen: ChatScreen,
      navigationOptions: {
        header: null,
      },
    },

    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
      },
    },

    StatusScreen: {
      screen: StatusScreen,
      navigationOptions: {
        header: null,
      },
    },

    FavouriteScreen: {
      screen: FavouriteScreen,
      navigationOptions: {
        header: null,
      },
    },

    WhatsAppWebScreen: {
      screen: WhatsAppWebScreen,
      navigationOptions: {
        header: null,
      },
    },

    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        header: null,
      },
    },

    AboutWhatsAppScreen: {
      screen: AboutWhatsAppScreen,
      navigationOptions: {
        header: null,
      },
    },

    YourFeedbackScreen: {
      screen: YourFeedbackScreen,
      navigationOptions: {
        header: null,
      },
    },

    VideoCallScreen: {
      screen: VideoCallScreen,
      navigationOptions: {
        header: null,
      },
    },

    VoiceCallScreen: {
      screen: VoiceCallScreen,
      navigationOptions: {
        header: null,
      },
    },

    FriendsProfileScreen: {
      screen: FriendsProfileScreen,
      navigationOptions: {
        header: null,
      },
    },

    MessageScreen: {
      screen: MessageScreen,
      navigationOptions: {
        header: null,
      },
    },

    SelectCallContactScreen: {
      screen: SelectCallContactScreen,
      navigationOptions: {
        header: null,
      },
    },

    SelectChatContactScreen: {
      screen: SelectChatContactScreen,
      navigationOptions: {
        header: null,
      },
    },

    CameraScreen: {
      screen: CameraScreen,
      navigationOptions: {
        header: null,
      },
    },

    BarCodeScannerScreen: {
      screen: BarCodeScannerScreen,
      navigationOptions: {
        header: null,
      },
    },

    StoriesViewer: {
      screen: StoriesViewer,
      navigationOptions: {
        header: null,
      },
    },
    UserPageScreen: {
      screen: UserPageScreen,
      // navigationOptions: {
      //   header: null,
      // },
    },
    PagesMessageScreen: {
      screen: PagesMessageScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    transitionConfig: NavigationConfig,
  },
);

export default createAppContainer(WhatsAppRootStack);

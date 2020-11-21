import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { IMChatScreen } from '../Core/chat';
import { ChatScreen } from '../screens';

const ChatTabNavigator = createMaterialTopTabNavigator(
  {
    Chats: {
      screen: ChatScreen,
    },
    Walks: {
      screen: ChatScreen,
    },
  },
  {},
);

export default ChatTabNavigator;

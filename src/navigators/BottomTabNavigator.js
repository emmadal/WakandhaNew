import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  InnerFeedNavigator,
  InnerMarketplaceNavigator,
  InnerFriendsNavigator,
  InnerDiscoverNavigator,
  InnerProfileNavigator,
  InnerMenuNavigator,
} from './InnerStackNavigators';
import { tabBarBuilder } from '../Core/ui';
import SocialNetworkConfig from '../SocialNetworkConfig';
import AppStyles from '../AppStyles';

const BottomTabNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: InnerFeedNavigator,
    },
    Discover: {
      screen: InnerDiscoverNavigator,
    },
    Marketplace: {
      screen: InnerMarketplaceNavigator,
    },
    Friends: {
      screen: InnerFriendsNavigator,
    },
    Profile: {
      screen: InnerProfileNavigator,
    },
    Menu: {
      screen: InnerMenuNavigator,
    },
  },
  {
    initialRouteName: 'Feed',
    tabBarComponent: tabBarBuilder(SocialNetworkConfig.tabIcons, AppStyles),
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
        header: null,
      };
    },
  },
);

export default BottomTabNavigator;

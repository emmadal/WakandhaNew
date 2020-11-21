import { createSwitchNavigator } from 'react-navigation';
import AppStyles from '../AppStyles';
import { LoadScreen, WalkthroughScreen } from '../Core/onboarding';
import LoginStack from './AuthStackNavigator';
import SocialNetworkConfig from '../SocialNetworkConfig';
import BottomTabNavigator from './BottomTabNavigator';

export const RootNavigator = createSwitchNavigator(
  {
    LoadScreen: LoadScreen,
    Walkthrough: WalkthroughScreen,
    LoginStack: LoginStack,
    MainStack: BottomTabNavigator,
  },
  {
    initialRouteName: 'LoadScreen',
    initialRouteParams: {
      appStyles: AppStyles,
      appConfig: SocialNetworkConfig,
    },
  },
);

export default RootNavigator;

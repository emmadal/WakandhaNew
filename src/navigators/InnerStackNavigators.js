import { createStackNavigator } from 'react-navigation-stack';
import {
  FeedScreen,
  DetailPostScreen,
  CreatePostScreen,
  DiscoverScreen,
  ProfileScreen,
  ChatScreen,
  WatchScreen,
  MarketplaceScreen,
  DetailMarketplaceScreen,
  NewOfferScreen,
  PaymentScreen,
  BecomeSellerScreen,
  MenuScreen,
  UserPagesScreen,
  NewPageCategoryScreen,
  NewPageNameScreen,
  NewGroupScreen,
  GuissScreen,
  AddGroup,
  GroupDetail,
  HealthScreen,
  HomeScreen,
  PlayerScreen,
  WhatsAppRootStack,
} from '../screens';
import MyWebview from '../screens/menuScreen/WebView';
import PageClick from '../screens/menuScreen/PagesClick';
import { IMChatScreen, IMCreateGroupScreen } from '../Core/chat';
import {
  IMFriendsScreen,
  IMAllFriendsScreen,
} from '../Core/socialgraph/friendships';
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
  IMProfileSettingsScreen,
} from '../Core/profile';
import { IMNotificationScreen } from '../Core/notifications';
import AppStyles from '../AppStyles';
import SocialNetworkConfig from '../SocialNetworkConfig';
import { IMLocalized } from '../Core/localization/IMLocalization';
import { Platform } from 'react-native';
import CartScreen from '../screens/CartScreen/CartScreen';
import App from '../screens/InnerAppMarketScreen/App';
import GroupClick from '../screens/menuScreen/GroupClick';

const InnerFeedNavigator = createStackNavigator(
  {
    Feed: { screen: FeedScreen },
    FeedDetailPost: { screen: DetailPostScreen },
    CreatePost: {
      screen: CreatePostScreen,
    },
    FeedProfile: { screen: ProfileScreen },
    FeedNotification: { screen: IMNotificationScreen },
    FeedProfileSettings: { screen: IMProfileSettingsScreen },
    FeedEditProfile: { screen: IMEditProfileScreen },
    FeedAppSettings: { screen: IMUserSettingsScreen },
    FeedContactUs: { screen: IMContactUsScreen },
    FeedAllFriends: { screen: IMAllFriendsScreen },
    FeedDiscover: { screen: DiscoverScreen },
    CartScreen: { screen: CartScreen },
    PaymentScreen: { screen: PaymentScreen },
    PersonalChat: { screen: IMChatScreen },
    ChatMain: { screen: ChatScreen },

    CreateGroup: { screen: IMCreateGroupScreen },
  },
  {
    initialRouteName: 'Feed',
    headerMode: 'float',
    headerLayoutPreset: 'center',
  },
);

const InnerMarketplaceNavigator = createStackNavigator(
  {
    Marketplace: { screen: App },
    // DetailMarketplace: { screen: DetailMarketplaceScreen },
    // Payment: { screen: PaymentScreen },
    // BecomeSeller: { screen: BecomeSellerScreen },
    // NewOffer: { screen: NewOfferScreen },
  },
  {
    initialRouteName: 'Marketplace',
    headerMode: 'none',
    headerLayoutPreset: 'center',
  },
);

const InnerFriendsNavigator = createStackNavigator(
  {
    Friends: { screen: IMFriendsScreen },
    FriendsProfile: { screen: ProfileScreen },
    FriendsAllFriends: { screen: IMAllFriendsScreen },
  },
  {
    initialRouteName: 'Friends',
    initialRouteParams: {
      appStyles: AppStyles,
      appConfig: SocialNetworkConfig,
      followEnabled: false,
      friendsScreenTitle: IMLocalized('Friends'),
      showDrawerMenuButton: Platform.OS === 'android',
    },
    headerMode: 'float',
    headerLayoutPreset: 'center',
  },
);
const InnerDiscoverNavigator = createStackNavigator(
  {
    DiscoverMain: { screen: DiscoverScreen },
    DiscoverVideo: { screen: WatchScreen },
    DiscoverDetailPost: { screen: DetailPostScreen },
    DiscoverProfile: { screen: ProfileScreen },
    DiscoverNotification: { screen: IMNotificationScreen },
    DiscoverProfileSettings: { screen: IMProfileSettingsScreen },
    DiscoverEditProfile: { screen: IMEditProfileScreen },
    DiscoverAppSettings: { screen: IMUserSettingsScreen },
    DiscoverContactUs: { screen: IMContactUsScreen },
    DiscoverAllFriends: { screen: IMAllFriendsScreen },
  },
  {
    initialRouteName: 'DiscoverVideo',
    headerMode: 'float',
    headerLayoutPreset: 'center',
  },
);

const InnerProfileNavigator = createStackNavigator(
  {
    Profile: { screen: ProfileScreen },
    ProfileNotification: { screen: IMNotificationScreen },
    ProfileProfileSettings: { screen: IMProfileSettingsScreen },
    ProfileEditProfile: { screen: IMEditProfileScreen },
    ProfileAppSettings: { screen: IMUserSettingsScreen },
    ProfileContactUs: { screen: IMContactUsScreen },
    ProfileAllFriends: { screen: IMAllFriendsScreen },
    ProfilePostDetails: { screen: DetailPostScreen },
    ProfileDetailPostProfile: { screen: ProfileScreen },
  },
  {
    initialRouteName: 'ProfileNotification',
    headerMode: 'float',
    headerLayoutPreset: 'center',
  },
);

const InnerMenuNavigator = createStackNavigator(
  {
    Menu: { screen: MenuScreen },
    UserPages: { screen: UserPagesScreen },
    Page: { screen: PageClick },
    GroupC: { screen: GroupClick },
    NewPageCategory: { screen: NewPageCategoryScreen },
    NewPageName: { screen: NewPageNameScreen },
    NewGroupScreen: { screen: NewGroupScreen },
    GuissScreen: { screen: GuissScreen },
    AddGroup: { screen: AddGroup },
    PageDetail: { screen: ProfileScreen },
    PageCreatePost: { screen: CreatePostScreen },
    GroupDetail: {
      screen: GroupDetail,
    },
    HealthScreen: { screen: HealthScreen },
    HomeScreen: { screen: HomeScreen, navigationOptions: { header: null } },
    PlayerScreen: { screen: PlayerScreen, navigationOptions: { header: null } },
    WhatsAppRootStack: {
      screen: WhatsAppRootStack,
      navigationOptions: { header: null },
    },
    MyWebview: { screen: MyWebview, navigationOptions: { header: null } },
  },
  {
    initialRouteName: 'Menu',
    headerMode: 'none',
    headerLayoutPreset: 'center',
  },
);

export {
  InnerFeedNavigator,
  InnerMarketplaceNavigator,
  InnerFriendsNavigator,
  InnerDiscoverNavigator,
  InnerProfileNavigator,
  InnerMenuNavigator,
};

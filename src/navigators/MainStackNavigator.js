import { createStackNavigator } from 'react-navigation-stack';
import BottomTabNavigator from './BottomTabNavigator';
import { IMChatScreen } from '../Core/chat';
import DefaultDrawer from './DefaultDrawer';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import BagScreen from '../screens/BagScreen/BagScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import OrdersScreen from '../screens/OrdersScreen/OrdersScreen';
import WishListScreen from '../screens/WishListScreen/WishListScreen';
import ShopsScreen from '../screens/Shop/ShopsScreen';
import CartScreen from '../screens/CartScreen/CartScreen';
import PaymentScreen from '../screens/marketplaceScreen//PaymentScreen';

const WishListStack = createStackNavigator(
  {
    WishListScreen: WishListScreen,
    CartScreen: CartScreen,
    PaymentScreen: PaymentScreen,
  },
  {
    initialRouteName: 'WishListScreen',
    headerMode: 'none',
  },
);
const SearchStack = createStackNavigator(
  {
    SearchScreen: SearchScreen,
    CartScreen: CartScreen,
    PaymentScreen: PaymentScreen,
  },
  {
    initialRouteName: 'SearchScreen',
    headerMode: 'none',
  },
);
const BagStack = createStackNavigator(
  {
    BagScreen: BagScreen,
    CartScreen: CartScreen,
    PaymentScreen: PaymentScreen,
  },
  {
    initialRouteName: 'BagScreen',
    headerMode: 'none',
  },
);
const ShopsStack = createStackNavigator(
  {
    ShopsScreen: ShopsScreen,
    CartScreen: CartScreen,
    PaymentScreen: PaymentScreen,
  },
  {
    initialRouteName: 'ShopsScreen',
    headerMode: 'none',
  },
);
const OrdersStack = createStackNavigator(
  {
    OrdersScreen: OrdersScreen,
    CartScreen: CartScreen,
    PaymentScreen: PaymentScreen,
  },
  {
    initialRouteName: 'OrdersScreen',
    headerMode: 'none',
  },
);

const MainStackNavigator = createDrawerNavigator(
  {
    Home: BottomTabNavigator,
    Search: SearchStack,
    Bag: BagStack,
    Shops: ShopsStack,
    Orders: OrdersStack,
    WishList: WishListStack,
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Home',
    drawerWidth: Dimensions.get('window').width * 0.7,
    contentOptions: {
      activeTintColor: '#DDB937',
      inactiveTintColor: 'white',
    },
    contentComponent: DefaultDrawer,
    drawerBackgroundColor: '#1D1D27',
  },
);

export default MainStackNavigator;

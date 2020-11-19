import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeDrawer from './home-drawer';
import Me from '../screens/profile/me';
import Cart from '../screens/cart/cart';
import Category from '../screens/shop/category';
import Wishlist from '../screens/wishlist';
import Tabbar from '../containers/Tabbar';

import { homeTabs } from '../config/navigator';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <Tabbar {...props} />}>
      <Tab.Screen name={homeTabs.home_drawer} component={HomeDrawer} />
      <Tab.Screen name={homeTabs.shop} component={Category} />
      <Tab.Screen name={homeTabs.wish_list} component={Wishlist} />
      <Tab.Screen name={homeTabs.cart} component={Cart} />
      <Tab.Screen name={homeTabs.me} component={Me} />
    </Tab.Navigator>
  );
}

import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

import { TNTouchableIcon } from '../Core/truly-native';
import AppStyles from '../AppStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const navIconSize = 25;
const mainGold = '#DDB937';
const mainBlack = '#09090F';

const styles = new StyleSheet.create({
  doubleNavIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  navIcon: {
    width: navIconSize,
    height: navIconSize,
    margin: 6,
  },
  navIconMenuOptions: {
    flexDirection: 'row',
    width: null,
  },
});

export default function ChatHeader({ navigation, params }) {
  return {
    headerLeft: (
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          borderRadius: 150,
          marginRight: 15,
          backgroundColor: 'rgba(255,255,255,0.05)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Icon name="close" color={mainGold} size={20} />
      </TouchableOpacity>
    ),
    headerRight: (
      <View style={styles.doubleNavIcon}>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            borderRadius: 150,
            marginRight: 15,
            backgroundColor: 'rgba(255,255,255,0.05)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {}}>
          <Icon name="ellipsis-h" color={mainGold} size={23} />
        </TouchableOpacity>
      </View>
    ),
    headerTitle: (
      <Image
        style={{ width: responsiveWidth(60), height: 60, alignSelf: 'center' }}
        source={require('../../assets/images/logo_kongossa.png')}
        resizeMode={'contain'}
      />
    ),
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    headerStyle: {
      paddingVertical: 15,
      backgroundColor: mainBlack,
      borderBottomWidth: 1,
    },
    headerTintColor: '#DDB937',
  };
}

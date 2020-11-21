import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

import { TNTouchableIcon } from '../Core/truly-native';
import AppStyles from '../AppStyles';

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

export default function MainHeader({ navigation, params }) {
  return {
    headerLeft: (
      <TNTouchableIcon
        containerStyle={{
          padding: 0,
          height: 35,
          width: 35,
          borderRadius: 150,
          borderColor: mainGold,
          borderWidth: 1,
          overflow: 'hidden',
          marginLeft: 15,
          backgroundColor: 'rgba(255,255,255,0.05)',
        }}
        imageStyle={{ margin: 0, height: '100%', width: '100%' }}
        iconSource={{ uri: params?.currentUser?.profilePictureURL }}
        onPress={() =>
          navigation.navigate('FeedProfile', {
            stackKeyTitle: 'FeedProfile',
            lastScreenTitle: 'Feed',
          })
        }
        appStyles={AppStyles}
      />
    ),
    headerRight: (
      <View style={styles.doubleNavIcon}>
        <TNTouchableIcon
          containerStyle={{
            height: 40,
            width: 40,
            marginRight: 10,
            borderRadius: 150,
            backgroundColor: 'rgba(255,255,255,0.05)',
          }}
          imageStyle={{
            tintColor: '#DDB937',
            width: '90%',
            height: '90%',
            margin: 0,
          }}
          iconSource={AppStyles.iconSet.search}
          onPress={() =>
            navigation.navigate('FeedDiscover', {
              stackKeyTitle: 'FeedDiscover',
              lastScreenTitle: 'Feed',
            })
          }
          appStyles={AppStyles}
        />
        <TNTouchableIcon
          containerStyle={{
            height: 40,
            width: 40,
            borderRadius: 150,
            marginRight: 15,
            backgroundColor: 'rgba(255,255,255,0.05)',
          }}
          imageStyle={{
            width: '90%',
            height: '90%',
            margin: 0,
          }}
          iconSource={AppStyles.iconSet.appIcon}
          onPress={() => {
            navigation.navigate('ChatMain');
          }}
          appStyles={AppStyles}
        />
      </View>
    ),
    headerTitle: (
      <Image
        style={{ width: responsiveWidth(30), height: 30, alignSelf: 'center' }}
        source={require('../../assets/images/app-logo.png')}
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
      borderBottomColor: '#343434',
    },
    headerTintColor: '#DDB937',
  };
}

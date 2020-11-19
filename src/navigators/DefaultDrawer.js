import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import DrawerButton from './DrawerButton';
import { connect, ReactReduxContext } from 'react-redux';
const selectColor = '#DDB937';
const unSelectColor = '#949bb1';
class DefaultDrawer extends Component {
  static contextType = ReactReduxContext;
  constructor() {
    super();
  }

  getHomeIcon = (index) => {
    return (
      <AntDesign
        name={'home'}
        color={index == 0 ? selectColor : unSelectColor}
        size={18}
      />
    );
  };

  getShopIcon = (index) => {
    return (
      <Entypo
        name={'shop'}
        color={index == 3 ? selectColor : unSelectColor}
        size={18}
      />
    );
  };

  getBagIcon = (index) => {
    return (
      <SimpleLineIcons
        name={'bag'}
        color={index == 2 ? selectColor : unSelectColor}
        size={18}
      />
    );
  };

  getSearchIcon = (index) => {
    return (
      <AntDesign
        name={'search1'}
        color={index == 1 ? selectColor : unSelectColor}
        size={18}
      />
    );
  };
  getOrdersIcon = (index) => {
    return (
      <Feather
        name={'truck'}
        color={index == 4 ? selectColor : unSelectColor}
        size={18}
      />
    );
  };
  getWishListIcon = (index) => {
    return (
      <AntDesign
        name={'hearto'}
        color={index == 5 ? selectColor : unSelectColor}
        size={18}
      />
    );
  };

  getProfilePictureUrl = (url) => {
    if (url == undefined || url == null || url == '') {
      return 'https://api.adorable.io/avatars/50/abott@adorable.png';
    } else {
      return url;
    }
  };

  render() {
    const { navigation, user } = this.props;
    const { index, routeName } = this.props.navigation.state;

    return (
      <ScrollView>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: this.getProfilePictureUrl(user.profilePictureURL),
                }}
                size={50}
              />
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'column',
                  alignSelf: 'center',
                }}>
                <Title style={styles.title}>{user.firstName}</Title>
              </View>
            </View>
          </View>
          <View style={styles.drawerSection}>
            <DrawerButton
              title={'Accueil'}
              icon={this.getHomeIcon(index)}
              textColor={index == 0 ? selectColor : unSelectColor}
              onPress={() => {
                if (index == 0) {
                  navigation.closeDrawer();
                } else {
                  navigation.navigate('Home');
                }
              }}
            />
            <DrawerButton
              title={'Chercher'}
              icon={this.getSearchIcon(index)}
              textColor={index == 1 ? selectColor : unSelectColor}
              onPress={() => {
                if (index == 1) {
                  navigation.closeDrawer();
                } else {
                  navigation.navigate('Search');
                }
              }}
            />
            <DrawerButton
              title={'Sac'}
              icon={this.getBagIcon(index)}
              textColor={index == 2 ? selectColor : unSelectColor}
              onPress={() => {
                if (index == 2) {
                  navigation.closeDrawer();
                } else {
                  navigation.navigate('Bag');
                }
              }}
            />
            <DrawerButton
              title={'Magasins'}
              icon={this.getShopIcon(index)}
              textColor={index == 3 ? selectColor : unSelectColor}
              onPress={() => {
                if (index == 3) {
                  navigation.closeDrawer();
                } else {
                  navigation.navigate('Shops');
                }
              }}
            />

            <DrawerButton
              title={'Commandes'}
              icon={this.getOrdersIcon(index)}
              textColor={index == 4 ? selectColor : unSelectColor}
              onPress={() => {
                if (index == 4) {
                  navigation.closeDrawer();
                } else {
                  navigation.navigate('Orders');
                }
              }}
            />
            <DrawerButton
              title={'Liste de souhaits'}
              icon={this.getWishListIcon(index)}
              textColor={index == 5 ? selectColor : unSelectColor}
              onPress={() => {
                if (index == 5) {
                  navigation.closeDrawer();
                } else {
                  navigation.navigate('WishList');
                }
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginTop: 12,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: 'white',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 20,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {})(DefaultDrawer);

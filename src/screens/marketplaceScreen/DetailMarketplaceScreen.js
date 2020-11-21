import React, { Component } from 'react';
import {
  Platform,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  BackHandler,
} from 'react-native';
import { connect, ReactReduxContext } from 'react-redux';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import FastImage from 'react-native-fast-image';

import { firebase } from '../../Core/firebase/config';

import ShopWidget from '../../components/screens/Marketplace/shopWidget';
import {
  setWishList,
  addWishListItem,
} from '../../Core/WishList/redux/actions';
import { addCartItem } from '../../Core/Cart/redux/actions';
import AppStyles from '../../AppStyles';
import styles from './styles';

class DetailMarketplaceScreen extends Component {
  static contextType = ReactReduxContext;

  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      headerStyle: {
        paddingBottom: 15,
        backgroundColor: currentTheme.backgroundColor,
        borderBottomWidth: 0,
      },
      headerTintColor: '#DDB937',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      shopData: null,
    };

    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      (payload) =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
    this.getShopData();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid,
    );
  }

  async getShopData() {
    const { navigation } = this.props;
    const { shopID } = navigation.getParam('offerData');

    const shopData = await firebase
      .firestore()
      .collection('shops')
      .doc(shopID)
      .get();

    this.setState({ shopData: shopData.data() });
  }

  render() {
    const { navigation } = this.props;
    const { shopData } = this.state;

    const offerData = navigation.getParam('offerData');
    const {
      offerPicture,
      offerTitle,
      offerPrice,
      offerDescription,
    } = offerData;

    const itemMarketActions = [
      {
        text: 'Liker',
        icon: require('../../../assets/icons/heart-unfilled.png'),
      },
      {
        text: 'Sauvegarder',
        icon: require('../../../assets/icons/save.png'),
        action: () => {
          this.props.addWishListItem(offerData);
        },
      },
      {
        text: 'Partager',
        icon: require('../../../assets/icons/share.png'),
      },
      {
        text: 'Acheter',
        icon: require('../../../assets/icons/shop.png'),
        action: () => {
          this.props.addCartItem(offerData, offerPrice);
          Alert.alert(
            offerTitle,
            `has been added to cart`,
            [{ text: 'ok', onPress: () => {} }],
            { cancelable: false },
          );
        },
      },
    ];

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#09090F',
          paddingHorizontal: 10,
        }}>
        <FastImage
          style={{
            marginHorizontal: -10,
            width: responsiveWidth(100),
            height: responsiveHeight(30),
            marginBottom: 30,
          }}
          source={{ uri: offerPicture.downloadURL }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <Text style={styles.textTitle}>{offerTitle}</Text>

        <Text style={[styles.textSubTitle, { marginBottom: 30 }]}>
          {offerPrice}€
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
          }}>
          {itemMarketActions.map((item, index) => (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={item.action}
                style={{
                  backgroundColor: '#181825',
                  height: 60,
                  width: 60,
                  borderRadius: 150,
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: '40%',
                    height: '40%',
                    tintColor: '#D6B061',
                  }}
                  source={item.icon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>

              <Text style={[styles.textSubTitle, { fontSize: 12 }]}>
                {item.text}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.verticalSeparator} />

        <Text style={[styles.textSubTitle]}>Details</Text>
        <Text style={[styles.textParagraph, { marginBottom: 0 }]}>
          {offerDescription}
        </Text>

        <View style={styles.verticalSeparator} />

        <Text style={[styles.textSubTitle]}>À propos de la boutique</Text>
        {shopData && <ShopWidget shopData={shopData} />}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ feed, auth, friends }) => {
  return {
    discoverVideoFeedPosts: feed.discoverVideoFeedPosts,
    user: auth.user,
    users: auth.users,
    friends: friends.friends,
  };
};

export default connect(mapStateToProps, {
  setWishList,
  addWishListItem,
  addCartItem,
})(DetailMarketplaceScreen);

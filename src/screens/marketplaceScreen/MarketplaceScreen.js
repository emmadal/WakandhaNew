import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { connect, ReactReduxContext } from 'react-redux';
import Grid from 'react-native-grid-component';

import MainHeader from '../../navigators/mainHeader';
import { firebase } from '../../Core/firebase/config';

import AppStyles from '../../AppStyles';
import styles from './styles';

import FeedManager from '../../Core/socialgraph/feed/FeedManager';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
class MarketplaceScreen extends Component {
  static contextType = ReactReduxContext;

  static navigationOptions = ({ screenProps, navigation }) => {
    const { params = {} } = navigation.state;
    return MainHeader({ navigation, params });
  };

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isFetching: false,
      willBlur: false,
    };

    this.fetchCallCount = 0;
    this.isFetching = false;
    this.flatlistReady = false;

    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) => {
        this.setState({ willBlur: false });
      },
    );
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      (payload) => {
        this.setState({ willBlur: true });
      },
    );

    this.props.navigation.setParams({
      openDrawer: this.openDrawer,
    });
    this.feedManager = new FeedManager(this.context.store, this.props.user.id);
    this.feedManager.subscribeIfNeeded();

    this.getProducts();
  }

  componentWillUnmount() {
    this.willBlurSubscription && this.willBlurSubscription.remove();
    this.didFocusSubscription && this.didFocusSubscription.remove();
  }

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  getProducts() {
    firebase
      .firestore()
      .collection('products')
      .orderBy('offerCreationDate', 'desc')
      .limit(100)
      .onSnapshot((querySnapshot) => {
        const products = [];

        querySnapshot.forEach((doc) => {
          const product = doc.data();
          product.offerID = doc.id;
          products.push(product);
        });

        this.setState({ products });
      });
  }

  _renderItem = (offerData, i) => {
    const { offerTitle, offerPrice, offerPicture } = offerData;

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('DetailMarketplace', {
            stackKeyTitle: 'DetailMarketplace',
            lastScreenTitle: 'Marketplace',
            offerData,
          })
        }
        style={styles.containerItemMarket}
        key={i}>
        <Image
          style={styles.imageItemMarket}
          source={{ uri: offerPicture.downloadURL }}
          resizeMode={'cover'}
        />

        <View style={{ paddingHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: '#DDB937',
              marginBottom: 5,
            }}>
            {offerPrice}€
          </Text>

          <Text
            numberOfLines={1}
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: '#DDB937',
            }}>
            {offerTitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderPlaceholder = (i) => (
    <View style={styles.containerItemMarket} key={i} />
  );

  render() {
    const { userShopID } = this.props.user;
    const { products } = this.state;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#09090F',
        }}>
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',

            backgroundColor: '#1D1D27',
          }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => this.props.navigation.toggleDrawer()}
              activeOpacity={0.7}>
              <EvilIcons name={'navicon'} size={35} color={'#DDB937'} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                color: '#DDB937',
                fontWeight: '700',
                marginLeft: 20,
              }}>
              Sakuwa
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => this.props.navigation.navigate('CartScreen')}>
              <FontAwesome5
                name={'shopping-cart'}
                color={'#DDB937'}
                size={22}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View
          style={{
            borderBottomColor: '#343434',
            borderBottomWidth: 1,
            borderStyle: 'solid',
            paddingBottom: 15,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '700',
              color: '#DDB937',
              paddingHorizontal: 10,
            }}>
            Kasuwa
          </Text>
        </View> */}

        <Grid
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={this._renderItem}
          renderPlaceholder={this._renderPlaceholder}
          data={products}
          numColumns={2}
        />

        {userShopID ? (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('NewOffer', {
                stackKeyTitle: 'NewOffer',
                lastScreenTitle: 'Marketplace',
              })
            }
            style={styles.buttonNewPublication}>
            <Image
              style={[styles.imageNewPublication]}
              source={AppStyles.iconSet.plus}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('BecomeSeller', {
                stackKeyTitle: 'BecomeSeller',
                lastScreenTitle: 'Marketplace',
              })
            }
            style={styles.containerBecomeSeller}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '500',
              }}>
              Devenir vendeur Wakandha
            </Text>
          </TouchableOpacity>
        )}
      </View>
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

export default connect(mapStateToProps)(MarketplaceScreen);

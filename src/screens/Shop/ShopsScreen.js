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
  Text,
  ActivityIndicator,
  FlatList,
  ImageBackground,
} from 'react-native';
import Header from '../../components/DrawerContainer/Header';
import { firebase } from '../../Core/firebase/config';
import styles from './styles';
const mainYellowColor = '#DDB937';
let WIDTH = Dimensions.get('window').width;
const temp =
  'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/07/what-is-javascript.jpg';
class ShopsScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      shops: [],
    };
  }

  componentDidMount() {
    this.getCategories();
  }
  changeLoadingState = (loading) => {
    this.setState({ loading });
  };
  getCategories = () => {
    this.changeLoadingState(true);
    firebase
      .firestore()
      .collection('shops')
      .get()
      .then((snapShot) => {
        if (snapShot.size) {
          let shops = [];
          snapShot.forEach((doc) => {
            let shop = doc.data();
            shop.id = doc.id;
            shops.push(shop);
          });
          this.setState({ shops });
          this.changeLoadingState(false);
        } else {
          this.changeLoadingState(false);
        }
      })
      .catch((e) => {
        this.changeLoadingState(false);
      });
  };

  renderShopItem = ({ item }) => {
    const { shopName, shopPicture } = item;
    return (
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          width: WIDTH - 30,
          borderRadius: 7,
          height: 85,
          overflow: 'hidden',
          marginVertical: 7,
        }}
        activeOpacity={0.8}>
        <ImageBackground
          style={{
            height: 85,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={{ uri: shopPicture.downloadURL }}
          resizeMode={'cover'}>
          <Text
            style={{
              fontSize: 23,
              color: '#Ffff',
              fontWeight: '700',
              zIndex: 3,

              textAlign: 'center',
            }}>
            {shopName}
          </Text>
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'black',
              opacity: 0.3,
            }}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  render() {
    const { loading, shops } = this.state;
    return (
      <SafeAreaView style={styles.pageContainer}>
        <Header
          onPress={() => {
            this.props.navigation.toggleDrawer();
          }}
          onCartPress={() => {
            this.props.navigation.navigate('CartScreen');
          }}
          title={'Magasins'}
        />
        {loading && (
          <ActivityIndicator
            size={'small'}
            color={mainYellowColor}
            style={{ marginTop: 30, zIndex: 2 }}
          />
        )}
        {!loading && (
          <FlatList
            contentContainerStyle={{ paddingTop: 10 }}
            vertical
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item}`}
            data={shops}
            renderItem={this.renderShopItem}
          />
        )}
      </SafeAreaView>
    );
  }
}
const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(69,85,117,0.7)',
  },
});

export default ShopsScreen;

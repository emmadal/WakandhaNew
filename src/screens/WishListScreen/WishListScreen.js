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
import { connect, ReactReduxContext } from 'react-redux';
import styles from './styles';
import FastImage from 'react-native-fast-image';
const mainYellowColor = '#DDB937';
let WIDTH = Dimensions.get('window').width;
const temp =
  'https://5.imimg.com/data5/OO/LD/MY-20032116/fairiano-white-formal-shirt-500x500.jpg';
class WishListScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      list: [1, 2, 3],
    };
  }

  componentDidMount() {}

  renderListItem = ({ item }) => {
    console.log('item => ', item);
    const { offerPicture, offerTitle, offerPrice, offerDescription } = item;
    return (
      <TouchableOpacity
        style={{
          borderRadius: 7,
          height: 300,
          overflow: 'hidden',
          margin: 7,
          // backgroundColor: '#1D1D27',
          width: (WIDTH - 4 * 10) / 2,
        }}
        activeOpacity={0.8}>
        <FastImage
          source={{ uri: offerPicture.downloadURL }}
          style={{ width: '100%', height: 200 }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{ marginTop: 13 }}>
          <Text
            style={{ fontSize: 18, color: mainYellowColor, fontWeight: '600' }}>
            {offerPrice}€
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 16,
              color: 'grey',
              fontWeight: '600',
              marginTop: 10,
              paddingHorizontal: 4,
            }}>
            {offerDescription}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { loading, list } = this.state;

    return (
      <SafeAreaView style={styles.pageContainer}>
        <Header
          onPress={() => {
            this.props.navigation.toggleDrawer();
          }}
          onCartPress={() => {
            this.props.navigation.navigate('CartScreen');
          }}
          title={'Liste de souhaits'}
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
            numColumns={2}
            contentContainerStyle={{
              paddingTop: 10,
              justifyContent: 'space-around',
            }}
            vertical
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item}`}
            data={this.props.wishLists}
            renderItem={this.renderListItem}
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
const mapStateToProps = ({ feed, auth, friends, userWishLists }) => {
  return {
    user: auth.user,
    wishLists: userWishLists.wishList,
  };
};

export default connect(mapStateToProps)(WishListScreen);

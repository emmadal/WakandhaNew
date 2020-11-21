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
import FastImage from 'react-native-fast-image';
import styles from './styles';
const mainYellowColor = '#DDB937';
let WIDTH = Dimensions.get('window').width;
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect, ReactReduxContext } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  addItemPrice,
  subtractItemPrice,
  changeSize,
  changeColor,
  removeCartItem,
} from '../../Core/Cart/redux/actions';
const temp =
  'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/07/what-is-javascript.jpg';
class CartScreen extends Component {
  static navigationOptions = ({ screenProps, navigation }) => {
    return {
      header: null,
      headerMode: 'none',
    };
  };
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  deleteItem = (item) => {
    const { offerTitle } = item;
    Alert.alert(
      'Are you sure ?',
      `you want to delete ${offerTitle} from the cart`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => this.props.removeCartItem(item) },
      ],
      { cancelable: false },
    );
  };

  renderCartItem = ({ item }) => {
    const {
      quantity,
      offerTitle,
      offerPrice,
      color,
      size,
      offerPicture,
    } = item;
    const { downloadURL } = offerPicture;
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 150,
          marginLeft: 5,
          marginRight: 5,
          borderWidth: 1,
          borderColor: mainYellowColor,
          borderRadius: 7,
          marginVertical: 7,
          overflow: 'hidden',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={() => this.deleteItem(item)}
          style={{ height: '100%', width: '25%' }}>
          <FastImage
            source={{ uri: downloadURL }}
            style={{ width: '100%', height: '100%' }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={() => this.deleteItem(item)}
          style={{ height: '100%', width: '75%', flexDirection: 'row' }}>
          <View
            style={{
              height: '100%',
              width: '85%',
              backgroundColor: '#1D1D27',
            }}>
            <View
              style={{
                marginVertical: 10,
                marginLeft: 7,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: mainYellowColor,
                }}>
                {offerTitle}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 7,
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: mainYellowColor,
                    fontWeight: '600',
                    marginTop: 4,
                    marginRight: 8,
                  }}>
                  Color
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.changeColor(item, 'white')}
                  style={{
                    width: 25,
                    height: 25,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginHorizontal: 3,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {color == 'white' && (
                      <AntDesign size={15} name={'check'} color={'black'} />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.changeColor(item, 'orange')}
                  style={{
                    width: 25,
                    height: 25,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginHorizontal: 3,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'orange',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {color == 'orange' && (
                      <AntDesign size={15} name={'check'} color={'white'} />
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.changeColor(item, 'black')}
                  style={{
                    width: 25,
                    height: 25,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginHorizontal: 3,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'black',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {color == 'black' && (
                      <AntDesign size={15} name={'check'} color={'white'} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: mainYellowColor,
                    fontWeight: '600',
                    fontSize: 16,
                    marginTop: 4,
                    marginRight: 12,
                  }}>
                  Size
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.changeSize(item, 'extraLarge')}
                  style={{
                    width: 30,
                    height: 30,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginHorizontal: 3,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor:
                        size == 'extraLarge' ? mainYellowColor : null,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>
                      Xs
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.changeSize(item, 'small')}
                  style={{
                    width: 30,
                    height: 30,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginHorizontal: 3,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: size == 'small' ? mainYellowColor : null,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>S</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.changeSize(item, 'medium')}
                  style={{
                    width: 30,
                    height: 30,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginHorizontal: 3,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor:
                        size == 'medium' ? mainYellowColor : null,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>M</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.changeSize(item, 'large')}
                  style={{
                    width: 30,
                    height: 30,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginHorizontal: 3,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: size == 'large' ? mainYellowColor : null,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>L</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: mainYellowColor,
                  fontWeight: '600',
                  fontSize: 17,
                  marginTop: 10,
                }}>
                $ {offerPrice}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: '100%',
              width: '15%',
              justifyContent: 'space-between',
              paddingVertical: 10,
              backgroundColor: '#1D1D27',
            }}>
            <TouchableOpacity
              onPress={() => this.props.addItemPrice(item, offerPrice)}
              activeOpacity={0.5}
              style={{
                width: 30,
                height: 30,
                borderWidth: 1,
                borderColor: 'yellow',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text style={{ color: mainYellowColor, fontSize: 20 }}>+</Text>
            </TouchableOpacity>
            <Text
              style={{
                color: mainYellowColor,
                fontSize: 15,
                fontWeight: '700',
                alignSelf: 'center',
                marginRight: 12,
              }}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.subtractItemPrice(item, offerPrice)}
              activeOpacity={0.5}
              style={{
                width: 30,
                height: 30,
                borderWidth: 1,
                borderColor: 'yellow',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text style={{ color: mainYellowColor, fontSize: 20 }}>-</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { loading } = this.state;
    const { cartItems } = this.props;
    return (
      <SafeAreaView style={styles.pageContainer}>
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
            borderBottomColor: mainYellowColor,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => this.props.navigation.goBack()}
            activeOpacity={0.7}>
            <MaterialCommunityIcons
              name={'keyboard-backspace'}
              size={35}
              color={'#DDB937'}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: '#DDB937',
              fontWeight: '700',
              marginLeft: 20,
            }}>
            Chariot
          </Text>
        </View>
        {loading && (
          <ActivityIndicator
            size={'small'}
            color={mainYellowColor}
            style={{ marginTop: 30, zIndex: 2 }}
          />
        )}
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{ paddingTop: 10 }}
            vertical
            showsVerticalScrollIndicator={false}
            keyExtractor={({ item, index }) => `${index}`}
            data={this.props.cartItems}
            renderItem={this.renderCartItem}
          />
        </View>
        <View
          style={{
            backgroundColor: 'black',
            height: 140,
            borderTopColor: mainYellowColor,
            borderTopWidth: 0.5,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingTop: 20,
              paddingHorizontal: 25,
            }}>
            <Text
              style={{
                color: mainYellowColor,
                fontSize: 18,
                fontWeight: '600',
              }}>
              Total
            </Text>
            <Text
              style={{
                color: mainYellowColor,
                fontSize: 20,
                fontWeight: '700',
              }}>
              $ {this.props.totalPrice}
            </Text>
          </View>
          <TouchableOpacity
            disabled={this.props.cartItems.length < 1}
            onPress={() => {
              this.props.navigation.navigate('Payment', {
                cartItems,
              });
            }}
            activeOpacity={0.5}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: mainYellowColor,
              alignSelf: 'center',
              width: WIDTH - 40,
              height: 60,
              borderRadius: 5,
              marginTop: 15,
            }}>
            <Text style={{ color: 'black', fontSize: 17, fontWeight: '700' }}>
              CONTINUE
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ feed, auth, friends, userWishLists, cartItems }) => {
  return {
    user: auth.user,
    cartItems: cartItems.items,
    totalPrice: cartItems.price,
  };
};

export default connect(mapStateToProps, {
  addItemPrice,
  subtractItemPrice,
  changeColor,
  changeSize,
  removeCartItem,
})(CartScreen);

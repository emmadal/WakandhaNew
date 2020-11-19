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
class OrdersScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {}
  changeLoadingState = (loading) => {
    this.setState({ loading });
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
          title={'Commandes'}
        />
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

export default OrdersScreen;

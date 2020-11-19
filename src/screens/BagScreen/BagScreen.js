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
const temp = require('../../../assets/images/logo.png');
class BagScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      categories: [
        { id: 1, name: 'Accessoires' },
        { id: 2, name: 'Vêtements Femmes' },
        { id: 3, name: 'Vêtements Hommes' },
        { id: 4, name: 'Chaussures' },
        { id: 5, name: 'Appareils Électronique' },
        { id: 6, name: 'Produits de Beauté' },
        { id: 7, name: 'Électro ménager' },
        { id: 8, name: 'Cuisine' },
        { id: 9, name: 'Jardinage' },
        { id: 10, name: 'Montres' },
        { id: 11, name: 'Sacs' },
        { id: 12, name: 'Lunettes' },
        { id: 13, name: 'Bébés' },
        { id: 14, name: 'Enfants' },
        { id: 15, name: 'Musique' },
        { id: 16, name: 'E-Books' },
        { id: 17, name: 'Photos' },
        { id: 18, name: 'Vidéos' },
        { id: 19, name: 'Jeux' },
        { id: 20, name: 'Matériaux de construction' },
        { id: 21, name: 'Fournitures scolaires' },
        { id: 22, name: 'Pièces détachées' },
        { id: 23, name: 'Autres' },
      ],
    };
  }

  componentDidMount() {}
  changeLoadingState = (loading) => {
    this.setState({ loading });
  };

  renderCategoryItem = ({ item }) => {
    const { name } = item;
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
          source={temp}
          resizeMode={'contain'}>
          <Text
            style={{
              fontSize: 23,
              color: '#Ffff',
              fontWeight: '700',
              zIndex: 3,

              textAlign: 'center',
            }}>
            {name}
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
    const { loading, shops, categories } = this.state;
    return (
      <SafeAreaView style={styles.pageContainer}>
        <Header
          onPress={() => {
            this.props.navigation.toggleDrawer();
          }}
          onCartPress={() => {
            this.props.navigation.navigate('CartScreen');
          }}
          title={'Sac'}
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
            data={categories}
            renderItem={this.renderCategoryItem}
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

export default BagScreen;

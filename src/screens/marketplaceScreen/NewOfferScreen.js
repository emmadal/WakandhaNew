import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  Text,
  BackHandler,
} from 'react-native';
import { connect, ReactReduxContext } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../Core/firebase/config';
import { firebaseStorage } from '../../Core/firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

import ShopWidget from '../../components/screens/Marketplace/shopWidget';

import AppStyles from '../../AppStyles';
import styles from './styles';

class NewOfferScreen extends Component {
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

      offerPictureURI: null,
      offerTitle: '',
      offerPrice: null,
      offerCategory: '',
      offerAddress: '',
      offerDescription: '',
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
    const {
      user: { userShopID },
    } = this.props;

    const shopData = await firebase
      .firestore()
      .collection('shops')
      .doc(userShopID)
      .get();

    this.setState({ shopData: shopData.data() });
  }

  async addPicture() {
    const image = await ImagePicker.openPicker({
      cropping: false,
    });

    this.setState({ offerPictureURI: image.path });
  }

  async addProductToFirebase() {
    const {
      userShopID,
      location: { latitude, longitude },
    } = this.props.user;
    const {
      offerPictureURI,
      offerTitle,
      offerPrice,
      offerCategory,
      offerAddress,
      offerDescription,
    } = this.state;

    try {
      if (!offerPictureURI) {
        throw 'Choisissez une image pour votre produit.';
      } else if (
        !offerTitle ||
        offerTitle.length < 3 ||
        offerTitle.length > 20
      ) {
        throw 'Choisissez un nom pour votre produit entre 3 et 20 caractères.';
      } else if (
        !offerAddress ||
        offerAddress.length < 3 ||
        offerAddress.length > 60
      ) {
        throw 'Choisissez une adresse correcte pour votre produit.';
      } else if (!offerPrice || offerPrice < 1 || offerPrice > 999999) {
        throw 'Votre prix doit être supérieur à 1 et inférieur à 1M.';
      } else if (
        !offerCategory ||
        offerCategory.length < 3 ||
        offerCategory.length > 15
      ) {
        throw 'Choisissez une catégorie pour votre produit.';
      } else if (
        !offerDescription ||
        offerDescription.length < 25 ||
        offerDescription.length > 200
      ) {
        throw 'Saisissez une description entre 25 et 200 caractères pour votre produit.';
      } else {
        const offerPicture = await firebaseStorage.uploadImage(offerPictureURI);

        await firebase.firestore().collection('products').add({
          ownerID: firebase.auth().currentUser.uid,
          shopID: userShopID,
          ownerLocation: { latitude, longitude },
          offerPicture,
          offerTitle,
          offerPrice,
          offerCategory,
          offerAddress,
          offerDescription,
          offerCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
        });

        this.props.navigation.goBack();
      }
    } catch (e) {
      Alert.alert(e);
    }
  }

  render() {
    const {
      shopData,

      offerPictureURI,
      offerTitle,
      offerPrice,
      offerCategory,
      offerAddress,
      offerDescription,
    } = this.state;

    const mainYellowColor = '#DDB937';

    const textInputProps = {
      placeholderTextColor: mainYellowColor,
      fontSize: 15,
      labelTextStyle: { fontSize: 15 },
      textColor: mainYellowColor,
      baseColor: mainYellowColor,
    };

    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            backgroundColor: '#09090F',
            paddingHorizontal: 10,
          }}>
          {shopData && <ShopWidget shopData={shopData} />}

          <TouchableOpacity
            onPress={() => this.addPicture()}
            style={styles.containerDashed}>
            {offerPictureURI ? (
              <Image source={{ uri: offerPictureURI }} style={{ flex: 1 }} />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: '500',
                  color: mainYellowColor,
                }}>
                + Ajouter une photo
              </Text>
            )}
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 13,
              fontWeight: '500',
              color: '#EBDBA2',
              marginBottom: 15,
            }}>
            Ajoute ici une photo qui représente ton produit afin que les
            acheteurs potentiels puissent bien comprendre ce qu'ils achètent.
          </Text>

          <TextField
            {...textInputProps}
            value={offerTitle}
            onChangeText={(text) => this.setState({ offerTitle: text })}
            label="Titre"
          />
          <TextField
            {...textInputProps}
            value={offerPrice}
            keyboardType={'numeric'}
            onChangeText={(text) => this.setState({ offerPrice: text })}
            label="Prix"
          />
          <TextField
            {...textInputProps}
            value={offerCategory}
            onChangeText={(text) => this.setState({ offerCategory: text })}
            label="Catégorie"
          />
          <TextField
            {...textInputProps}
            value={offerAddress}
            onChangeText={(text) => this.setState({ offerAddress: text })}
            label="Adresse"
          />
          <TextField
            {...textInputProps}
            value={offerDescription}
            onChangeText={(text) => this.setState({ offerDescription: text })}
            label="Description"
          />
        </KeyboardAwareScrollView>

        {offerPictureURI && (
          <TouchableOpacity
            onPress={() => this.addProductToFirebase()}
            style={styles.containerBecomeSeller}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '500',
              }}>
              Publier produit
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

export default connect(mapStateToProps)(NewOfferScreen);

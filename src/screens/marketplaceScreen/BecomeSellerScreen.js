import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
} from 'react-native';
import { connect, ReactReduxContext } from 'react-redux';
import { WebView } from 'react-native-webview';
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';

import { firebase } from '../../Core/firebase/config';
import { firebaseStorage } from '../../Core/firebase/storage';
import APIList from '../../Core/endpoints/index';

import AppStyles from '../../AppStyles';
import styles from './styles';

class BecomeSeller extends Component {
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
      displayPaymentModal: false,
      selectedPaymentOption: 0,

      shopPictureURI: null,
      shopName: '',
      shopAddress: '',
      shopType: '',
      shopDescription: '',
    };
  }

  async addPicture() {
    const image = await ImagePicker.openPicker({
      cropping: false,
    });

    this.setState({ shopPictureURI: image.path });
  }

  async verifyShopValidity() {
    const {
      shopPictureURI,
      shopName,
      shopAddress,
      shopType,
      shopDescription,
    } = this.state;

    try {
      if (!shopPictureURI) {
        throw 'Choisissez une image pour votre boutique.';
      } else if (!shopName || shopName.length < 3 || shopName.length > 20) {
        throw 'Choisissez un nom pour votre boutique entre 3 et 20 caractères.';
      } else if (
        !shopAddress ||
        shopAddress.length < 3 ||
        shopAddress.length > 60
      ) {
        throw 'Choisissez une adresse correcte pour votre boutique.';
      } else if (!shopType || shopType.length < 3 || shopType.length > 15) {
        throw 'Choisissez une catégorie pour votre boutique.';
      } else if (
        !shopDescription ||
        shopDescription.length < 25 ||
        shopDescription.length > 200
      ) {
        throw 'Saisissez une description entre 25 et 200 caractères pour votre boutique.';
      } else {
        if (__DEV__) {
          this.createShop();
        } else {
          this.setState({ displayPaymentModal: true });
        }
      }
    } catch (e) {
      Alert.alert(e);
    }
  }

  handleResponse = (data) => {
    if (data.url.includes('success')) {
      this.setState({ displayPaymentModal: false });

      Alert.alert(
        'Votre paiement a bien été traité, votre boutique est en cours de création, elle sera disponible dans quelques instants!',
      );

      this.createShop();
    } else if (data.url.includes('error') || data.url.includes('cancel')) {
      this.setState({ displayPaymentModal: false });
      Alert.alert(
        'Il y a eu une erreur lors de votre paiement, essayez plus tard?',
      );
    } else {
      return;
    }
  };

  async createShop() {
    const {
      shopPictureURI,
      shopName,
      shopAddress,
      shopType,
      shopDescription,
    } = this.state;

    try {
      const userID = firebase.auth().currentUser.uid;

      const shopPicture = await firebaseStorage.uploadImage(shopPictureURI);

      const newStore = await firebase.firestore().collection('shops').add({
        ownerID: firebase.auth().currentUser.uid,
        shopPicture,
        shopName,
        shopAddress,
        shopType,
        shopDescription,
        shopCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
      });

      firebase
        .firestore()
        .collection('users')
        .doc(userID)
        .update({ userShopID: newStore.id });

      this.props.navigation.goBack();
    } catch (e) {
      Alert.alert(e);
    }
  }

  render() {
    const {
      displayPaymentModal,

      shopPictureURI,
      shopName,
      shopAddress,
      shopType,
      shopDescription,
    } = this.state;

    const userID = firebase.auth().currentUser.uid;

    const paypalPaymentURL = `${APIList.APIPaypalPayment}?price=48&uid=${userID}&offerID=becomeSeller`;

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
          }}
          contentContainerStyle={{ paddingBottom: 150 }}>
          <Text style={[styles.textTitle, { marginBottom: 30 }]}>
            Créez votre{'\n'}boutique Wakandha
          </Text>

          <TouchableOpacity
            onPress={() => this.addPicture()}
            style={styles.containerDashed}>
            {shopPictureURI ? (
              <Image source={{ uri: shopPictureURI }} style={{ flex: 1 }} />
            ) : (
              <Text
                style={{
                  ...styles.textParagraph,
                  textAlign: 'center',
                  color: mainYellowColor,
                  marginBottom: 0,
                }}>
                + Ajouter une photo de devanture
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
            En devenant vendeur Wakandha, vous pouvez vendre à toute la
            communauté facilement et rapidement. Frais d'inscription unique de
            48€.
          </Text>

          <TextField
            {...textInputProps}
            value={shopName}
            onChangeText={(text) => this.setState({ shopName: text })}
            label="Nom de la boutique"
          />
          <TextField
            {...textInputProps}
            value={shopAddress}
            onChangeText={(text) => this.setState({ shopAddress: text })}
            label="Adresse de la boutique"
          />
          <TextField
            {...textInputProps}
            value={shopType}
            onChangeText={(text) => this.setState({ shopType: text })}
            label="Type de boutique"
          />
          <TextField
            {...textInputProps}
            value={shopDescription}
            onChangeText={(text) => this.setState({ shopDescription: text })}
            label="Description de votre boutique"
          />
        </KeyboardAwareScrollView>

        <Button
          containerStyle={styles.buttonContainer}
          style={styles.textButton}
          onPress={() => this.verifyShopValidity()}>
          Procéder au paiement (48€)
        </Button>

        <Modal
          visible={displayPaymentModal}
          onRequestClose={() => this.setState({ displayPaymentModal: false })}>
          <WebView
            source={{
              uri: paypalPaymentURL,
            }}
            onNavigationStateChange={(data) => this.handleResponse(data)}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = ({ auth, friends }) => {
  return {
    user: auth.user,
    users: auth.users,
    friends: friends.friends,
  };
};

export default connect(mapStateToProps)(BecomeSeller);

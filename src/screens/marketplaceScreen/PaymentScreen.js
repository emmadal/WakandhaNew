import React, { Component } from 'react';
import {
  Platform,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import { connect, ReactReduxContext } from 'react-redux';
import { firebase } from '../../Core/firebase/config';
import { WebView } from 'react-native-webview';
import Button from 'react-native-button';
import axios from 'axios';
import qs from 'querystring';

import TNTouchableIcon from '../../Core/truly-native/TNTouchableIcon/TNTouchableIcon';
import APIList from '../../Core/endpoints/index';
import uuid from 'uuidv4';
import AppStyles from '../../AppStyles';
import styles from './styles';

class PaymentScreen extends Component {
  static contextType = ReactReduxContext;

  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    const { params = {} } = navigation.state;
    return {
      headerLeft: Platform.OS === 'android' && (
        <TNTouchableIcon
          imageStyle={{ tintColor: currentTheme.fontColor }}
          iconSource={AppStyles.iconSet.menuHamburger}
          onPress={params.openDrawer}
          appStyles={AppStyles}
        />
      ),
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
      displayPaymentModal: {
        status: false,
        itemForPayment: null,
      },
      selectedPaymentOption: 0,
      paymentModalLoader: false,
      airTelPaymentScreen: null,
    };
  }

  backAction = () => this.props.navigation.navigate('CartScreen');

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  proceedWithAirTelMoney = (itemForPayment) => {
    this.showSpinner();

    const requestBody = {
      tel_marchand: APIList.APIAirtelPaymentMarchand,
      montant: parseInt(itemForPayment['totalAmount']),
      ref: uuid().slice(0, 13).toUpperCase(),
      action: 1,
      service: 'WEB',
      operateur: 'AM',
      redirect: 'https://funding.wakandha.com/votre-cadeau/',
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    axios
      .post(APIList.APIAirtelPayment, qs.stringify(requestBody), config)
      .then((response) => {
        // console.log('result', response.data);
        this.setState({
          airTelPaymentScreen: response.data,
          paymentModalLoader: false,
        });
      })
      .catch((e) => {
        console.log('airTel money error => ', e);
        this.hideSpinner();
      });
  };

  handleResponse = (data) => {
    if (data.url.includes('success')) {
      let updatedDisplayPaymentModal = { ...this.state.displayPaymentModal };
      updatedDisplayPaymentModal['status'] = false;
      updatedDisplayPaymentModal['itemForPayment'] = null;
      this.setState({
        displayPaymentModal: updatedDisplayPaymentModal,
        status: 'Complete',
      });

      setTimeout(() => {
        Alert.alert('Votre achat a bien été traité!');
      }, 500);
      this.props.navigation.goBack();
    } else if (data.url.includes('error') || data.url.includes('cancel')) {
      let updatedDisplayPaymentModal = { ...this.state.displayPaymentModal };
      updatedDisplayPaymentModal['status'] = false;
      updatedDisplayPaymentModal['itemForPayment'] = null;
      this.setState({
        displayPaymentModal: updatedDisplayPaymentModal,
        status: 'Cancelled',
      });
      this.setState({ displayPaymentModal: false, status: 'Cancelled' });
      Alert.alert(
        'Il y a eu une erreur lors de votre paiement, essayez plus tard?',
      );
    } else {
      return;
    }
  };

  handlePaymentModalStatus = (item) => {
    if (
      this.state.selectedPaymentOption === 1 &&
      parseInt(item['totalAmount']) < 100
    ) {
      Alert.alert('For Airtel Money, amount should not be less then 100!');
      return;
    }

    let updatedDisplayPaymentModal = { ...this.state.displayPaymentModal };
    updatedDisplayPaymentModal['status'] = true;
    updatedDisplayPaymentModal['itemForPayment'] = item;
    this.setState({
      displayPaymentModal: updatedDisplayPaymentModal,
    });

    if (this.state.selectedPaymentOption === 1) {
      this.proceedWithAirTelMoney(item);
    }
  };

  showSpinner() {
    this.setState({ paymentModalLoader: true });
  }

  hideSpinner() {
    this.setState({ paymentModalLoader: false });
  }

  getPaymentWebView = () => {
    const {
      selectedPaymentOption,
      airTelPaymentScreen,
      displayPaymentModal,
    } = this.state;
    const userID = firebase.auth().currentUser.uid;
    const { itemForPayment } = displayPaymentModal;
    const transactionType = 'buyItem';
    if (itemForPayment) {
      if (selectedPaymentOption === 0) {
        return (
          <WebView
            source={{
              uri: `${APIList.APIPaypalPayment}?offerID=${itemForPayment.offerID}&price=${itemForPayment.offerPrice}&uid=${userID}&transactionType=${transactionType}`,
            }}
            onNavigationStateChange={(data) => this.handleResponse(data)}
          />
        );
      } else if (selectedPaymentOption === 1) {
        return (
          <WebView
            originWhitelist={['*']}
            source={{ html: airTelPaymentScreen }}
            onNavigationStateChange={(data) => this.handleResponse(data)}
          />
        );
      } else {
        this.setState({ displayPaymentModal: false });
        Alert.alert('Something went wrong!');
      }
    }
  };

  render() {
    const { navigation } = this.props;

    const cartItems = navigation.getParam('cartItems');

    const {
      selectedPaymentOption,
      displayPaymentModal,
      paymentModalLoader,
    } = this.state;

    const paymentOptions = [
      {
        text: 'Paypal',
      },
      {
        text: 'Airtel Money',
      },
      /*{
        text: 'Visa',
      },
      {
        text: 'Mastercard',
      },
      {
        text: 'Orange Money',
      },
      {
        text: 'Airtel Money',
      },
      {
        text: 'Dolium',
      },*/
    ];

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#09090F',
            paddingHorizontal: 10,
          }}
          contentContainerStyle={{ paddingBottom: 150 }}>
          <Text style={[styles.textSubTitle]}>Moyen de paiement</Text>

          <Text style={[styles.textParagraph]}>
            Sélectionne ton moyen de paiement
          </Text>

          {paymentOptions.map((option, index) => (
            <TouchableOpacity
              onPress={() => this.setState({ selectedPaymentOption: index })}
              style={styles.containerItem}>
              <View
                style={[
                  styles.checkbox,
                  selectedPaymentOption === index && {
                    backgroundColor: '#DDB937',
                  },
                ]}
              />

              <Text style={{ fontSize: 15, color: 'white' }}>
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}

          {cartItems.map((cartItem, i) => {
            const totalAmount =
              Number(cartItem['offerPrice']) * cartItem['quantity'];
            return (
              <View
                key={i}
                style={{
                  ...styles.containerItem,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: 30,
                  borderRadius: 20,
                  marginBottom: 40,
                  height: 240,
                }}>
                <Text style={[styles.textSubTitle]}>
                  {cartItem['offerTitle']}
                </Text>
                <Text style={[styles.textParagraph, { color: 'white' }]}>
                  {cartItem['shopName']}
                </Text>

                <Text style={[styles.textTitle, { marginBottom: 0 }]}>
                  {totalAmount}€
                </Text>

                <Button
                  containerStyle={styles.buttonContainer}
                  style={styles.textButton}
                  disabled={selectedPaymentOption < 0}
                  disabledContainerStyle={styles.disabledButtonContainer}
                  styleDisabled={styles.disabledButton}
                  onPress={() =>
                    this.handlePaymentModalStatus({ ...cartItem, totalAmount })
                  }>
                  Procéder au paiement
                </Button>
              </View>
            );
          })}
        </ScrollView>

        <Modal
          visible={displayPaymentModal['status']}
          onRequestClose={() => this.setState({ displayPaymentModal: false })}>
          {paymentModalLoader ? (
            <View style={styles.modalBodyContainer}>
              <ActivityIndicator size="large" />
              <Text>Please wait...</Text>
            </View>
          ) : (
            this.getPaymentWebView()
          )}
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

export default connect(mapStateToProps)(PaymentScreen);

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  ProgressBarAndroid,
  Button,
  TouchableOpacity,
  Dimensions,
  Alert,
  Linking,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar, Icon, Divider } from 'react-native-elements';
// import QRCodeScanner from 'react-native-qrcode-scanner';

/**
This is the Barcode Scanner screen
**/
export default class BarCodeScannerScreen extends Component {
  // onSuccess = (e) => {
  //   Linking.openURL(e.data).catch((err) => Alert.alert('An error occured!'));
  // };

  componentDidMount() {
    this.showAlert();
  }

  showAlert = () => {
    Alert.alert(
      '',
      'This QR code scanner only scans QR codes that contains url data payload. Go to https://en.wikipedia.org/wiki/QR_code to test this QR code scanner!',
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/*HEADER*/}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: Dimensions.get('screen').width * 0.95,
            marginTop: 40,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../../../assets/icons/whtasappicon/arrow_back_long.png')}
              style={{ height: 25, width: 25, tintColor: '#ffbf00' }}
            />
          </TouchableOpacity>

          <Text style={{ fontWeight: 'bold', position: 'absolute', left: 50 }}>
            Scan QR code
          </Text>
        </View>

        <Divider
          style={{
            width: Dimensions.get('screen').width * 0.95,
            height: 1,
            backgroundColor: '#d7d7d7',
          }}
        />
        {/*END HEADER */}

        {/* BODY */}
        <View
          style={{
            height: 125,
            width: Dimensions.get('screen').width,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'gray',
              fontSize: 18,
              alignSelf: 'center',
              textAlign: 'center',
              margin: 20,
            }}>
            To use WhatsApp Web, go to web.whatsapp.com on your computer to scan
            the code.
          </Text>
        </View>

        {/* <QRCodeScanner
          onRead={this.onSuccess}
          showMarker={true}
          reactivate={true}
        /> */}
        {/* END BODY*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textView: {
    fontSize: 18,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 35,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 40,
    paddingLeft: 40,
    marginTop: 30,
    color: 'black',
  },
});

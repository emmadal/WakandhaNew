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
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar, Icon, Divider } from 'react-native-elements';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';

/**
This is the WhatsApp web screen
**/
export default class WhatsAppWebScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  handleOpen = () => {
    this.setState({ isVisible: true });
  };

  handleClose = () => {
    this.setState({ isVisible: false });
  };

  gotoBarCode = () => {
    this.props.navigation.navigate('BarCodeScannerScreen');
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
            marginTop: 30,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={this.props.navigation.openDrawer}>
            <Image
              source={require('../../../assets/icons/whtasappicon/arrow_back_long.png')}
              style={{ height: 25, width: 25, tintColor: '#ffbf0f' }}
            />
          </TouchableOpacity>

          <Text style={{ fontWeight: 'bold', position: 'absolute', left: 50 }}>
            Wakandha Web
          </Text>

          <TouchableOpacity
            // onPress={() => this.gotoBarCode()}
            style={{
              borderRadius: 200,
              height: 25,
              width: 25,
              marginRight: 10,
            }}>
            <Image
              source={require('../../../assets/icons/whtasappicon/plus.png')}
              style={{ height: 25, width: 25, tintColor: '#ffbf0f' }}
            />
          </TouchableOpacity>
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
        <Image
          source={require('../../../assets/images/whatsapp_web.jpg')}
          style={{ height: 100, width: 200, marginTop: 40 }}
        />

        <View
          style={{
            width: Dimensions.get('screen').width * 0.85,
            height: 200,
            elevation: 2,
            borderRadius: 3,
            backgroundColor: 'white',
            marginTop: 40,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#ffbf0f',
              alignSelf: 'flex-start',
              textAlign: 'center',
              margin: 10,
            }}>
            Logged in devices
          </Text>
          <Divider
            style={{ width: '100%', height: 0.5, backgroundColor: '#d7d7d7' }}
          />

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'gray',
                height: 40,
                width: 40,
                marginRight: 10,
                marginLeft: 20,
                backgroundColor: 'white',
              }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/globe.png')}
                style={{ height: 24, width: 24, tintColor: 'gray' }}
              />
            </TouchableOpacity>

            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                Last active today at 00:33
              </Text>
              <Text
                style={{
                  color: 'gray',
                  alignSelf: 'flex-start',
                  textAlign: 'center',
                }}>
                Windows
              </Text>
            </View>
          </View>

          <Divider
            style={{
              width: '90%',
              height: 0.5,
              marginTop: 20,
              backgroundColor: '#d7d7d7',
            }}
          />

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => this.handleOpen()}
              style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  width: 40,
                  marginLeft: 20,
                  backgroundColor: 'white',
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/log_out.png')}
                  style={{ height: 30, width: 30, tintColor: 'gray' }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#0fabf5',
                  alignSelf: 'center',
                  marginLeft: 10,
                  fontSize: 16,
                }}>
                Logout from all devices
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{
            color: 'gray',
            alignSelf: 'center',
            fontSize: 16,
            marginTop: 20,
          }}>
          Tap + to use Wakandha on other devices.
        </Text>
        {/* END BODY*/}

        <SCLAlert
          theme="success"
          show={this.state.isVisible}
          title="Success"
          subtitle="successfully logged out from all other devices!"
          onRequestClose={this.handleClose}
        />
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
});

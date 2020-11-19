import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Button from 'react-native-button';
import { Card, Divider } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';

/**
This is the feedback screen for users to contact the app admins
**/

export default class YourFeedbackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleOpen = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
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
            Feedback
          </Text>

          <TouchableOpacity
            style={{
              borderRadius: 200,
              height: 20,
              width: 20,
              marginRight: 10,
              backgroundColor: '#ffbf0f',
            }}>
            <Image
              source={require('../../../assets/icons/whtasappicon/more_horizontal.png')}
              style={{ height: 20, width: 20, tintColor: 'white' }}
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

        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginTop: 20,
              marginBottom: 40,
            }}>
            <Card>
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Image
                  style={{ flex: 1, height: 200, width: 200 }}
                  source={require('../../../assets/images/suggestions.jpg')}
                />
                <Text style={{ marginBottom: 10, color: '#666666' }}>
                  Have issues or suggestions? Feel free to get in touch with us
                  and we will take appropriate actions as soon as possible!
                </Text>
                <Text style={{ marginBottom: 10, color: '#666666' }}>
                  Fill the form below to get started
                </Text>

                <TextInput
                  placeholder="Email"
                  style={{
                    height: 40,
                    width: 250,
                    borderRadius: 2,
                    paddingLeft: 10,
                    marginTop: 20,
                    marginBottom: 20,
                    backgroundColor: '#f7f9fc',
                  }}
                />

                <TextInput
                  placeholder="Your Feedback"
                  style={{
                    height: 100,
                    width: 250,
                    padding: 10,
                    borderRadius: 2,
                    marginTop: 20,
                    marginBottom: 20,
                    backgroundColor: '#f7f9fc',
                  }}
                  multiline={true}
                />

                <Text
                  style={{
                    marginBottom: 10,
                    color: '#666666',
                    textAlign: 'center',
                  }}>
                  How would you rate your Wakandha experience?
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <Image
                    source={require('../../../assets/icons/whtasappicon/star_bold.png')}
                    style={{ width: 35, height: 35, tintColor: '#ffbf0f' }}
                  />
                  <Image
                    source={require('../../../assets/icons/whtasappicon/star_bold.png')}
                    style={{ width: 35, height: 35, tintColor: '#ffbf0f' }}
                  />
                  <Image
                    source={require('../../../assets/icons/whtasappicon/star_bold.png')}
                    style={{ width: 35, height: 35, tintColor: '#ffbf0f' }}
                  />
                  <Image
                    source={require('../../../assets/icons/whtasappicon/star_bold.png')}
                    style={{ width: 35, height: 35, tintColor: '#ffbf0f' }}
                  />
                  <Image
                    source={require('../../../assets/icons/whtasappicon/star_bold.png')}
                    style={{ width: 35, height: 35, tintColor: '#d7d7d7' }}
                  />
                </View>

                <Button
                  containerStyle={{
                    backgroundColor: '#ffbf0f',
                    height: 45,
                    padding: 10,
                    width: 250,
                    borderRadius: 20,
                  }}
                  style={{ fontSize: 15, color: 'white' }}
                  onPress={() => this.setState({ show: !this.state.show })}>
                  SEND FEEDBACK
                </Button>
              </View>
            </Card>
          </View>
        </ScrollView>

        <SCLAlert
          theme="success"
          show={this.state.show}
          title="Success!"
          subtitle="Feedback sent successfully"
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

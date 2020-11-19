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
  ScrollView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar, Icon, Divider } from 'react-native-elements';

/**
This is the settings screen of the logged in user
**/

export default class SettingsScreen extends Component {
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
            Settings
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

        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            flex: 1,
            alignItems: 'center',
          }}
          style={{ width: Dimensions.get('screen').width }}
          vertical
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              width: Dimensions.get('screen').width * 0.85,
            }}>
            <TouchableOpacity style={styles.btnMiddle}>
              <Image
                source={require('../../../assets/images/lady.jpg')}
                style={{ height: 60, width: 60, borderRadius: 200 }}
              />
            </TouchableOpacity>

            <View style={{ flexDirection: 'column', marginLeft: 15 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  position: 'absolute',
                  fontSize: 16,
                }}>
                Laura Amber Raquel
              </Text>
              <Text
                style={{ position: 'absolute', fontSize: 14, marginTop: 30 }}>
                At the Gym
              </Text>
            </View>
          </View>

          <Divider
            style={{
              width: Dimensions.get('screen').width * 0.95,
              marginTop: 15,
              height: 0.5,
              backgroundColor: '#d7d7d7',
            }}
          />

          <View
            style={{
              flexDirection: 'column',
              width: Dimensions.get('screen').width * 0.95,
              marginTop: 20,
            }}>
            <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/lock.png')}
                style={{ height: 24, width: 24, tintColor: '#ffbf0f' }}
              />
              <Text
                style={{ marginLeft: 20, fontSize: 16, alignSelf: 'center' }}>
                Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/message.png')}
                style={{ height: 24, width: 24, tintColor: '#ffbf0f' }}
              />
              <Text
                style={{ marginLeft: 20, fontSize: 16, alignSelf: 'center' }}>
                Chat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/bell.png')}
                style={{ height: 24, width: 24, tintColor: '#ffbf0f' }}
              />
              <Text
                style={{ marginLeft: 20, fontSize: 16, alignSelf: 'center' }}>
                Notification
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/activity.png')}
                style={{ height: 24, width: 24, tintColor: '#ffbf0f' }}
              />
              <Text
                style={{ marginLeft: 20, fontSize: 16, alignSelf: 'center' }}>
                Data Usage
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/person.png')}
                style={{ height: 24, width: 24, tintColor: '#ffbf0f' }}
              />
              <Text
                style={{ marginLeft: 20, fontSize: 16, alignSelf: 'center' }}>
                Contacts
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/credit_card.png')}
                style={{ height: 24, width: 24, tintColor: '#ffbf0f' }}
              />
              <Text
                style={{ marginLeft: 20, fontSize: 16, alignSelf: 'center' }}>
                Payment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/people.png')}
                style={{ height: 24, width: 24, tintColor: '#ffbf0f' }}
              />
              <Text
                style={{ marginLeft: 20, fontSize: 16, alignSelf: 'center' }}>
                Invite Friends
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/question.png')}
                style={{ height: 24, width: 24, tintColor: '#ffbf0f' }}
              />
              <Text
                style={{ marginLeft: 20, fontSize: 16, alignSelf: 'center' }}>
                About and Help
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/log_out.png')}
                style={{ height: 24, width: 24, tintColor: '#ffbf0f' }}
              />
              <Text
                style={{ marginLeft: 20, fontSize: 16, alignSelf: 'center' }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  btnMiddle: {
    width: 60,
    height: 60,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

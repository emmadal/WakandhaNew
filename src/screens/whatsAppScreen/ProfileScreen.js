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
  FlatList,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar, Icon, Divider, Overlay } from 'react-native-elements';
import photosdatalist from '../../data/photos';
import * as Animatable from 'react-native-animatable';

/**
This is the user's profile screen; this is where the online user can customize their profile
**/
export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'#ffbf00'}
          barStyle="light-content"
          animated={true}
        />

        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          vertical
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: 180,
              width: Dimensions.get('screen').width,
              flexDirection: 'column',
            }}>
            <View
              style={[styles.innerContainer, { ...StyleSheet.absoluteFill }]}>
              <Image
                source={require('../../../assets/images/lady.jpg')}
                style={styles.fullImage}
              />
              <View
                style={[
                  styles.overlay,
                  { width: Dimensions.get('window').width, height: 180 },
                ]}
              />
            </View>

            <TouchableOpacity
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginLeft: 20,
                marginTop: 30,
              }}
              onPress={this.props.navigation.openDrawer}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/menu.png')}
                  style={{ height: 24, tintColor: 'white', width: 24 }}
                />
                <Animatable.View
                  animation="bounce"
                  delay={0}
                  duration={1000}
                  iterationCount="infinite"
                  iterationDelay={2000}
                  useNativeDriver>
                  <View
                    style={{
                      width: 24,
                      height: 20,
                      backgroundColor: 'white',
                      borderRadius: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: 'black', fontSize: 10 }}>29+</Text>
                  </View>
                </Animatable.View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: Dimensions.get('screen').width,
              height: 100,
              alignItems: 'center',
              justifyContent: 'space-around',
              marginLeft: 20,
              marginRight: 10,
              position: 'absolute',
              top: 125,
            }}>
            <View>
              <TouchableOpacity style={styles.btnCall}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/phonecall.png')}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 200,
                  backgroundColor: '#ffbf00',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}>
                <Text
                  style={{ color: 'white', alignSelf: 'center', fontSize: 10 }}>
                  15
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity style={styles.btnMiddle}>
                <Image
                  source={require('../../../assets/images/lady.jpg')}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 200,
                    borderColor: '#ffbf00',
                    borderWidth: 2,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 200,
                  backgroundColor: '#ffbf00',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: 150,
                  right: -10,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/camera.png')}
                  style={{ height: 35, width: 35, tintColor: 'white' }}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity style={styles.btnCall}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/video.png')}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 200,
                  backgroundColor: '#ffbf00',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}>
                <Text
                  style={{ color: 'white', alignSelf: 'center', fontSize: 10 }}>
                  9
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 130,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                Laura Amber Raquel
              </Text>
              <TouchableOpacity
                style={{
                  height: 8,
                  width: 8,
                  borderRadius: 200,
                  backgroundColor: '#ffbf00',
                  alignSelf: 'center',
                  marginLeft: 5,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image
                source={require('../../../assets/icons/whtasappicon/phone.png')}
                style={{ height: 25, width: 25, tintColor: '#ffbf00' }}
              />
              <Divider
                style={{
                  width: 1,
                  height: '100%',
                  backgroundColor: '#d7d7d7',
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginLeft: 10,
                  color: '#ffbf00',
                }}>
                +234 9083738736
              </Text>
            </View>

            <Divider
              style={{
                width: Dimensions.get('screen').width * 0.85,
                marginTop: 20,
                height: 1,
                backgroundColor: '#d7d7d7',
              }}
            />

            <TouchableOpacity
              style={{
                height: 80,
                width: 80,
                borderRadius: 200,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#ffbf00',
              }}>
              <TouchableOpacity
                style={{
                  width: 72,
                  height: 72,
                  backgroundColor: '#ffbf00',
                  borderRadius: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/status.png')}
                  style={{ height: 40, width: 40, tintColor: 'white' }}
                />
              </TouchableOpacity>
            </TouchableOpacity>

            <Divider
              style={{
                width: Dimensions.get('screen').width * 0.85,
                marginTop: 10,
                height: 0.5,
                backgroundColor: '#d7d7d7',
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft: 20,
              }}>
              <TouchableOpacity
                style={{
                  width: 45,
                  height: 45,
                  backgroundColor: '#ffbf00',
                  borderRadius: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/image.png')}
                  style={{ height: 30, width: 30, tintColor: 'white' }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#d3d3d3',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                PHOTOS
              </Text>

              <FlatList
                style={{ flex: 1 }}
                data={photosdatalist}
                renderItem={({ item, index }) => {
                  return (
                    // implemented with Text and Button as children
                    <TouchableOpacity
                      style={{
                        width: 60,
                        height: 60,
                        marginRight: 10,
                        backgroundColor: '#71c55d',
                        borderRadius: 200,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={item.image}
                        style={{ height: 60, width: 60, borderRadius: 200 }}
                      />
                    </TouchableOpacity>
                  );
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}></FlatList>
            </View>

            <Divider
              style={{
                width: Dimensions.get('screen').width * 0.85,
                marginTop: 20,
                height: 0.5,
                backgroundColor: '#d7d7d7',
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 40,
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft: 20,
              }}>
              <TouchableOpacity
                style={{
                  width: 45,
                  height: 45,
                  backgroundColor: '#ffbf00',
                  borderRadius: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/icons/whtasappicon/video.png')}
                  style={{ height: 30, width: 30, tintColor: 'white' }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#d3d3d3',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                VIDEOS
              </Text>

              <FlatList
                style={{ flex: 1 }}
                data={photosdatalist}
                renderItem={({ item, index }) => {
                  return (
                    // implemented with Text and Button as children
                    <TouchableOpacity
                      style={{
                        width: 60,
                        height: 60,
                        marginRight: 10,
                        backgroundColor: '#71c55d',
                        borderRadius: 200,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={{ alignItems: 'center' }}>
                        <Image
                          source={item.image}
                          style={styles.fullImageVideo}
                        />

                        <View
                          style={[
                            styles.overlayVideo,
                            { width: '100%', height: '100%' },
                          ]}>
                          <Image
                            source={require('../../../assets/icons/whtasappicon/playsingle.png')}
                            style={{
                              height: 15,
                              width: 15,
                              tintColor: 'white',
                              backgroundColor: '#71c55d',
                              borderRadius: 200,
                            }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}></FlatList>
            </View>
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
  fullImage: {
    flex: 1,
    height: 180,
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  // Flex to fill, position absolute,
  // Fixed left/top, and the width set to the window width
  overlay: {
    flex: 1,
    position: 'absolute',
    opacity: 0.45,
    backgroundColor: '#ffbf00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCall: {
    backgroundColor: 'white',
    borderRadius: 200,
    height: 50,
    borderColor: '#ffbf00',
    borderWidth: 1,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    tintColor: '#ffbf00',
    height: 25,
    width: 25,
  },
  btnMiddle: {
    backgroundColor: 'white',
    borderRadius: 200,
    height: 180,
    borderColor: '#ffbf00',
    borderWidth: 2,
    width: 180,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImageVideo: {
    borderRadius: 200,
    height: 60,
    width: 60,
  },

  overlayVideo: {
    flex: 1,
    opacity: 0.7,
    position: 'absolute',
    justifyContent: 'center',
    borderRadius: 200,
    alignItems: 'center',
  },
});

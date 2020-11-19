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
  FlatList,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar, Icon, Divider } from 'react-native-elements';
import myStoryDataList from '../../data/myStoryDataList';

/**
This is the logged in user's status screen. This is where the logged in user can add/delete update their status/story
**/

export default class StatusScreen extends Component {
  gotoMyStoryViewer = (storyimage, userimage, viewcount) => {
    this.props.navigation.navigate('StoriesViewer', {
      userimage: userimage,
      storyimage: storyimage,
      storycount: 1,
      viewer: 'my',
      viewcount: viewcount,
    });
  };

  render() {
    const userimage = require('../../../assets/images/lady.jpg');
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
            Your Stories
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

        {/* STORIES BODY*/}
        <FlatList
          style={{ width: Dimensions.get('screen').width * 0.9, flex: 1 }}
          data={myStoryDataList}
          renderItem={({ item, index }) => {
            return (
              // implemented with Text and Button as children
              <TouchableOpacity
                onPress={() =>
                  this.gotoMyStoryViewer(
                    item.storyimage,
                    userimage,
                    item.viewcount,
                  )
                }>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <View style={{ marginRight: 5 }}>
                    <Avatar
                      rounded
                      source={item.storyimage[0]}
                      size="large"
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 200,
                        borderWidth: 2,
                        borderColor: '#ffbf0f',
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 10,
                      width: '50%',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {item.timepublished}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: -20,
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      style={{
                        height: 20,
                        width: 20,
                        elevation: 2,
                        borderRadius: 200,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../../assets/icons/whtasappicon/eye.png')}
                        style={{ height: 15, width: 15, tintColor: 'gray' }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        height: 20,
                        width: 20,
                        marginLeft: 5,
                        elevation: 2,
                        borderRadius: 200,
                        backgroundColor: '#ffbf0f',
                        borderWidth: 1,
                        borderColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          alignSelf: 'center',
                          fontSize: 10,
                          alignSelf: 'center',
                          textAlign: 'center',
                        }}>
                        {item.viewcount}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Divider
                  style={{ marginTop: 10, backgroundColor: '#d7d7d7' }}
                />
              </TouchableOpacity>
            );
          }}
          vertical={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}></FlatList>

        {/* END STORIES BODY*/}

        <TouchableOpacity style={styles.btnCall}>
          <Image
            source={require('../../../assets/icons/whtasappicon/plus.png')}
            style={styles.iconForward}
          />
        </TouchableOpacity>
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
  btnCall: {
    backgroundColor: '#ffbf0f',
    borderRadius: 200,
    height: 50,
    alignSelf: 'flex-end',
    marginRight: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 0,
  },
  iconForward: {
    tintColor: 'white',
    height: 30,
    width: 30,
  },
});

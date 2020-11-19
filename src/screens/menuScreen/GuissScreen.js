import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { firebase } from '../../Core/firebase/config';

import VideoPlayer from 'expo-video-player';

import Antdesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MertialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AppStyles from '../../AppStyles';

//Global Veribales
const MAINCOLOR = '#fce703';
// const VIDEONAME = Date.now();
const WIDTH = Dimensions.get('window').width;

export default class GuissScreen extends Component {
  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      headerTitle: 'Guiss',
      headerStyle: {
        backgroundColor: 'black',
        borderBottomColor: 'black',
      },
      headerTintColor: '#DDB937',
    };
  };

  state = {
    video: null,
    videoSelected: false,
    uploading: false,
    videosLink: [],
    time: '',
  };

  componentDidMount() {
    const allVideos = firebase.database().ref('Videos');
    allVideos.on('value', (datasnap) => {
      //console.log(Object.values(datasnap.val()))
      this.setState({ videosLink: Object.values(datasnap.val()) });
      console.log(this.state.videosLink);
    });
  }
  converDate = (item) => {
    this.setState({ time: item.toDateString() });
    return this.state.time;
  };

  render() {
    // let { video } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar></StatusBar>
        <View style={styles.mainLabelContainer}>
          <Text style={styles.mainLabel}>See</Text>
        </View>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}>
          {this.state.videosLink.map((item, index) => (
            <View
              key={item.time}
              style={{ margin: 25, borderRadius: 10, overflow: 'hidden' }}>
              {/* <Video
            source={{ uri: item.path }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="stretch"
            shouldPlay={false}
            usePoster
            useNativeControls={true}
            progressUpdateIntervalMillis={500}
            positionMillis={0}
            style={{ width: 300, height: 300, elevation: 5, borderRadius: 10 }}
          /> */}

              <View style={styles.videoUploader}>
                <Image
                  source={require('../../../assets/icons/send.png')}
                  style={styles.senderImage}></Image>
                <Text style={styles.SenderName}>ABCDEF</Text>
                <Text style={styles.uploadedText}>uploaded a video</Text>
                <Entypo
                  name="dots-three-horizontal"
                  size={24}
                  color={'#a87b32'}
                  style={{ position: 'absolute', right: 1 }}></Entypo>
              </View>

              <VideoPlayer
                videoProps={{
                  //resizeMode: Video.RESIZE_MODE_CONTAIN,
                  resizeMode: 'stretch',
                  source: {
                    uri: item.path,
                  },
                }}
                height={250}
                width={WIDTH - 30}
                showFullscreenButton={false}
              />
              <View style={styles.videoIcons}>
                <TouchableOpacity>
                  <Antdesign
                    name="hearto"
                    size={24}
                    color={MAINCOLOR}></Antdesign>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Fontisto
                    name="comment"
                    size={24}
                    color={MAINCOLOR}></Fontisto>
                </TouchableOpacity>
                <TouchableOpacity>
                  <MertialIcons
                    name="share-outline"
                    size={24}
                    color={MAINCOLOR}></MertialIcons>
                </TouchableOpacity>
                <Text style={{ color: MAINCOLOR }}>
                  {new Date(item.time).toDateString()}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  videoIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  videoUploader: {
    flexDirection: 'row',

    margin: 15,
    marginTop: 0,
  },
  senderImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  SenderName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: MAINCOLOR,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  uploadedText: {
    color: '#a87b32',
    marginLeft: 10,
    fontSize: 14,
    marginTop: 10,
  },
  mainLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: MAINCOLOR,
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 0,
  },
  mainLabelContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
});

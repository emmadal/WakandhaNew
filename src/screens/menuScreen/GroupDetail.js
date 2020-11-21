import React, { Component, createRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  TextInput,
  Modal,
  TouchableHighlight,
  ImageBackground,
  FlatList,
} from 'react-native';

import styles from './styles';

import AppStyles from '../../AppStyles';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import GroupAttendees from '../../components/Groups/GroupAttendees';

class GroupDetail extends Component {
  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      headerTitle: navigation.getParam('group').name,
      headerStyle: {
        backgroundColor: 'black',
        borderBottomColor: 'black',
      },
      headerTintColor: '#DDB937',
      headerLeft: null,
    };
  };

  constructor(props) {
    super();
    this.state = {
      group: props.navigation.getParam('group'),
      data: [1, 2, 3, 4, 5],
      buttons: ['Watch Party', 'About', 'Photos', 'Posts', 'Videos'],
    };
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 8,
          paddingHorizontal: 20,
          borderRadius: 30,
          backgroundColor: '#2B2B2B',
          marginHorizontal: 5,
        }}>
        <Text style={{ color: 'white' }}>{item}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const { group, data, buttons } = this.state;
    return (
      <View style={styles.pageContainer}>
        <ImageBackground
          style={{ width: WIDTH, height: 200, marginTop: -10, zIndex: 1 }}
          source={{ uri: group.image }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              backgroundColor: '#FFFAFA',
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              marginLeft: 20,
            }}>
            <AntDesign name={'arrowleft'} size={15} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              position: 'absolute',
              backgroundColor: '#FFFAFA',
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              top: 30,
              right: 20,
            }}>
            <Entypo name={'dots-three-horizontal'} size={15} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              position: 'absolute',
              backgroundColor: '#FFFAFA',
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              top: 30,
              right: 60,
            }}>
            <AntDesign name={'search1'} size={15} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 20,
              bottom: 20,
              backgroundColor: 'black',
              height: 30,
              width: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo size={16} name={'camera'} color={'white'} />
          </TouchableOpacity>
        </ImageBackground>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text style={{ color: '#DDB937', fontSize: 17, fontWeight: '700' }}>
            Save the child
          </Text>
          <AntDesign
            name={'right'}
            color={'grey'}
            size={18}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          <Text
            style={{
              color: '#DDB937',
              fontSize: 17,
            }}>{`${group.privacy} group. 1500 Member`}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <View style={{ flex: 4 }}>
            <GroupAttendees data={data} />
          </View>
          <View
            style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 40,
                backgroundColor: '#DDB937',
              }}>
              <Text style={{ color: 'black', fontSize: 12, fontWeight: '600' }}>
                +Invite
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <FlatList
            horizontal={true}
            data={buttons}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

export default GroupDetail;

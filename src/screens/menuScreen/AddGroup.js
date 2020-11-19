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
  StyleSheet,
} from 'react-native';
import { connect, ReactReduxContext } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AppStyles from '../../AppStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { firebase } from '../../Core/firebase/config';
import ActionSheet from 'react-native-actions-sheet';
import styles from './styles';
import TNActivityIndicator from '../../Core/truly-native/TNActivityIndicator';

const actionSheetRef = createRef();
const mainYellowColor = '#DDB937';
class AddGroup extends Component {
  static contextType = ReactReduxContext;

  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      headerTitle: 'Créer un groupe',
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: '#DDB937',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      privacy: '',
      groupName: '',
      selected: '',
    };
  }
  showActionSheet = () => {
    actionSheetRef.current.setModalVisible();
  };
  hideActionSheet = () => {
    actionSheetRef.current.setModalVisible(false);
  };

  setPublic = () => {
    let privacy = 'public';
    if (this.state.privacy == 'public') {
      privacy = '';
    }
    this.setState({ privacy: privacy });
  };
  setPrivate = () => {
    let privacy = 'private';
    if (this.state.privacy == 'private') {
      privacy = '';
    }
    this.setState({ privacy: privacy });
  };

  setSecret = () => {
    let privacy = 'secret';
    if (this.state.privacy == 'secret') {
      privacy = '';
    }
    this.setState({ privacy: privacy });
  };
  createGroup = async () => {
    const { groupName, privacy } = this.state;
    const { userID } = this.props.user;

    if (groupName == '' || privacy == '') {
      alert('Please enter group name and select privacy');
    } else {
      this.setState({ isLoading: true });
      let newGeneratedId = Date.now() + userID;
      let group = {
        name: groupName,
        privacy: privacy,
        groupId: newGeneratedId,
        createdBy: userID,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      let groupRef = await firebase.firestore().collection('groups').add(group);
      let groupParticipation = {
        id: groupRef.id,
        group: newGeneratedId,
        user: userID,
      };
      firebase
        .firestore()
        .collection('group_participation')
        .add(groupParticipation)
        .then(() => {
          this.setState({ isLoading: false });
          this.props.navigation.goBack();
        })
        .catch((e) => {
          this.setState({ isLoading: false });
          alert(e.toLocaleString());
        });
    }
  };

  render() {
    const { groupName, isLoading, privacy, selected } = this.state;

    const mainYellowColor = '#DDB937';

    const textInputProps = {
      autoFocus: true,
      placeholderTextColor: mainYellowColor,
      fontSize: 15,
      labelTextStyle: { fontSize: 15 },
      textColor: mainYellowColor,
      baseColor: mainYellowColor,
      maxLength: 20,
    };

    const viewStyle = {
      alignSelf: 'center',
      width: Dimensions.get('window').width - 40,
      borderColor: mainYellowColor,
      borderRadius: 8,
      borderWidth: 1,
      marginTop: 20,
    };

    return (
      <View style={styles.pageContainer}>
        {isLoading && <TNActivityIndicator />}
        <View
          style={[viewStyle, { paddingHorizontal: 12, paddingVertical: 25 }]}>
          <TextInput
            {...textInputProps}
            placeholder={'Nom de groupe'}
            value={groupName}
            onChangeText={(text) => this.setState({ groupName: text })}
            style={{ color: mainYellowColor }}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.showActionSheet()}
          activeOpacity={1.0}
          style={[
            viewStyle,
            {
              paddingHorizontal: 12,
              paddingVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}>
          <View style={customStyles.earthView}>
            <Fontisto color={'white'} name={'earth'} size={30} />
          </View>
          {privacy == '' && (
            <Text style={{ color: 'grey', fontSize: 17, marginLeft: 12 }}>
              Privacy
            </Text>
          )}
          {privacy !== '' && (
            <View style={{ marginLeft: 12 }}>
              <Text style={{ color: 'grey', fontSize: 14 }}>Privacy</Text>
              <Text
                style={{ color: mainYellowColor, fontSize: 16, marginTop: 8 }}>
                {privacy}
              </Text>
            </View>
          )}
          <AntDesign
            color={mainYellowColor}
            name={'caretdown'}
            size={22}
            style={{ position: 'absolute', right: 25 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isLoading}
          onPress={() => {
            this.createGroup();
          }}
          style={customStyles.createButtonStyle}>
          <Text>Créer</Text>
        </TouchableOpacity>
        <ActionSheet
          ref={actionSheetRef}
          keyboardShouldPersistTaps={'always'}
          closeOnPressBack={true}>
          <View style={{ backgroundColor: 'black' }}>
            <View
              style={{
                flexDirection: 'row',
                height: 80,
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.hideActionSheet();
                }}
                activeOpacity={1}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  marginLeft: 22,
                }}>
                <Entypo name={'cross'} color={mainYellowColor} size={30} />
              </TouchableOpacity>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    color: mainYellowColor,
                    fontSize: 17,
                    fontWeight: '600',
                  }}>
                  Choose Privacy
                </Text>
              </View>
              <TouchableOpacity
                style={{ flex: 1, paddingHorizontal: 12 }}
                activeOpacity={1}
                onPress={() => this.hideActionSheet()}
                disabled={privacy == '' ? true : false}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginRight: 22,
                  }}>
                  <Text
                    style={{
                      color: privacy == '' ? 'grey' : mainYellowColor,
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    Done
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 30,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: mainYellowColor,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Fontisto color={'white'} name={'earth'} size={30} />
              </View>
              <View style={{ width: '70%' }}>
                <Text
                  style={{
                    color: mainYellowColor,
                    fontSize: 18,
                    fontWeight: '600',
                    marginLeft: 12,
                  }}>
                  Public
                </Text>
                <Text style={{ color: 'grey', marginLeft: 12, marginTop: 4 }}>
                  Anyone can see who's in the group and what they post
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  this.setPublic();
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 12.5,
                    borderWidth: 1,
                    borderColor: mainYellowColor,
                    marginLeft: 4,
                    backgroundColor:
                      privacy == 'public' ? mainYellowColor : 'black',
                  }}></View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: 'row',
                marginBottom: 35,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: mainYellowColor,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Entypo color={'white'} name={'lock'} size={30} />
              </View>
              <View style={{ width: '70%' }}>
                <Text
                  style={{
                    color: mainYellowColor,
                    fontSize: 18,
                    fontWeight: '600',
                    marginLeft: 12,
                  }}>
                  Private
                </Text>
                <Text style={{ color: 'grey', marginLeft: 12, marginTop: 4 }}>
                  Only members can see who's in the group and what they post
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  this.setPrivate();
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 12.5,
                    borderWidth: 1,
                    borderColor: mainYellowColor,
                    marginLeft: 4,
                    backgroundColor:
                      privacy == 'private' ? mainYellowColor : 'black',
                  }}></View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                marginBottom: 30,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: mainYellowColor,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Entypo color={'white'} name={'lock'} size={30} />
              </View>
              <View style={{ width: '70%' }}>
                <Text
                  style={{
                    color: mainYellowColor,
                    fontSize: 18,
                    fontWeight: '600',
                    marginLeft: 12,
                  }}>
                  Secret
                </Text>
                <Text style={{ color: 'grey', marginLeft: 12, marginTop: 4 }}>
                  Only members can see who's in the group and what they post
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={2}
                onPress={() => {
                  this.setSecret();
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 12.5,
                    borderWidth: 1,
                    borderColor: mainYellowColor,
                    marginLeft: 4,
                    backgroundColor:
                      privacy == 'secret' ? mainYellowColor : 'black',
                  }}></View>
              </TouchableOpacity>
            </View>
          </View>
        </ActionSheet>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  earthView: {
    width: 50,
    height: 50,
    backgroundColor: mainYellowColor,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonStyle: {
    position: 'absolute',
    bottom: 30,
    height: 50,
    width: Dimensions.get('window').width - 40,
    borderRadius: 150,
    backgroundColor: '#DDB937',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
});

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {})(AddGroup);

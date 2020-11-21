import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { connect, ReactReduxContext } from 'react-redux';

import AppStyles from '../../AppStyles';

import { firebase } from '../../Core/firebase/config';

import styles from './styles';

class NewGroupScreen extends Component {
  static contextType = ReactReduxContext;

  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      headerTitle: 'mes groupes',
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
      loading: true,
      groupParticipation: [],
      groups: [],
    };
    this.groupParticipationRef = firebase
      .firestore()
      .collection('group_participation')
      .where('user', '==', this.props.user.userID);
    this.groupParticipationUnsubscribe = null;

    this.groupsRef = firebase.firestore().collection('groups');
    this.groupsUnsubscribe = null;
  }

  componentDidMount() {
    this.groupParticipationUnsubscribe = this.groupParticipationRef.onSnapshot(
      this.onGroupParticipationCollectionUpdate,
    );
  }
  componentWillUnmount() {
    this.groupsUnsubscribe = null;
    this.groupParticipationUnsubscribe;
  }

  setFetching = (loading) => {
    this.setState({ loading });
  };
  onGroupParticipationCollectionUpdate = (querySnapshot) => {
    this.setFetching(true);
    let groupIds = [];
    querySnapshot.forEach((doc) => {
      groupIds.push(doc.data().group);
    });
    if (groupIds.length > 0) {
      this.groupsUnsubscribe = this.groupsRef
        .where('groupId', 'in', groupIds)
        // .orderBy('createdAt', 'desc')
        .onSnapshot(this.onGroupCollectionUpdate);
    } else {
      this.setFetching(false);
    }
  };

  onGroupCollectionUpdate = (querySnapshot) => {
    const groups = [];

    querySnapshot.forEach((doc) => {
      let group = doc.data();
      group.id = doc.id;

      groups.push(group);
    });
    this.setState({ groups: groups });
    this.setFetching(false);
  };

  renderGroupItem = ({ item }) => {
    let name = item.name;
    let defaultImage =
      'http://www.adamsdavis.com/wp-content/uploads/2013/05/placeholder.png';
    let uri = item.image ? item.image : defaultImage;
    return (
      <TouchableOpacity
        onLongPress={() => {}}
        //Here is the trick
        activeOpacity={0.6}
        onPress={() => {
          item.image = defaultImage;
          this.props.navigation.navigate('GroupDetail', { group: item });
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            padding: 10,
          }}>
          <Image
            source={{ uri: uri }}
            style={{ width: 60, height: 60, borderRadius: 14 }}
            resizeMethod="scale"
            resizeMode={'contain'}
          />
          <View style={{ flex: 1, marginLeft: 20, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '700', color: '#DDB937', fontSize: 18 }}>
              {name}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: '#b1b1b1',
            borderBottomWidth: 0.5,
            marginTop: 5,
          }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { loading, groups } = this.state;

    const mainYellowColor = '#DDB937';

    return (
      <View style={styles.pageContainer}>
        {loading && (
          <ActivityIndicator
            size={'small'}
            color={mainYellowColor}
            style={{ marginTop: 30, zIndex: 2 }}
          />
        )}
        {!loading && (
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item.id}`}
            data={groups}
            renderItem={this.renderGroupItem}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddGroup');
          }}
          style={styles.buttonNewPage}>
          <Image
            style={[styles.imageNewPage]}
            source={AppStyles.iconSet.plus}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {})(NewGroupScreen);

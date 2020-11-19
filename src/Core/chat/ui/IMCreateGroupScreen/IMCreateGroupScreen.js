import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import TextButton from 'react-native-button';
import { connect } from 'react-redux';

import { IMCreateGroupComponent } from '../..';
import { channelManager } from '../../firebase';
import { IMLocalized } from '../../../localization/IMLocalization';
import AppStyles from '../../../../AppStyles';

class IMCreateGroupScreen extends Component {
  static navigationOptions = ({ screenProps, navigation }) => {
    let appStyles = navigation.state.params.appStyles;
    let currentTheme = appStyles.navThemeConstants[screenProps.theme];
    const { params = {} } = navigation.state;

    return {
      headerTitle: IMLocalized('Choisir des amis'),
      headerRight:
        params.onCreate != null ? (
          <TextButton
            style={{ marginHorizontal: 7 }}
            textStyle={{ color: '#DDB937' }}
            onPress={params.onCreate}>
            {IMLocalized('Créer')}
          </TextButton>
        ) : null,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerTintColor: '#DDB937',
    };
  };

  constructor(props) {
    super(props);
    this.appStyles = this.props.navigation.getParam('appStyles');
    this.state = {
      friends: this.props.friends,
      isNameDialogVisible: false,
      groupName: '',
    };
    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onCreate: this.props.friends.length > 1 ? this.onCreate : null,
    });

    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      (payload) =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  onCreate = () => {
    const checkedFriends = this.state.friends.filter(
      (friend) => friend.checked,
    );

    if (checkedFriends.length > 1) {
      this.setState({ isNameDialogVisible: true });
    } else if (checkedFriends.length === 1) {
      const viewer = this.props.user;
      const otherUser = checkedFriends[0];

      const viewerID = viewer.id || viewer.userID;
      const friendID = otherUser.id || otherUser.userID;

      let channel = {
        id: viewerID < friendID ? viewerID + friendID : friendID + viewerID,
        participants: [otherUser],
      };

      this.props.navigation.navigate('PersonalChat', {
        channel,
        appStyles: AppStyles,
      });
    }
  };

  onCheck = (friend) => {
    friend.checked = !friend.checked;
    const newFriends = this.state.friends.map((item) => {
      if (item.id === friend.id) {
        return friend;
      }
      return item;
    });
    this.setState({ friends: newFriends });
  };

  onCancel = () => {
    this.setState({
      groupName: '',
      isNameDialogVisible: false,
      friends: this.props.friends,
    });
  };

  onSubmitName = async (name) => {
    const { navigation, user } = this.props;
    const { friends } = this.state;

    const participants = friends.filter((friend) => friend.checked);

    const response = await channelManager.createChannel(
      user,
      participants,
      name,
    );

    if (response.success) {
      this.onCancel();
      navigation.goBack();
    }
  };

  onEmptyStatePress = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { isNameDialogVisible, friends } = this.state;

    return (
      <IMCreateGroupComponent
        onCancel={this.onCancel}
        isNameDialogVisible={isNameDialogVisible}
        friends={friends}
        onSubmitName={this.onSubmitName}
        onCheck={this.onCheck}
        appStyles={this.appStyles}
        onEmptyStatePress={this.onEmptyStatePress}
      />
    );
  }
}

IMCreateGroupScreen.propTypes = {
  friends: PropTypes.array,
  user: PropTypes.object,
};

const mapStateToProps = ({ friends, auth }) => {
  return {
    friends: friends.friends,
    user: auth.user,
  };
};

export default connect(mapStateToProps)(IMCreateGroupScreen);

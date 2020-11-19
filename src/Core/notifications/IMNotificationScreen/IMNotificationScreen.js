import React, { PureComponent } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';

import MainHeader from '../../../navigators/mainHeader';
import IMNotification from '../Notification/IMNotification';
import { firebaseNotification } from '../../notifications';
import { firebasePost } from '../../socialgraph/feed/firebase';
import { setNotifications } from '../redux';
import AppStyles from '../../../AppStyles';

class IMNotificationScreen extends PureComponent {
  static navigationOptions = ({ screenProps, navigation }) => {
    const { params = {} } = navigation.state;

    return MainHeader({ navigation, params });
  };

  constructor(props) {
    super(props);

    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );

    this.lastScreenTitle = this.props.navigation.getParam('lastScreenTitle');
    if (!this.lastScreenTitle) {
      this.lastScreenTitle = 'Profile';
    }
    this.appStyles = AppStyles;
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      (payload) =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
    this.notificationUnsubscribe = firebaseNotification.subscribeNotifications(
      this.props.user.id,
      this.onNotificationCollection,
    );
  }

  componentWillUnmount() {
    this.notificationUnsubscribe();
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  onNotificationCollection = (notifications) => {
    this.props.setNotifications(notifications);
  };

  onNotificationPress = async (notification) => {
    const res = await firebasePost.getPost(notification.id);

    console.log(notification.metadata.outBound);

    firebaseNotification.updateNotification({
      ...notification,
      seen: true,
    });

    if (res.error) {
      alert(res.error);
    }

    if (res.success) {
      this.props.navigation.navigate('ProfileDetailPostProfile', {
        user: notification.metadata.outBound,
        stackKeyTitle: 'ProfileDetailPostProfile',
        lastScreenTitle: 'ProfileNotification',
      });
    }
  };

  render() {
    return (
      <IMNotification
        onNotificationPress={this.onNotificationPress}
        notifications={this.props.notifications}
        appStyles={AppStyles}
      />
    );
  }
}

IMNotificationScreen.propTypes = {};

const mapStateToProps = ({ notifications, auth }) => {
  return {
    user: auth.user,
    notifications: notifications.notifications,
  };
};

export default connect(mapStateToProps, { setNotifications })(
  IMNotificationScreen,
);

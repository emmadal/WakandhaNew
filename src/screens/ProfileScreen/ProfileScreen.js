import React, { Component } from 'react';
import { Platform, BackHandler, Share } from 'react-native';
import { connect, ReactReduxContext } from 'react-redux';

import { firebaseUser } from '../../Core/firebase';

import { Profile } from '../../components';
import * as firebaseFriendship from '../../Core/socialgraph/friendships/firebase/friendship';
import { firebaseStorage } from '../../Core/firebase/storage';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { setUserData } from '../../Core/onboarding/redux/auth';
import SocialNetworkConfig from '../../SocialNetworkConfig';
import { reportingManager } from '../../Core/user-reporting';
import { FriendshipConstants } from '../../Core/socialgraph/friendships';
import {
  firebasePost,
  firebaseComment,
} from '../../Core/socialgraph/feed/firebase';
import FriendshipManager from '../../Core/socialgraph/friendships/firebase/friendshipManager';
import FeedManager from '../../Core/socialgraph/feed/FeedManager';

import AppStyles from '../../AppStyles';
import {
  updateAllPostAuthorByUserId,
  updateUserData,
} from '../../Core/firebase/user';

const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';

class ProfileScreen extends Component {
  static contextType = ReactReduxContext;

  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      headerTitle: IMLocalized('Profil'),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: '#DDB937',
    };
  };

  constructor(props) {
    super(props);

    this.otherUser = this.props.navigation.getParam('user');

    const shouldAddFriend = this.otherUser
      ? !this.props.friends.find((friend) => friend.id === this.otherUser.id)
      : false;

    this.state = {
      profilePosts: null,
      isCameraOpen: false,
      isMediaViewerOpen: false,
      selectedFeedItems: [],
      friends: [],
      loading: true,
      userFeed: [],
      uploadProgress: 0,
      shouldAddFriend,
      isFetching: false,
      selectedMediaIndex: null,
    };

    this.isFetching = false;
    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) => {
        this.willBlur = false;
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        );
      },
    );

    this.willBlur = false;
    this.lastVisibleFeed = null;
    this.feedBatchLimit = 15;
    this.fetchCallCount = 0;
    this.stackKeyTitle = 'Profile';
    const keyTitle = this.props.navigation.getParam('stackKeyTitle');
    if (keyTitle) {
      this.stackKeyTitle = keyTitle;
    }
    this.ProfileSettingsTitle = 'ProfileProfileSettings';
    this.lastScreenTitle = this.props.navigation.getParam('lastScreenTitle');
    if (this.lastScreenTitle) {
      this.ProfileSettingsTitle = this.lastScreenTitle + 'ProfileSettings';
    } else {
      this.lastScreenTitle = 'Profile';
    }
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      (payload) => {
        this.willBlur = true;
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        );
      },
    );

    this.props.navigation.setParams({
      openDrawer: this.openDrawer,
      otherUser: this.otherUser,
      navigateNotifi: this.navigateNotifi,
    });

    this.feedManager = new FeedManager(this.context.store, this.props.user.id);
    this.feedManager.subscribeIfNeeded();

    this.friendshipManager = new FriendshipManager(
      this.props.users,
      false,
      this.onFriendshipsRetrieved,
    );
    if (this.otherUser && this.otherUser.id != this.props.user.id) {
      let profileUserID = this.otherUser.id;
      this.currentProfileFeedUnsubscribe = firebasePost.subscribeToProfileFeedPosts(
        profileUserID,
        this.onProfileFeedUpdate,
      );
      this.currentUserUnsubscribe = firebaseUser.subscribeCurrentUser(
        profileUserID,
        this.onCurrentUserUpdate,
      );
      this.setState({
        loading: true,
      });
      this.friendshipManager.fetchFriendships(this.otherUser.id);
    } else {
      this.currentProfileFeedUnsubscribe = firebasePost.subscribeToProfileFeedPosts(
        this.props.user.id,
        this.onProfileFeedUpdate,
      );
      this.currentUserUnsubscribe = firebaseUser.subscribeCurrentUser(
        this.props.user.id,
        this.onCurrentUserUpdate,
      );
      this.friendshipManager.fetchFriendships(this.props.user.id);
      this.setState({
        profilePosts: this.feedManager.hydratePostsWithReduxReactions(
          this.props.currentUserFeedPosts,
        ),
        loading: true,
      });
    }
  }

  componentWillUnmount() {
    this.willBlur = true;
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
    this.currentProfileFeedUnsubscribe && this.currentProfileFeedUnsubscribe();
    this.currentUserUnsubscribe && this.currentUserUnsubscribe();
    this.friendshipManager && this.friendshipManager.unsubscribe();
  }

  onCurrentUserUpdate = (user) => {};

  onFriendshipsRetrieved = (
    mutualFriendships,
    inboundFriendships,
    outboundFriendships,
  ) => {
    this.setState({
      loading: false,
      friends: mutualFriendships.map((friendship) => friendship.user),
    });
  };

  onProfileFeedUpdate = (profilePosts) => {
    this.setState({
      profilePosts: this.feedManager.hydratePostsWithReduxReactions(
        profilePosts,
      ),
      loading: false,
    });
  };

  navigateNotifi = () => {
    this.props.navigation.navigate(this.lastScreenTitle + 'Notification', {
      lastScreenTitle: this.lastScreenTitle,
      appStyles: AppStyles,
    });
  };

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  onMainButtonPress = () => {
    if (this.state.shouldAddFriend) {
      this.onAddFriend();
      return;
    }
    if (this.otherUser) {
      this.onMessage();
      return;
    }
    this.props.navigation.navigate(this.ProfileSettingsTitle, {
      lastScreenTitle: this.lastScreenTitle,
      appStyles: AppStyles,
      appConfig: SocialNetworkConfig,
    });
  };

  onMessage = () => {
    const viewer = this.props.user;
    const otherUser = this.otherUser;

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
  };

  onMediaClose = () => {
    this.setState({ isMediaViewerOpen: false });
  };

  startUpload = async ({ source, isCover }) => {
    const self = this;

    const userToUpdate = this.otherUser?.pageOwnerID
      ? this.otherUser
      : this.props.user;

    if (!userToUpdate?.pageOwnerID) {
      self.props.setUserData({
        user: {
          ...userToUpdate,
          [isCover ? 'coverPictureURL' : 'profilePictureURL']: source,
        },
      });
    }

    const filename =
      new Date() + '-' + source.substring(source.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? source.replace('file://', '') : source;

    firebaseStorage.uploadFileWithProgressTracking(
      filename,
      uploadUri,
      async (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        self.setState({ uploadProgress });
      },
      async (url) => {
        const data = {
          [isCover ? 'coverPictureURL' : 'profilePictureURL']: url,
        };

        if (!userToUpdate?.pageOwnerID) {
          self.props.setUserData({
            user: {
              ...userToUpdate,
              [isCover ? 'coverPictureURL' : 'profilePictureURL']: url,
            },
          });
        }

        firebaseUser.updateUserData(userToUpdate.id, data);
        self.setState({ uploadProgress: 0 });
      },
      (error) => {
        self.setState({ uploadProgress: 0 });
        alert(
          IMLocalized(
            'Oops! An error occured while trying to update your profile picture. Please try again.',
          ),
        );
        console.log(error);
      },
    );
  };

  removePhoto = async () => {
    const self = this;
    const res = await firebaseUser.updateUserData(this.otherUser.id, {
      profilePictureURL: defaultAvatar,
    });
    if (res.success) {
      self.props.setUserData({
        user: { ...this.otherUser, profilePictureURL: defaultAvatar },
      });
    } else {
      alert(
        IMLocalized(
          'Oops! An error occured while trying to remove your profile picture. Please try again.',
        ),
      );
    }
  };

  onAddFriend = () => {
    this.setState({ shouldAddFriend: false });

    const isFollow = this.otherUser?.pageOwnerID;

    firebaseFriendship.addFriendRequest(
      this.props.user,
      this.otherUser,
      true,
      isFollow,
      true,
      ({ success, error }) => {
        if (error) {
          alert(error);
          this.setState({ shouldAddFriend: true });
        } else {
          const newFriendId = this.otherUser.id || this.otherUser.userID;
          const friendships = this.props.friendships;
          const detectedFriendship = friendships.find(
            (friendship) =>
              friendship.user.id === newFriendId &&
              friendship.type === FriendshipConstants.FriendshipType.reciprocal,
          );
          if (detectedFriendship) {
            firebaseFriendship.updateFeedsForNewFriends(
              this.props.user.id,
              newFriendId,
            );
          }
        }
      },
    );
  };

  onEmptyStatePress = () => {
    this.props.navigation.navigate('CreatePost');
  };

  handleOnEndReached = (distanceFromEnd) => {
    if (this.state.isFetching || this.isFetching) {
      return;
    }
    if (this.fetchCallCount > 1) {
      return;
    }
  };

  onReaction = async (reaction, item) => {
    this.feedManager.applyReaction(reaction, item, false);
    firebaseComment.handleReaction(
      reaction,
      this.props.user,
      item,
      false,
      this.props.users,
    );
  };

  onSharePost = async (item) => {
    let url = '';
    if (item.postMedia && item.postMedia.length > 0) {
      url = item.postMedia[0];
    }
    try {
      const result = await Share.share(
        {
          title: 'Share SocialNetwork post.',
          message: item.postText,
          url,
        },
        {
          dialogTitle: 'Share SocialNetwork post.',
        },
      );
    } catch (error) {
      alert(error.message);
    }
  };

  onDeletePost = async (item) => {
    const res = await firebasePost.deletePost(item, true);
    if (res.error) {
      alert(res.error);
    }
  };

  onUserReport = async (item, type) => {
    reportingManager.markAbuse(this.props.user.id, item.authorID, type);
  };

  onFriendItemPress = (item) => {
    if (item.id === this.props.user.id || item.userID === this.props.user.id) {
      this.props.navigation.push(this.stackKeyTitle, {
        stackKeyTitle: this.stackKeyTitle,
      });
    } else {
      this.props.navigation.push(this.stackKeyTitle, {
        user: item,
        stackKeyTitle: this.stackKeyTitle,
      });
    }
  };

  onSubButtonTitlePress = () => {
    this.props.navigation.push(this.lastScreenTitle + 'AllFriends', {
      lastScreenTitle: this.lastScreenTitle,
      title: IMLocalized('Friends'),
      stackKeyTitle: this.stackKeyTitle,
      otherUser: this.otherUser,
      includeReciprocal: true,
      appStyles: AppStyles,
      followEnabled: false,
    });
  };

  onFeedUserItemPress = async (author) => {
    if (this.other && this.other.id === author.id) {
      return;
    }
    if (!this.other) {
      return;
    }
    if (author.id === this.props.user.id) {
      this.props.navigation.navigate('DiscoverProfile', {
        stackKeyTitle: this.stackKeyTitle,
        lastScreenTitle: this.lastScreenTitle,
      });
    } else {
      this.props.navigation.navigate('DiscoverProfile', {
        user: author,
        stackKeyTitle: this.stackKeyTitle,
        lastScreenTitle: this.lastScreenTitle,
      });
    }
  };

  onMediaPress = (media, mediaIndex) => {
    this.setState({
      selectedMediaIndex: mediaIndex,
      selectedFeedItems: media,
      isMediaViewerOpen: true,
    });
  };

  onCommentPress = (item) => {
    this.props.navigation.navigate('ProfilePostDetails', {
      item: item,
      lastScreenTitle: 'Profile',
    });
  };
  /**
   * update user firstName , lastName
   * into user collection
   * @param firstName
   * @param lastName
   */
  updateUsername = ({ firstName, lastName }) => {
    const userId = this.props.user.id;
    updateUserData(userId, { firstName, lastName }).then((e) =>
      updateAllPostAuthorByUserId(userId, { firstName, lastName })
        .then((e) => {
          alert('updated');
        })
        .catch((error) => console.log(error)),
    );
  };

  render() {
    const isPage = this.otherUser?.pageOwnerID;

    let mainButtonTitle = IMLocalized(
      isPage ? 'Paramètres de la page' : 'Paramètres du profil',
    );

    if (this.otherUser) {
      mainButtonTitle = IMLocalized('Envoyer un message');
      if (this.state.shouldAddFriend) {
        mainButtonTitle = IMLocalized(
          isPage ? 'Suivre cette page' : 'Ajouter comme ami',
        );
      }
    }

    const initialCountDisplay = 6;
    const displaySubButton =
      this.state.friends && this.state.friends.length > initialCountDisplay;
    const friends = this.state.friends
      ? this.state.friends.slice(0, initialCountDisplay)
      : null;
    return (
      <Profile
        loading={this.state.loading}
        uploadProgress={this.state.uploadProgress}
        user={this.otherUser || this.props.user}
        loggedInUser={this.props.user}
        mainButtonTitle={mainButtonTitle}
        subButtonTitle={IMLocalized(
          isPage ? 'Voir tout les followers' : 'Voir tout les amis',
        )}
        displaySubButton={displaySubButton}
        friends={friends}
        recentUserFeeds={this.state.profilePosts}
        onFriendItemPress={this.onFriendItemPress}
        onMainButtonPress={this.onMainButtonPress}
        onUserReport={this.onUserReport}
        onSubButtonTitlePress={this.onSubButtonTitlePress}
        onCommentPress={this.onCommentPress}
        onFeedUserItemPress={this.onFeedUserItemPress}
        onReaction={this.onReaction}
        onMediaPress={this.onMediaPress}
        selectedMediaIndex={this.state.selectedMediaIndex}
        isMediaViewerOpen={this.state.isMediaViewerOpen}
        feedItems={this.state.selectedFeedItems}
        onMediaClose={this.onMediaClose}
        removePhoto={this.removePhoto}
        startUpload={this.startUpload}
        handleOnEndReached={this.handleOnEndReached}
        isFetching={this.state.isFetching}
        isOtherUser={
          this.otherUser?.pageOwnerID
            ? this.otherUser?.pageOwnerID !== this.props.user.userID
            : this.otherUser
        }
        isPage={isPage}
        onSharePost={this.onSharePost}
        onDeletePost={this.onDeletePost}
        willBlur={this.state.willBlur}
        onEmptyStatePress={this.onEmptyStatePress}
        onUpdateUserName={this.updateUsername}
      />
    );
  }
}

const mapStateToProps = ({ feed, auth, friends }) => {
  return {
    currentUserFeedPosts: feed.currentUserFeedPosts,
    user: auth.user,
    users: auth.users,
    friends: friends.friends,
    friendships: friends.friendships,
  };
};

export default connect(mapStateToProps, { setUserData })(ProfileScreen);

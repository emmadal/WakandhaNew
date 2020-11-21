import React, { Component } from 'react';
import { Share, View, Text } from 'react-native';
import { connect, ReactReduxContext } from 'react-redux';
import { Feed } from '../../components';
import MainHeader from '../../navigators/mainHeader';

import {
  firebasePost,
  firebaseComment,
} from '../../Core/socialgraph/feed/firebase';
import AppStyles from '../../AppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import FeedManager from '../../Core/socialgraph/feed/FeedManager';

class WatchScreen extends Component {
  static contextType = ReactReduxContext;

  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    const { params = {} } = navigation.state;
    return MainHeader({ navigation, params });
  };

  constructor(props) {
    super(props);
    this.state = {
      isCameraOpen: false,
      isMediaViewerOpen: false,
      selectedFeedItems: [],
      selectedMediaIndex: null,
      isFetching: false,
      willBlur: false,
    };

    this.fetchCallCount = 0;
    this.isFetching = false;
    this.flatlistReady = false;

    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) => {
        this.setState({ willBlur: false });
      },
    );
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      (payload) => {
        this.setState({ willBlur: true });
      },
    );

    this.props.navigation.setParams({
      openDrawer: this.openDrawer,
    });
    this.feedManager = new FeedManager(this.context.store, this.props.user.id);
    this.feedManager.subscribeIfNeeded();
  }

  componentWillUnmount() {
    this.willBlurSubscription && this.willBlurSubscription.remove();
    this.didFocusSubscription && this.didFocusSubscription.remove();
  }

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  onCommentPress = (item) => {
    let copyItem = { ...item };
    this.props.navigation.navigate('DiscoverDetailPost', {
      item: { ...copyItem },
      lastScreenTitle: 'Discover',
    });
  };

  onFeedUserItemPress = async (author) => {
    if (author.id === this.props.user.id) {
      this.props.navigation.navigate('DiscoverProfile', {
        stackKeyTitle: 'DiscoverProfile',
        lastScreenTitle: 'Discover',
      });
    } else {
      this.props.navigation.navigate('DiscoverProfile', {
        user: author,
        stackKeyTitle: 'DiscoverProfile',
        lastScreenTitle: 'Discover',
      });
    }
  };

  onMediaClose = () => {
    this.setState({ isMediaViewerOpen: false });
  };

  onMediaPress = (media, mediaIndex) => {
    this.setState({
      selectedFeedItems: media,
      selectedMediaIndex: mediaIndex,
      isMediaViewerOpen: true,
    });
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

  handleOnEndReached = (distanceFromEnd) => {
    if (!this.flatlistReady) {
      return;
    }

    if (this.state.isFetching || this.isFetching) {
      return;
    }
    if (this.fetchCallCount > 1) {
      return;
    }
  };

  onFeedScroll = () => {
    this.flatlistReady = true;
  };

  render() {
    const emptyStateConfig = {
      title: IMLocalized('Pas encore de vidéo'),
      description: IMLocalized(
        "Il n'y a pas encore de vidéo disponible sur Wakandha, découvrez ici prochainement toutes les vidéos de la communauté.",
      ),
    };

    return (
      <View style={{ flex: 1, backgroundColor: '#09090F', paddingTop: 20 }}>
        <View
          style={{
            borderBottomColor: '#343434',
            borderBottomWidth: 1,
            borderStyle: 'solid',
            paddingBottom: 15,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '700',
              color: '#DDB937',
              paddingHorizontal: 10,
            }}>
            Vidéos
          </Text>
        </View>

        <Feed
          loading={this.props.discoverVideoFeedPosts == null}
          feed={this.props.discoverVideoFeedPosts}
          onFeedUserItemPress={this.onFeedUserItemPress}
          onCommentPress={this.onCommentPress}
          isMediaViewerOpen={this.state.isMediaViewerOpen}
          feedItems={this.state.selectedFeedItems}
          onMediaClose={this.onMediaClose}
          onMediaPress={this.onMediaPress}
          selectedMediaIndex={this.state.selectedMediaIndex}
          handleOnEndReached={this.handleOnEndReached}
          isFetching={this.state.isFetching}
          onReaction={this.onReaction}
          onSharePost={this.onSharePost}
          onDeletePost={this.onDeletePost}
          user={this.props.user}
          onFeedScroll={this.onFeedScroll}
          willBlur={this.state.willBlur}
          emptyStateConfig={emptyStateConfig}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ feed, auth, friends }) => {
  return {
    discoverVideoFeedPosts: feed.discoverVideoFeedPosts,
    user: auth.user,
    users: auth.users,
    friends: friends.friends,
  };
};

export default connect(mapStateToProps)(WatchScreen);

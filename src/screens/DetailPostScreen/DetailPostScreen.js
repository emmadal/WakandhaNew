import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackHandler, Share, Platform } from 'react-native';
import { DetailPost } from '../../components';
import {
  firebaseComment,
  firebasePost,
} from '../../Core/socialgraph/feed/firebase';
import { firebaseStorage } from '../../Core/firebase/storage';

import AppStyles from '../../AppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { reportingManager } from '../../Core/user-reporting';
import { getUsersReactionsPosts } from '../../Core/firebase/reaction';
import {
  addReplayToComment,
  deleteComment,
  updateComment,
} from '../../Core/socialgraph/feed/firebase/comment';

class DetailScreen extends Component {
  static navigationOptions = ({ screenProps, navigation }) => {
    let appStyles = AppStyles;
    let currentTheme = appStyles.navThemeConstants[screenProps.theme];

    return {
      headerTitle: IMLocalized('Publication'),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: '#DDB937',
    };
  };

  constructor(props) {
    super(props);
    this.item = this.props.navigation.getParam('item');
    console.log('post :', this.item);
    this.appStyles = AppStyles;
    this.state = {
      comments: [],
      feedItem: this.item,

      inputValue: '',
      downloadUrl: '',
      uploadProgress: 0,

      selectedMediaIndex: null,
      selectedFeedItems: [],

      commentsLoading: true,
      isMediaViewerOpen: false,
      shouldUpdate: false,
    };

    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );

    this.scrollViewRef = React.createRef();
    this.lastScreenTitle = this.props.navigation.getParam('lastScreenTitle');
    this.ProfileScreenTitle = this.lastScreenTitle + 'Profile';
    this.likedPost = false;
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

    this.unsubscribeSinglePost = firebasePost.subscribeToSinglePost(
      this.item.id,
      this.onFeedItemUpdate,
    );
    this.unsubscribeComments = firebaseComment.subscribeComments(
      this.item.id,
      this.onCommentsUpdate,
    );
    this.setState({ shouldUpdate: true });
  }

  componentWillUnmount() {
    this.unsubscribeComments && this.unsubscribeComments();
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
    this.unsubscribeSinglePost && this.unsubscribeSinglePost();
  }

  onChangeTextInput = (text) => {
    this.setState({
      inputValue: text,
    });
  };

  onAudioRecordSend = (audioRecord) => {
    this.startUpload({ ...audioRecord, source: audioRecord.uri });
  };

  startUpload = (uploadData, data) => {
    const { source, mime } = uploadData;
    const self = this;

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
        if (url) {
          self.setState(
            {
              downloadUrl: { ...uploadData, source: url, uri: url, url, mime },
              uploadProgress: 0,
            },
            () => {
              self.onSendInput({ isAudio: true });
            },
          );
        }
      },
      (error) => {
        self.setState({ uploadProgress: 0 });
        alert(IMLocalized('Oops! An error has occured. Please try again.'));
        console.log(error);
      },
    );
  };

  onFeedItemUpdate = (feedItem) => {
    const myReaction = this.props.myReactions.find(
      (reaction) => reaction.postID === feedItem.id,
    );
    if (myReaction) {
      const finalFeedItem = { ...feedItem, myReaction: myReaction.reaction };
      this.setState({ feedItem: finalFeedItem });
    } else {
      this.setState({ feedItem, myReaction: null });
    }
  };

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  onCommentsUpdate = (comments) => {
    this.postCommentLength = comments.length;
    this.setState({
      comments,
      commentsLoading: false,
    });
  };

  onSendInput = async (isAudio = false) => {
    const { downloadUrl } = this.state;

    const commentObject = {
      postID: this.state.feedItem.id,
      commentText: this.state.inputValue,
      authorID: this.props.user.id,
      audioURL: isAudio ? downloadUrl : null,
    };
    firebaseComment.addComment(
      commentObject,
      this.props.user,
      this.state.feedItem,
      false,
    );

    this.setState({ inputValue: '' });
  };

  onReaction = async (reaction, item) => {
    await firebaseComment.handleReaction(
      reaction,
      this.props.user,
      item,
      false,
      this.props.users,
    );
  };

  onMediaPress = (media, mediaIndex) => {
    this.setState({
      selectedMediaIndex: mediaIndex,
      selectedFeedItems: media,
      isMediaViewerOpen: true,
    });
  };

  onMediaClose = () => {
    this.setState({ isMediaViewerOpen: false });
  };

  onFeedUserItemPress = async (item) => {
    if (item.id === this.props.user.id) {
      this.props.navigation.navigate(this.ProfileScreenTitle, {
        stackKeyTitle: this.ProfileScreenTitle,
        lastScreenTitle: this.lastScreenTitle,
      });
    } else {
      this.props.navigation.navigate(this.ProfileScreenTitle, {
        user: item,
        stackKeyTitle: this.ProfileScreenTitle,
        lastScreenTitle: this.lastScreenTitle,
      });
    }
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
    } else {
      this.props.navigation.goBack();
    }
  };

  onUserReport = async (item, type) => {
    await reportingManager.markAbuse(this.props.user.id, item.authorID, type);
    this.props.navigation.goBack();
  };
  // reactions done (firebase)
  testReactions = () => {
    getUsersReactionsPosts(this.state.feedItem.id).then((e) =>
      console.log('data', e),
    );
  };
  testReplayComment = (parent) => {
    const { downloadUrl } = this.state;
    const commentObject = {
      postID: this.state.feedItem.id,
      commentText: this.state.inputValue,
      authorID: this.props.user.id,
      audioURL: null,
    };
    addReplayToComment(
      parent,
      commentObject,
      this.props.user,
      this.state.feedItem,
      false,
    ).then((e) => console.log(e));

    this.setState({ inputValue: '' });
  };
  /**
   *select all comments where no parentID
   * each parentID = comment.id
   * @param comments
   * @return [{comment  , subComments : [] }]
   */
  formateComments = (comments) => {
    var preparedComments = [];
    const getSubComments = (parentId) => {
      return comments.filter((e) => e.parentId === parentId);
    };
    const commentsWithoutParent = comments.filter((e) => e.parentId == null);
    commentsWithoutParent.forEach((comment) => {
      let data = { comment, subComments: [] };

      data.subComments = getSubComments(comment.id);
      preparedComments.push(data);
    });
    return preparedComments;
  };

  updateCommentHandler = (commentID, value) => {
    const data = { commentText: value };
    updateComment(commentID, data).then();
  };
  deleteCommentHandler = (commentID) => {
    deleteComment(commentID).then();
  };
  render() {
    return (
      <DetailPost
        uploadProgress={this.state.uploadProgress}
        inputValue={this.state.inputValue}
        appStyles={this.appStyles}
        scrollViewRef={this.scrollViewRef}
        feedItem={this.state.feedItem}
        commentItems={this.formateComments(this.state.comments)}
        sendMessage={this.sendMessage}
        onAudioRecordSend={this.onAudioRecordSend}
        onFeedUserItemPress={this.onFeedUserItemPress}
        onMediaPress={this.onMediaPress}
        onSendInput={this.onSendInput}
        onSendRespense={this.testReplayComment}
        feedItems={this.state.selectedFeedItems}
        onMediaClose={this.onMediaClose}
        isMediaViewerOpen={this.state.isMediaViewerOpen}
        selectedMediaIndex={this.state.selectedMediaIndex}
        onReaction={this.onReaction}
        shouldUpdate={this.state.shouldUpdate}
        onChangeTextInput={this.onChangeTextInput}
        onSharePost={this.onSharePost}
        onDeletePost={this.onDeletePost}
        onUserReport={this.onUserReport}
        user={this.props.user}
        commentsLoading={this.state.commentsLoading}
        updateComment={this.updateCommentHandler}
        deleteComment={this.deleteCommentHandler}
      />
    );
  }
}

const mapStateToProps = ({ feed, auth, friends }) => {
  return {
    comments: feed.comments,
    myReactions: feed.feedPostReactions,
    user: auth.user,
    users: auth.users,
    friends: friends.friends,
  };
};

export default connect(mapStateToProps)(DetailScreen);

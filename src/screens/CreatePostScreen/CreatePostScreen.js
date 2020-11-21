import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BackHandler, ActivityIndicator, Alert, View } from 'react-native';
import TextButton from 'react-native-button';
import { connect } from 'react-redux';
import { CreatePost } from '../../components';
import { firebasePost } from '../../Core/socialgraph/feed/firebase';
import { firebaseStorage } from '../../Core/firebase/storage';
import AppStyles from '../../AppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { friendshipUtils } from '../../Core/socialgraph/friendships';
import * as Progress from 'react-native-progress';

const defaultPost = {
  postText: '',
  commentCount: 0,
  reactionsCount: 0,
  reactions: {
    surprised: 0,
    angry: 0,
    sad: 0,
    laugh: 0,
    like: 0,
    cry: 0,
    love: 0,
  },
};

class CreatePostScreen extends Component {
  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    const { params = {} } = navigation.state;

    return {
      headerTitle: 'Nouvelle publication',
      headerRight: params.isPosting ? (
        <ActivityIndicator style={{ margin: 10 }} size="small" />
      ) : (
        <TextButton
          style={{ marginRight: 12, color: '#DDB937' }}
          onPress={params.onPost}>
          Publier
        </TextButton>
      ),
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
      post: defaultPost,
      postMedia: [],
      location: '',
      loader: false,
    };
    this.inputRef = React.createRef();
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
      onPost: this.onPost,
      isPosting: false,
    });

    this.inputRef.current.focus();
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

  onPostDidChange = (post) => {
    this.setState({ post });
  };

  onSetMedia = (photos) => {
    this.setState({ postMedia: [...photos] });
  };

  onLocationDidChange = (location) => {
    this.setState({ location });
  };

  onPost = async () => {
    console.log('hello');
    const self = this;
    const isEmptyPost = self.state.post.postText.trim() === '';

    const postAsUser = this.props.navigation.getParam('postAsUser');
    const postUserData = postAsUser || self.props.user;

    if (self.state.postMedia.length === 0 && isEmptyPost) {
      Alert.alert(
        IMLocalized('Publication non complète'),
        IMLocalized(
          "Nous sommes désolés, vous devez compléter votre publication pour pouvoir l'envoyer.",
        ),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }

    self.props.navigation.setParams({
      isPosting: true,
    });

    self.setState(
      {
        isPosting: true,
        post: {
          ...self.state.post,
          authorID: postUserData.id,
          location: self.state.location,
          postMedia: self.state.postMedia,
        },
      },
      async () => {
        if (
          self.state.post &&
          self.state.post.postMedia &&
          self.state.post.postMedia.length === 0
        ) {
          await firebasePost.addPost(
            self.state.post,
            friendshipUtils.followerIDs(
              this.props.friendships,
              this.props.friends,
              false,
            ),
            postUserData,
          );

          self.props.navigation.goBack();
        } else {
          self.startPostUpload();
        }
      },
    );
  };
  //this is munib job
  startPostUpload = async () => {
    const self = this;
    const uploadPromises = [];
    const mediaSources = [];

    let containsVideo = false;
    this.setState({ loader: true });
    this.state.post.postMedia.forEach((media) => {
      const { uploadUri, mime } = media;
      if (mime === 'video') {
        containsVideo = true;
      }

      uploadPromises.push(
        new Promise((resolve, reject) => {
          firebaseStorage.uploadImage(uploadUri).then((response) => {
            if (!response.error) {
              mediaSources.push({ url: response.downloadURL, mime });
            } else {
              alert(
                IMLocalized(
                  "Oops! Il y a eu une erreur lors de l'envoi de votre publication, essayez plus tard!.",
                ),
              );
            }
            resolve();
          });
        }),
      );
    });

    Promise.all(uploadPromises).then(async () => {
      const postToUpload = {
        ...self.state.post,
        containsVideo,
        postMedia: [...mediaSources],
      };
      await firebasePost
        .addPost(
          postToUpload,
          friendshipUtils.followerIDs(
            this.props.friendships,
            this.props.friends,
            false,
          ),
          self.props.user,
        )
        .then(
          setTimeout(function () {
            self.props.navigation.goBack();
          }, 3000),
        );
    });

    // self.props.navigation.goBack();
  };

  blurInput = () => {
    this.inputRef.current.blur();
  };

  render() {
    const postAsUser = this.props.navigation.getParam('postAsUser');
    const postUserData = postAsUser || this.props.user;

    return (
      <CreatePost
        inputRef={this.inputRef}
        user={postUserData}
        onPostDidChange={this.onPostDidChange}
        onSetMedia={this.onSetMedia}
        onLocationDidChange={this.onLocationDidChange}
        blurInput={this.blurInput}
        loader={this.state.loader}
      />
    );
  }
}

CreatePostScreen.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = ({ auth, friends }) => {
  return {
    user: auth.user,
    friends: friends.friends,
    friendships: friends.friendships,
  };
};

export default connect(mapStateToProps)(CreatePostScreen);

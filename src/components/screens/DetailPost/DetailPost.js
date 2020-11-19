import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  ActivityIndicator,
  View,
  BackHandler,
  Text,
} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useColorScheme } from 'react-native-appearance';
import FeedItem from '../../FeedItem/FeedItem';
import CommentItem from './CommentItem';
import SubCommentItems from './SubCommentItems';
import { withNavigation } from 'react-navigation';
import BottomInput from '../../../Core/chat/IMChat/BottomInput';

import TNMediaViewerModal from '../../../Core/truly-native/TNMediaViewerModal';
import dynamicStyles from './styles';

function DetailPost(props) {
  const {
    appStyles,

    onAddMediaPress,

    feedItem,
    feedItems,
    commentItems,
    onAudioRecordSend,
    onChangeTextInput,

    scrollViewRef,
    onMediaPress,
    onReaction,
    onSendInput,
    onSendRespense,
    shouldUpdate,
    onMediaClose,
    isMediaViewerOpen,
    selectedMediaIndex,
    onFeedUserItemPress,
    onSharePost,
    onDeletePost,
    onUserReport,
    user,
    commentsLoading,

    onReplyingToDismiss,
    uploadProgress,
    inputValue,
    inReplyToItem,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const TrackInteractive = true;

  const onCommentPress = () => {
    console.log('comment');
  };

  const [temporaryInReplyToItem, setTemporaryInReplyToItem] = useState(null);
  const [openKeyboard, setOpenKeyBord] = useState(false);
  const [isRespense, setRespense] = useState(false);
  const [userRespense, setUserRespense] = useState(null);
  const photoUploadDialogRef = useRef();
  const longPressActionSheetRef = useRef();

  const onChangeText = (text) => {
    onChangeTextInput(text);
  };

  const onAudioRecordDone = (item) => {
    onAudioRecordSend(item);
  };

  const onSend = () => {
    if (!isRespense) {
      onSendInput();
    } else {
      onSendRespense(userRespense.parentId);
      setUserRespense(null);
      setRespense(false);
      setOpenKeyBord(false);
    }
  };

  const onPhotoUploadDialogDone = (index) => {
    if (index === 0) {
      onLaunchCamera();
    }

    if (index === 1) {
      onOpenPhotos();
    }
  };

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const onGroupSettingsActionDone = (index) => {
    if (index === 0) {
      showRenameDialog(true);
    } else if (index === 1) {
      onLeave();
    }
  };

  const onPrivateSettingsActionDone = (index) => {
    if (index === 2) {
      return;
    }
    var message, actionCallback;
    if (index === 0) {
      actionCallback = onUserBlockPress;
      message = IMLocalized(
        "Are you sure you want to block this user? You won't see their messages again.",
      );
    } else if (index === 1) {
      actionCallback = onUserReportPress;
      message = IMLocalized(
        "Are you sure you want to report this user? You won't see their messages again.",
      );
    }
    Alert.alert(IMLocalized('Are you sure?'), message, [
      {
        text: IMLocalized('Yes'),
        onPress: actionCallback,
      },
      {
        text: IMLocalized('Cancel'),
        style: 'cancel',
      },
    ]);
  };
  const handleReponse = (comment, parentId) => {
    setUserRespense({
      firstName: comment.firstName,
      lastName: comment.lastName,
      parentId: parentId,
    });
    setOpenKeyBord(true);
    setRespense(true);
  };

  return (
    <View style={styles.detailPostContainer}>
      <ScrollView ref={scrollViewRef}>
        <FeedItem
          item={feedItem}
          onUserItemPress={onFeedUserItemPress}
          onCommentPress={onCommentPress}
          onMediaPress={onMediaPress}
          onReaction={onReaction}
          shouldUpdate={shouldUpdate}
          onSharePost={onSharePost}
          onDeletePost={onDeletePost}
          onUserReport={onUserReport}
          user={user}
        />
        {commentsLoading ? (
          <ActivityIndicator style={{ marginVertical: 7 }} size="small" />
        ) : (
          commentItems.map((comment) => (
            <>
              <CommentItem
                appStyles={appStyles}
                item={comment.comment}
                repondre={(comment) => handleReponse(comment, comment.id)}
                isUpdated={props.user.id === comment.comment.authorID}
                updateComment={(value) =>
                  props.updateComment(comment.comment.id, value)
                }
                deleteComment={() => props.deleteComment(comment.comment.id)}
              />
              {comment.subComments && comment.subComments.length > 0 && (
                <SubCommentItems
                  appStyles={appStyles}
                  subComments={comment.subComments}
                  repondre={(cm) => handleReponse(cm, comment.comment.id)}
                  user={props.user}
                  updateCommentHandler={(id, value) =>
                    props.updateComment(id, value)
                  }
                  deleteCommentHandler={(id) => props.deleteComment(id)}
                />
              )}
            </>
          ))
        )}
      </ScrollView>
      {isRespense && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#fff', paddingVertical: 15, marginRight: 5 }}>
            Répondre à
          </Text>
          <Text style={{ fontWeight: 'bold', color: '#fff' }}>
            {userRespense.firstName + ' ' + userRespense.lastName}
          </Text>
        </View>
      )}

      <BottomInput
        appStyles={appStyles}
        uploadProgress={uploadProgress}
        value={inputValue}
        onAudioRecordDone={onAudioRecordDone}
        onChangeText={onChangeText}
        onSend={onSend}
        trackInteractive={TrackInteractive}
        onAddMediaPress={() => onAddMediaPress(photoUploadDialogRef)}
        inReplyToItem={inReplyToItem}
        onReplyingToDismiss={onReplyingToDismiss}
        focus={openKeyboard}
        onClose={() => setOpenKeyBord(false)}
      />

      <TNMediaViewerModal
        mediaItems={feedItems}
        isModalOpen={isMediaViewerOpen}
        onClosed={onMediaClose}
        selectedMediaIndex={selectedMediaIndex}
      />
    </View>
  );
}

DetailPost.propTypes = {
  item: PropTypes.object,
  scrollViewRef: PropTypes.any,
  onMediaPress: PropTypes.func,
  onOtherReaction: PropTypes.func,
  onReaction: PropTypes.func,
  onFeedUserItemPress: PropTypes.func,
  onMediaClose: PropTypes.func,
  shouldUpdate: PropTypes.bool,
  feedItems: PropTypes.array,
  isMediaViewerOpen: PropTypes.bool,
  selectedMediaIndex: PropTypes.number,
};

export default withNavigation(DetailPost);

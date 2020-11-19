import React, { useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import PropTypes from 'prop-types';

import AudioMediaThreadItem from '../../../Core/chat/IMChat/AudioMediaThreadItem';
import dynamicStyles from './styles';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import ActionSheet from 'react-native-actionsheet';
import { UpdateModal } from '../../Modal';

const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';
function CommentItem(props) {
  const {
    appStyles,
    item: { firstName, lastName, commentText, profilePictureURL, audioURL },
    isUpdated,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const moreRef = useRef();
  const [openUpdateModal, setUpdateModal] = useState(false);
  const [initValue, setInitValue] = useState('');
  const moreArray = ['Modifier', 'Supprimer', 'Annuler'];

  const onMorePress = () => {
    moreRef.current.show();
  };

  const onMoreDialogDone = (index) => {
    if (index === 0) {
      setInitValue(commentText);
      setUpdateModal(true);
    }
    if (index === 1) {
      console.log('hello');
      props.deleteComment();
    }
  };
  const renderComment = (
    <>
      <View style={styles.commentItemBodyContainer}>
        <View style={styles.commentItemBodyRadiusContainer}>
          <Text style={styles.commentItemBodyTitle}>
            {firstName + ' ' + lastName}
          </Text>

          {audioURL ? (
            <AudioMediaThreadItem
              outBound={false}
              item={audioURL}
              appStyles={appStyles}
            />
          ) : (
            <Text style={styles.commentItemBodySubtitle}>{commentText}</Text>
          )}
        </View>

        <TouchableOpacity onPress={() => props.repondre(props.item)}>
          <Text style={styles.repondreTextColor}>Répondre</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.commentItemImageContainer}>
        <Image
          style={styles.commentItemImage}
          source={{
            uri: profilePictureURL || defaultAvatar,
          }}
        />
      </View>

      <ActionSheet
        ref={moreRef}
        title={IMLocalized('More')}
        options={moreArray}
        destructiveButtonIndex={moreArray.indexOf('Supprimer')}
        cancelButtonIndex={moreArray.length - 1}
        onPress={onMoreDialogDone}
      />
      {openUpdateModal && (
        <UpdateModal
          visible={openUpdateModal}
          styles={styles}
          dismiss={() => setUpdateModal(false)}
          initValue={initValue}
          update={(value) => {
            props.updateComment(value);
            setUpdateModal(false);
          }}
        />
      )}
    </>
  );
  return (
    <>
      {isUpdated && (
        <TouchableOpacity
          style={styles.commentItemContainer}
          onPress={() => onMorePress()}>
          {renderComment}
        </TouchableOpacity>
      )}
      {!isUpdated && (
        <View style={styles.commentItemContainer}>{renderComment}</View>
      )}
    </>
  );
}

CommentItem.propTypes = {
  item: PropTypes.object,
};

export default CommentItem;

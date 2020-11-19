import React from 'react';
import { View } from 'react-native';
import CommentItem from './CommentItem';
const SubCommentItems = (props) => {
  return (
    <View style={{ marginHorizontal: '10%' }}>
      {props.subComments.map((comment) => (
        <CommentItem
          appStyles={props.appStyles}
          item={comment}
          repondre={props.repondre}
          isUpdated={props.user.id === comment.authorID}
          updateComment={(value) =>
            props.updateCommentHandler(comment.id, value)
          }
          deleteComment={() => props.deleteCommentHandler(comment.id)}
        />
      ))}
    </View>
  );
};

export default SubCommentItems;

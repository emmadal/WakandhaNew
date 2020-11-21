import React, { memo } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { IMConversationIconView } from '../../../../chat';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { FriendshipConstants } from '../..';

const IMFriendItem = memo((props) => {
  const {
    item,
    index,
    onFriendAction,
    onFriendItemPress,
    displayActions,
    appStyles,
    followEnabled,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const user = item.user;
  let actionTitle = followEnabled
    ? FriendshipConstants.localizedFollowActionTitle(item.type)
    : FriendshipConstants.localizedActionTitle(item.type);

  var name = 'No name';
  if (user.firstName && user.lastName) {
    name = user.firstName + ' ' + user.lastName;
  } else if (user.fullname) {
    name = user.fullname;
  } else if (user.firstName) {
    name = user.firstName;
  }

  const renderActions = (displayActions, actionTitle) => {
    if (displayActions && actionTitle) {
      return (
        <TouchableOpacity
          onPress={() => onFriendAction(item, index)}
          style={followEnabled ? [styles.followButton] : [styles.addButton]}>
          <Text
            style={[
              styles.name,
              {
                alignSelf: 'center',
                padding: 0,
                fontSize: 14,
                fontWeight: '500',
                color: 'white',
              },
            ]}>
            {actionTitle}
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onFriendItemPress(item)}
      style={styles.friendItemContainer}>
      <View style={styles.chatIconContainer}>
        <IMConversationIconView
          style={[styles.photo, { marginRight: 20 }]}
          imageStyle={styles.photo}
          participants={[user]}
          appStyles={appStyles}
        />
        <View>
          {name && (
            <Text style={[styles.name, { marginBottom: 5 }]}>{name}</Text>
          )}
          {renderActions(displayActions, actionTitle)}
        </View>
      </View>
    </TouchableOpacity>
  );
});

IMFriendItem.propTypes = {
  onFriendAction: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  actionIcon: PropTypes.bool,
  item: PropTypes.object,
  index: PropTypes.number,
};

IMFriendItem.defaultProps = {
  displayActions: true,
};

export default IMFriendItem;

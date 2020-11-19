import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { TNStoryItem } from '../../truly-native';
import PropTypes from 'prop-types';
import { timeFormat } from '../..';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';

const IMNotificationItem = memo((props) => {
  const { item, onNotificationPress, appStyles } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  return (
    <TouchableOpacity
      onPress={() => onNotificationPress(item)}
      activeOpacity={0.8}
      style={[
        styles.notificationItemBackground,
        item.seen
          ? styles.seenNotificationBackground
          : styles.unseenNotificationBackground,
      ]}>
      <View style={styles.notificationItemContainer}>
        {item.metadata && item.metadata.outBound && (
          <TNStoryItem
            containerStyle={styles.userImageMainContainer}
            imageContainerStyle={styles.userImageContainer}
            imageStyle={styles.userImage}
            item={item.metadata.outBound}
            onPress={() => onNotificationPress(item)}
            activeOpacity={1}
            appStyles={appStyles}
          />
        )}
        <View style={styles.notificationLabelContainer}>
          <Text style={[styles.description, styles.name]}>
            {`${item.metadata.outBound.firstName} `}
          </Text>
          <Text
            style={[
              styles.description,
              { color: 'rgba(255,255,255,0.4)', marginBottom: 10 },
            ]}>
            {item.body}
          </Text>
          <Text
            style={[
              styles.description,
              styles.moment,
              { color: 'rgba(255,255,255,0.4)' },
            ]}>
            {timeFormat(item.createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

IMNotificationItem.propTypes = {
  item: PropTypes.object,
};

export default IMNotificationItem;

import React, { useRef } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';

function TNStoriesTray(props) {
  const {
    data,
    onStoryItemPress,
    onUserItemPress,
    user,
    displayUserItem,
    userItemShouldOpenCamera,
    storyItemContainerStyle,
    userStoryTitle,
    displayLastName,
    showOnlineIndicator,
    appStyles,
  } = props;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const refs = useRef();

  const renderItem = ({ item, index }) => {
    const { firstName, lastName } = item;
    const isSeen =
      item.items && item.idx + 1 === item.items.length && styles.seenStyle;

    const latestStoryData = item.items[0];

    return (
      <TouchableOpacity
        ref={refs}
        onPress={() => onStoryItemPress(item, index, refs)}
        style={styles.thumbnailStoryContainer}>
        {latestStoryData.type === 'image' && (
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            source={{
              uri: latestStoryData?.src || null,
            }}
          />
        )}

        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styles.thumbnailStoryPicture}
          source={{ uri: item.profilePictureURL }}
        />

        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
          style={styles.bottomBlackGradient}
        />

        <Text numberOfLines={1} style={styles.thumbnailStoryUserName}>
          {`${firstName} ${lastName || ''}`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.storiesContainer}>
      {displayUserItem && (
        <TouchableOpacity
          ref={refs}
          onPress={() => onUserItemPress(user, 0, refs)}
          style={styles.thumbnailStoryContainer}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={styles.thumbnailStoryPicture}
            source={{ uri: user.profilePictureURL }}
          />

          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
            style={styles.bottomBlackGradient}
          />

          <Text numberOfLines={1} style={styles.thumbnailStoryUserName}>
            {userStoryTitle}
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={data}
        inverted={I18nManager.isRTL}
        renderItem={renderItem}
        keyExtractor={(item, index) => index + 'item'}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
      />
    </ScrollView>
  );
}

TNStoriesTray.propTypes = {
  data: PropTypes.array,
  onStoryItemPress: PropTypes.func,
  onUserItemPress: PropTypes.func,
  displayUserItem: PropTypes.bool,
  userItemShouldOpenCamera: PropTypes.bool,
  storyItemContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

TNStoriesTray.defaultProps = {
  displayLastName: true,
};

export default TNStoriesTray;

import React, { useRef, useContext, createRef, useEffect } from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  BackHandler,
} from 'react-native';
import { NavigationContext } from 'react-navigation';
import PropTypes from 'prop-types';
import { Viewport } from '@skele/components';
import { useColorScheme } from 'react-native-appearance';
import ActionSheet from 'react-native-actions-sheet';
import { responsiveWidth } from 'react-native-responsive-dimensions';

import FeedItem from '../../FeedItem/FeedItem';
import dynamicStyles from './styles';
import IMCameraModal from '../../../Core/camera/IMCameraModal';
import TNMediaViewerModal from '../../../Core/truly-native/TNMediaViewerModal';
import FullStories from '../../../Core/stories/FullStories';
import { TNEmptyStateView } from '../../../Core/truly-native';
import { IMNativeFBAdComponentView } from '../../../Core/ads/facebook';
import AppStyles from '../../../AppStyles';

const HEIGHT = Dimensions.get('window').height;

function Feed(props) {
  const {
    onCommentPress,
    feed,
    user,
    isCameraOpen,
    onCameraClose,
    onUserItemPress,
    displayStories,
    onFeedUserItemPress,
    isMediaViewerOpen,
    feedItems,
    onMediaClose,
    onMediaPress,
    selectedMediaIndex,
    stories,
    onPostStory,
    userStories,
    onReaction,
    onLikeReaction,
    onOtherReaction,
    loading,
    handleOnEndReached,
    isFetching,
    shouldEmptyStories,
    isStoryUpdating,
    onSharePost,
    onDeletePost,
    onUserReport,
    onFeedScroll,
    willBlur,
    selectedFeedIndex,
    shouldReSizeMedia,
    feedRef,
    onEmptyStatePress,
    adsManager,
    emptyStateConfig,
  } = props;

  const navigation = useContext(NavigationContext);
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const fullStoryRef = useRef();
  const mediaLayouts = useRef([]);

  function handleBackButtonClick() {
    navigation.goBack();
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

  const menuList = [
    {
      title: 'Exprimez-vous',
      icon: require('../../../../assets/menuIcons/feeling.png'),
    },
    {
      title: 'Photos/Vidéos',
      icon: require('../../../../assets/menuIcons/picture.png'),
    },
    {
      title: 'Taguer un ami',
      icon: require('../../../../assets/menuIcons/tagFriend.png'),
    },
    {
      title: 'Ma localisation',
      icon: require('../../../../assets/menuIcons/checkIn.png'),
    },
    {
      title: "Couleur de l'app",
      icon: require('../../../../assets/menuIcons/background.png'),
    },
    {
      title: 'Publier une photo',
      icon: require('../../../../assets/menuIcons/camera.png'),
    },
    {
      title: 'Go live',
      icon: require('../../../../assets/menuIcons/live.png'),
    },
    {
      title: 'GIF',
      icon: require('../../../../assets/menuIcons/gif.png'),
    },
    {
      title: 'Musique',
      icon: require('../../../../assets/menuIcons/music.png'),
    },
    {
      title: 'Note audio',
      icon: require('../../../../assets/menuIcons/audio.png'),
    },
  ];

  const mainMenuRef = createRef();

  const onImagePost = (source) => {
    onPostStory(source);
  };

  const getItemLayout = (data, index) => ({
    length: feed.length,
    offset: HEIGHT * 0.55 * index,
    index,
  });

  const renderItem = ({ item, index }) => {
    let shouldUpdate = false;
    if (item.shouldUpdate) {
      shouldUpdate = item.shouldUpdate;
    }
    if (item.isAd) {
      return (
        <IMNativeFBAdComponentView key={index + 'ad'} adsManager={adsManager} />
      );
    }
    return (
      <FeedItem
        key={index + 'feeditem'}
        onUserItemPress={onFeedUserItemPress}
        item={item}
        feedIndex={index}
        onCommentPress={onCommentPress}
        onMediaPress={onMediaPress}
        shouldReSizeMedia={shouldReSizeMedia}
        onReaction={onReaction}
        onLikeReaction={onLikeReaction}
        onOtherReaction={onOtherReaction}
        iReact={item.iReact}
        shouldUpdate={shouldUpdate}
        userReactions={item.userReactions}
        onSharePost={onSharePost}
        onDeletePost={onDeletePost}
        onUserReport={onUserReport}
        user={user}
        willBlur={willBlur}
        shouldDisplayViewAllComments={true}
        onLayout={(event) => {
          if (
            event &&
            event.nativeEvent &&
            mediaLayouts &&
            mediaLayouts.current
          ) {
            const layout = event.nativeEvent.layout;
            mediaLayouts.current[index] = layout.x;
          }
        }}
      />
    );
  };

  const renderListHeader = () => {
    if (displayStories) {
      return (
        <FullStories
          ref={fullStoryRef}
          user={user}
          shouldEmptyStories={shouldEmptyStories}
          isStoryUpdating={isStoryUpdating}
          onUserItemPress={onUserItemPress}
          stories={stories}
          userStories={userStories}
          appStyles={AppStyles}
          containerStyle={{ marginTop: 20 }}
        />
      );
    }
    return null;
  };

  const renderListFooter = () => {
    if (isFetching) {
      return <ActivityIndicator style={{ marginVertical: 7 }} size="small" />;
    }
    return null;
  };

  const renderEmptyComponent = () => {
    if (!feed) {
      return null;
    }

    return (
      <TNEmptyStateView
        style={styles.emptyStateView}
        emptyStateConfig={emptyStateConfig}
        appStyles={AppStyles}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.feedContainer}>
        <ActivityIndicator style={{ marginTop: 15 }} size="small" />
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.feedContainer,
      }}>
      <Viewport.Tracker>
        <FlatList
          ref={(ref) => {
            if (feedRef) {
              feedRef.current = ref;
            }
          }}
          scrollEventThrottle={16}
          onScroll={onFeedScroll}
          showsVerticalScrollIndicator={false}
          getItemLayout={getItemLayout}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderListFooter}
          ListEmptyComponent={renderEmptyComponent}
          data={feed}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.5}
          onEndReached={handleOnEndReached}
          removeClippedSubviews={true}
          contentContainerStyle={{ paddingTop: 20 }}
        />
      </Viewport.Tracker>

      <TouchableOpacity
        onPress={() => {
          mainMenuRef.current?.setModalVisible();
        }}
        style={styles.buttonNewPublication}>
        <Image
          style={[styles.imageNewPublication]}
          source={AppStyles.iconSet.plus}
        />
      </TouchableOpacity>

      <ActionSheet
        ref={mainMenuRef}
        gestureEnabled={true}
        containerStyle={{
          backgroundColor: '#1D1D27',
          padding: 20,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}>
        {menuList.map(({ title, icon }) => (
          <>
            <TouchableOpacity
              onPress={() => {
                mainMenuRef.current?.setModalVisible(false);
                navigation.navigate('CreatePost');
              }}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                resizeMode={'contain'}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 20,
                }}
                source={icon}
              />
              <Text style={{ color: 'white', fontWeight: '600' }}>{title}</Text>
            </TouchableOpacity>
            <View
              style={{
                width: responsiveWidth(100),
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.1)',
                marginVertical: 15,
                marginHorizontal: -20,
              }}
            />
          </>
        ))}
      </ActionSheet>

      <IMCameraModal
        isCameraOpen={isCameraOpen}
        onImagePost={onImagePost}
        onCameraClose={onCameraClose}
      />
      <TNMediaViewerModal
        mediaItems={feedItems}
        isModalOpen={isMediaViewerOpen}
        onClosed={onMediaClose}
        selectedMediaIndex={selectedMediaIndex}
      />
    </View>
  );
  // }
}

Feed.propTypes = {
  feedItems: PropTypes.array,
  userStories: PropTypes.object,
  stories: PropTypes.array,
  onMediaClose: PropTypes.func,
  onCommentPress: PropTypes.func,
  onPostStory: PropTypes.func,
  onUserItemPress: PropTypes.func,
  onCameraClose: PropTypes.func,
  isCameraOpen: PropTypes.bool,
  displayStories: PropTypes.bool,
  isMediaViewerOpen: PropTypes.bool,
  onFeedUserItemPress: PropTypes.func,
  onMediaPress: PropTypes.func,
  selectedMediaIndex: PropTypes.number,
  onLikeReaction: PropTypes.func,
  onOtherReaction: PropTypes.func,
};

export default Feed;

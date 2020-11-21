import React, { useRef, useContext, useState } from 'react';
import {
  View,
  Image,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

import PropTypes from 'prop-types';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import { useColorScheme } from 'react-native-appearance';
import FastImage from 'react-native-fast-image';
import { NavigationContext } from 'react-navigation';

import { TNStoryItem } from '../../../Core/truly-native';
import FeedItem from '../../FeedItem/FeedItem';
import ProfileButton from './ProfileButton';
import dynamicStyles from './styles';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import { TNEmptyStateView } from '../../../Core/truly-native';
import AppStyles from '../../../AppStyles';
import FriendCard from './FriendCard';
import {
  TNActivityIndicator,
  TNMediaViewerModal,
} from '../../../Core/truly-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BaseModal } from '../../Modal';
import Button from 'react-native-button';

function Profile(props) {
  const [editModal, setEditModal] = useState(false);

  const navigation = useContext(NavigationContext);
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const {
    onMainButtonPress,
    recentUserFeeds,
    user,
    mainButtonTitle,
    isMediaViewerOpen,
    feedItems,
    onMediaClose,
    selectedMediaIndex,
    removePhoto,

    startUpload,

    uploadProgress,
    loading,
    handleOnEndReached,

    isFetching,
    isOtherUser,
    isPage,

    onEmptyStatePress,
    onSubButtonTitlePress,
    onUserReport,
    onFeedUserItemPress,
    onMediaPress,
    onReaction,
    onDeletePost,
    onSharePost,

    subButtonTitle,
    displaySubButton,
    onCommentPress,
    onUpdateUserName,
    friends,
    loggedInUser,
    willBlur,
    onFriendItemPress,
  } = props;
  const updatePhotoDialogActionSheet = useRef();
  const photoUploadDialogActionSheet = useRef();

  const onProfilePicturePress = () => {
    if (isOtherUser) {
      return;
    }
    updatePhotoDialogActionSheet.current.show();
  };

  const onUpdatePhotoDialogDone = (index) => {
    if (index === 0) {
      photoUploadDialogActionSheet.current.show();
    }

    if (index === 1) {
      removePhoto();
    }
  };

  const onPhotoUploadDialogDone = (index) => {
    if (index === 0) {
      onLaunchCamera();
    }

    if (index === 1) {
      onOpenPhotos({ isCover: false });
    }
  };

  const onLaunchCamera = () => {
    ImagePicker.openCamera({
      cropping: false,
    }).then((image) => {
      const source = image.path;

      startUpload({ source });
    });
  };

  const onOpenPhotos = ({ isCover }) => {
    if (isOtherUser) {
      return;
    }

    ImagePicker.openPicker({
      cropping: false,
    }).then((image) => {
      const source = image.path;

      startUpload({ source, isCover });
    });
  };
  const renderItem = ({ item, index }) => (
    <FeedItem
      item={item}
      index={index}
      key={index + 'feeditem'}
      onUserItemPress={onFeedUserItemPress}
      onCommentPress={onCommentPress}
      onMediaPress={onMediaPress}
      onReaction={onReaction}
      onSharePost={onSharePost}
      onDeletePost={onDeletePost}
      onUserReport={onUserReport}
      user={isOtherUser ? loggedInUser : user}
      willBlur={willBlur}
    />
  );

  const renderListFooter = () => {
    if (loading) {
      return null;
    }
    if (isFetching) {
      return <ActivityIndicator style={{ marginVertical: 7 }} size="small" />;
    }
    return null;
  };

  const renderListHeader = () => {
    const { camera, post, promote, view } = AppStyles.iconSet;

    const menuList = [
      {
        title: 'Publier',
        icon: post,
        action: () =>
          navigation.navigate('PageCreatePost', {
            postAsUser: user,
          }),
      },
      {
        title: 'Photo',
        icon: camera,
        action: () =>
          navigation.navigate('PageCreatePost', {
            postAsUser: user,
          }),
      },
      {
        title: 'Promouvoir',
        icon: promote,
        action: () => Alert.alert('Fonctionnalité à venir.'),
      },
      {
        title: 'Voir comme',
        icon: view,
        action: () => Alert.alert('Fonctionnalité à venir.'),
      },
    ];

    const buttonEditPicture = (position) => (
      <View style={styles.containerEditPicture}>
        <Image
          source={camera}
          style={{
            height: '50%',
            width: '50%',
            tintColor: 'white',
            ...position,
          }}
        />
      </View>
    );

    const handleEdit = (firstName, lastName) => {
      setEditModal(false);
      console.log(firstName, lastName);
      onUpdateUserName({ firstName, lastName });
    };

    return (
      <View
        style={{
          ...styles.pageContainer,
          paddingTop: 0,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => onOpenPhotos({ isCover: true })}
          style={styles.containerCoverPicture}>
          {user?.coverPictureURL && (
            <Image
              source={require('../../screens/Profile/cover.png')}
              style={{ flex: 1 }}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}

          {!isOtherUser && buttonEditPicture()}
        </TouchableOpacity>

        {isPage ? (
          <View style={{ width: '100%' }}>
            <View
              style={[styles.containerSpaceBetween, { paddingHorizontal: 15 }]}>
              <View>
                <View style={styles.containerRowCenter}>
                  <Text
                    style={[
                      styles.textTitle,
                      { marginBottom: 0, marginRight: 10 },
                    ]}>
                    {user.pageName}
                  </Text>
                  {user.isVerified && (
                    <Image
                      source={AppStyles.iconSet.verified}
                      style={{
                        height: 25,
                        width: 25,
                      }}
                      resizeMode={'contain'}
                    />
                  )}
                </View>
                <Text style={styles.textParagraph}>{user.pageCategory}</Text>
              </View>

              <TouchableOpacity onPress={onProfilePicturePress}>
                {user.profilePictureURL ? (
                  <FastImage
                    source={{ uri: user.profilePictureURL }}
                    style={{ ...styles.pictureAvatar }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                ) : (
                  <View
                    style={{
                      ...styles.pictureAvatar,
                      backgroundColor: '#DDB937',
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>

            {!isOtherUser && (
              <>
                <View style={styles.verticalSeparator} />

                <View
                  style={{
                    ...styles.containerSpaceBetween,
                    paddingHorizontal: 10,
                  }}>
                  {menuList.map(({ title, icon, action }) => (
                    <TouchableOpacity
                      onPress={action}
                      style={{ alignItems: 'center', width: '25%' }}>
                      <Image
                        source={icon}
                        style={{
                          height: 25,
                          width: 30,
                          tintColor: '#DDB937',
                          marginBottom: 10,
                        }}
                        resizeMode={'contain'}
                      />
                      <Text style={{ ...styles.textParagraph, color: 'white' }}>
                        {title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {user.inboundFriendsCount && (
              <>
                <View style={styles.verticalSeparator} />

                <Text
                  style={{ ...styles.textParagraph, paddingHorizontal: 15 }}>
                  Followers {user.inboundFriendsCount}
                </Text>
              </>
            )}
          </View>
        ) : (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: !isOtherUser ? 0.5 : 0.9 }}>
              <TNStoryItem
                item={user}
                imageStyle={[styles.userImage]}
                imageContainerStyle={styles.userImageContainer}
                containerStyle={styles.userImageMainContainer}
                activeOpacity={1}
                title={true}
                onPress={onProfilePicturePress}
                textStyle={styles.userName}
                appStyles={AppStyles}
              />
            </View>
            {!isOtherUser && (
              <View
                style={{
                  flex: 0.4,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  marginBottom: '15%',
                }}>
                <TouchableOpacity onPress={() => setEditModal(true)}>
                  <Icon name="edit" color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <View style={styles.verticalSeparator} />

        {isOtherUser && (
          <ProfileButton title={mainButtonTitle} onPress={onMainButtonPress} />
        )}

        {friends && friends.length > 0 && (
          <>
            <Text style={styles.FriendsTitle}>Amis</Text>

            <View style={styles.FriendsContainer}>
              {friends.length > 0 &&
                friends.map((item) => (
                  <FriendCard
                    onPress={() => onFriendItemPress(item)}
                    key={item.id}
                    item={item}
                  />
                ))}
            </View>
          </>
        )}
        {displaySubButton && (
          <ProfileButton
            title={subButtonTitle}
            onPress={onSubButtonTitlePress}
            disabled={!displaySubButton}
            containerStyle={[
              {
                marginBottom: 22,
              },
              styles.subButtonColor,
              loading && { display: 'none' },
              displaySubButton
                ? { opacity: 1 }
                : { opacity: 0, marginTop: -20, zIndex: -1 },
            ]}
            titleStyle={styles.textParagraph}
          />
        )}

        {loading && (
          <View style={styles.container}>
            <ActivityIndicator
              style={{ marginTop: 15, alignSelf: 'center' }}
              size="small"
            />
          </View>
        )}
        <BaseModal
          visible={editModal}
          dismiss={() => setEditModal(false)}
          handleEdit={handleEdit}
          data={user}
          styles={styles}
        />
      </View>
    );
  };

  const renderEmptyComponent = () => {
    let emptyStateConfig = {
      title: IMLocalized('Pas de publication'),
      description: IMLocalized(
        isPage
          ? "Cette page n'a encore jamais publié, les publications apparaîtront ici"
          : "Ce profil n'a encore rien publié, les publications apparaîtront ici.",
      ),
    };
    if (!isOtherUser) {
      emptyStateConfig = {
        ...emptyStateConfig,
        buttonName: IMLocalized('Commence à publier!'),
        onPress: isPage
          ? () =>
              navigation.navigate('PageCreatePost', {
                postAsUser: user,
              })
          : onEmptyStatePress,
      };
    }
    return (
      <TNEmptyStateView
        emptyStateConfig={emptyStateConfig}
        appStyles={AppStyles}
        style={{ marginTop: 20, marginBottom: 10 }}
      />
    );
  };
  return (
    <View style={{ ...styles.pageContainer, paddingTop: 0 }}>
      <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
      {recentUserFeeds && (
        <FlatList
          scrollEventThrottle={16}
          data={recentUserFeeds}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.5}
          horizontal={false}
          onEndReached={handleOnEndReached}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderListFooter}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
        />
      )}
      {recentUserFeeds == null && <TNActivityIndicator appStyles={AppStyles} />}
      <TNMediaViewerModal
        mediaItems={feedItems}
        isModalOpen={isMediaViewerOpen}
        onClosed={onMediaClose}
        selectedMediaIndex={selectedMediaIndex}
      />
      <ActionSheet
        ref={updatePhotoDialogActionSheet}
        title={IMLocalized('Photo de profil')}
        options={[
          IMLocalized('Modifier la photo'),
          IMLocalized('Supprimer'),
          IMLocalized('Annuler'),
        ]}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={onUpdatePhotoDialogDone}
      />
      <ActionSheet
        ref={photoUploadDialogActionSheet}
        title={IMLocalized('Choisir une photo')}
        options={[
          IMLocalized('Caméra'),
          IMLocalized('Bibliothèque'),
          IMLocalized('Annuler'),
        ]}
        cancelButtonIndex={2}
        onPress={onPhotoUploadDialogDone}
      />
    </View>
  );
}

Profile.propTypes = {
  onCommentPress: PropTypes.func,
  startUpload: PropTypes.func,
  removePhoto: PropTypes.func,
  onMainButtonPress: PropTypes.func,
  onSubButtonTitlePress: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  onFeedUserItemPress: PropTypes.func,
  user: PropTypes.object,
  friends: PropTypes.array,
  mainButtonTitle: PropTypes.string,
  subButtonTitle: PropTypes.string,
  feedItems: PropTypes.array,
  onMediaClose: PropTypes.func,
  isMediaViewerOpen: PropTypes.bool,
  onMediaPress: PropTypes.func,
  displaySubButton: PropTypes.bool,
  selectedMediaIndex: PropTypes.number,
  uploadProgress: PropTypes.number,
};

export default Profile;

import React, { useEffect } from 'react';
import { FlatList, View, Text, BackHandler } from 'react-native';
import { withNavigation } from 'react-navigation';

import PropTypes from 'prop-types';
import { IMFriendItem } from '../..';
import { IMUserSearchModal } from '../..';
import { SearchBarAlternate } from '../../../..';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { IMLocalized } from '../../../../localization/IMLocalization';
import {
  TNEmptyStateView,
  TNActivityIndicator,
} from '../../../../truly-native';

function IMFriendsListComponent(props) {
  const {
    searchBar,
    containerStyle,
    onFriendAction,
    friendsData,
    onSearchBarPress,
    onSearchBarCancel,
    searchData,
    onSearchTextChange,
    isSearchModalOpen,
    onSearchModalClose,
    onSearchClear,
    onFriendItemPress,
    searchBarRef,
    displayActions,
    appStyles,
    isLoading,
    followEnabled,
    viewer,
    emptyStateConfig,
  } = props;

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

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const renderItem = ({ item }) => (
    <IMFriendItem
      onFriendItemPress={onFriendItemPress}
      item={item}
      onFriendAction={onFriendAction}
      displayActions={displayActions && item.user.id !== viewer.id}
      appStyles={appStyles}
      followEnabled={followEnabled}
    />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={{
          borderBottomColor: '#343434',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          paddingBottom: 15,
        }}>
        <Text style={styles.textTitle}>Mes amis</Text>
      </View>

      {searchBar && (
        <SearchBarAlternate
          onPress={onSearchBarPress}
          placeholderTitle={IMLocalized('Trouver des amis')}
          appStyles={appStyles}
        />
      )}
      {friendsData && friendsData.length > 0 && (
        <FlatList
          data={friendsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.user.id}
          removeClippedSubviews={true}
        />
      )}
      {!friendsData ||
        (friendsData.length <= 0 && (
          <View style={styles.emptyViewContainer}>
            <TNEmptyStateView
              emptyStateConfig={emptyStateConfig}
              appStyles={appStyles}
            />
          </View>
        ))}
      <IMUserSearchModal
        onSearchBarCancel={onSearchBarCancel}
        onSearchClear={onSearchClear}
        data={searchData}
        onSearchTextChange={onSearchTextChange}
        isModalOpen={isSearchModalOpen}
        onClose={onSearchModalClose}
        searchBarRef={searchBarRef}
        onAddFriend={onFriendAction}
        onFriendItemPress={onFriendItemPress}
        appStyles={appStyles}
        followEnabled={followEnabled}
      />
      {isLoading && <TNActivityIndicator appStyles={appStyles} />}
    </View>
  );
}

IMFriendsListComponent.propTypes = {
  onCommentPress: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  actionIcon: PropTypes.bool,
  searchBar: PropTypes.bool,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  friendsData: PropTypes.array,
  onSearchBarPress: PropTypes.func,
  onSearchBarCancel: PropTypes.func,
  searchData: PropTypes.array,
  onSearchTextChange: PropTypes.func,
  isSearchModalOpen: PropTypes.bool,
  onSearchModalClose: PropTypes.func,
  searchBarRef: PropTypes.object,
  onSearchClear: PropTypes.func,
};

export default withNavigation(IMFriendsListComponent);

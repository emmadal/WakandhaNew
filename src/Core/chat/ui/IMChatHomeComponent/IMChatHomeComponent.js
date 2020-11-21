import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
} from 'react-native';

import { SearchBarAlternate } from '../../..';
import { IMUserSearchModal } from '../../../socialgraph/friendships';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { IMConversationListView } from '../..';
import { IMLocalized } from '../../../localization/IMLocalization';
import AppStyles from '../../../../AppStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import { TNEmptyStateView } from '../../../truly-native';

const width = Dimensions.get('window').width;

{
  /*             <View style={styles.searchBarContainer}>
              <SearchBarAlternate
                onPress={onSearchBarPress}
                placeholderTitle={IMLocalized('Chercher des amis')}
                appStyles={appStyles}
              />
            </View> */
}

function IMChatHomeComponent(props) {
  const {
    onSearchBarPress,
    onSearchTextChange,
    isSearchModalOpen,
    onSearchModalClose,
    searchData,
    onSearchBarCancel,
    onFriendItemPress,
    searchBarRef,
    onFriendAction,
    onSearchClear,
    navigation,
    appStyles,
    onEmptyStatePress,
    followEnabled,
  } = props;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const tabList = [
    { type: 'icon', title: 'phone' },
    { type: 'text', title: 'Tchat' },
    { type: 'text', title: 'Groupes' },
    { type: 'text', title: 'Pages' },
    { type: 'text', title: 'Amis' },
    /* { title: 'Appels' }, */
  ];

  const [pageIndex, setPageIndex] = useState(0);
  var swiper = '';
  const onTabClicked = (flag) => {
    if (flag === 0) {
      swiper.scrollTo({ x: 0, y: 0, animated: true });
    }
    if (flag === 1) {
      swiper.scrollTo({ x: width, y: 0, animated: true });
    }
    if (flag === 2) {
      swiper.scrollTo({ x: width * 2, y: 0, animated: true });
    }

    setPageIndex(flag);
  };

  const ref = (el) => {
    swiper = el;
  };

  const handlePageChange = (e) => {
    var offset = e.nativeEvent.contentOffset;
    if (offset) {
      const page = Math.round(offset.x / width);

      if (pageIndex !== page) {
        setPageIndex(page);
      }
    }
  };

  const emptyStateConfig = {
    title: IMLocalized('Aucune conversation'),
    description: IMLocalized(
      'Ajoute des amis pour commencer à leur parler, les conversations apparaîtront ici.',
    ),
    buttonName: IMLocalized('Ajoute des amis'),
    onPress: onEmptyStatePress,
  };

  return (
    <View style={styles.container}>
      <View style={styles.segmentContainer}>
        {tabList.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.segmentItemContainer,
                { width: `${100 / tabList.length}%` },
              ]}
              onPress={() => onTabClicked(index)}>
              {item.type === 'text' && (
                <Text style={styles.textTab}>{item.title}</Text>
              )}
              {item.type === 'icon' && (
                <>
                  {console.log('hello')}
                  <Icon
                    name={item.title}
                    color="#fff"
                    size={27}
                    style={styles.textTab}
                  />
                </>
              )}

              <View
                style={[pageIndex === index && styles.viewUnderlineActive]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        ref={(snapScroll) => {
          swiper = snapScroll;
        }}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handlePageChange}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: `${tabList.length * 100}%` }}>
        <View style={styles.containerItemTab}>
          <ScrollView style={styles.container}>
            <View style={styles.chatsChannelContainer}>
              <View style={styles.emptyViewContainer}>
                <TNEmptyStateView
                  emptyStateConfig={{
                    title: 'Aucun appel ',
                    description: "L'historique des appels ",
                  }}
                  appStyles={appStyles}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.containerItemTab}>
          <ScrollView style={styles.container}>
            <View style={styles.chatsChannelContainer}>
              <IMConversationListView
                displayGroups={false}
                navigation={navigation}
                appStyles={appStyles}
                emptyStateConfig={emptyStateConfig}
              />
            </View>
          </ScrollView>
        </View>

        <View style={styles.containerItemTab}>
          <ScrollView style={styles.container}>
            <View style={styles.chatsChannelContainer}>
              <IMConversationListView
                displayGroups={true}
                navigation={navigation}
                appStyles={appStyles}
                emptyStateConfig={emptyStateConfig}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.containerItemTab}>
          <ScrollView style={styles.container}>
            <View style={styles.chatsChannelContainer}>
              <View style={styles.emptyViewContainer}>
                <TNEmptyStateView
                  emptyStateConfig={{
                    title: 'Aucune Page ',
                  }}
                  appStyles={appStyles}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.containerItemTab}>
          <ScrollView style={styles.container}>
            <View style={styles.chatsChannelContainer}>
              <View style={styles.emptyViewContainer}>
                <TNEmptyStateView
                  emptyStateConfig={{
                    title: 'Aucuns Amis',
                    description:
                      'Ajouter des contacts pour commencer à leur parler',
                  }}
                  appStyles={appStyles}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      <IMUserSearchModal
        onSearchBarCancel={onSearchBarCancel}
        onSearchClear={onSearchClear}
        data={searchData}
        onFriendItemPress={onFriendItemPress}
        onSearchTextChange={onSearchTextChange}
        onAddFriend={onFriendAction}
        isModalOpen={isSearchModalOpen}
        onClose={onSearchModalClose}
        searchBarRef={searchBarRef}
        appStyles={appStyles}
        followEnabled={followEnabled}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CreateGroup', { appStyles: AppStyles })
        }
        style={styles.buttonNewPublication}>
        <Image
          resizeMode={'contain'}
          style={[styles.imageNewPublication]}
          source={AppStyles.iconSet.appIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

IMChatHomeComponent.propTypes = {
  onSearchClear: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  onFriendAction: PropTypes.func,
  onSearchBarPress: PropTypes.func,
  onSearchBarCancel: PropTypes.func,
  onSearchTextChange: PropTypes.func,
  onSearchModalClose: PropTypes.func,
  channels: PropTypes.array,
  searchData: PropTypes.array,
  isSearchModalOpen: PropTypes.bool,
  searchBarRef: PropTypes.object,
};

export default IMChatHomeComponent;

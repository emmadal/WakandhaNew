import React, { useEffect } from 'react';
import { FlatList, View, Text, BackHandler } from 'react-native';
import { withNavigation } from 'react-navigation';
import IMNotificationItem from './IMNotificationItem';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';

function IMNotification({
  notifications,
  onNotificationPress,
  appStyles,
  navigation,
}) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

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

  const renderItem = ({ item }) => (
    <IMNotificationItem
      onNotificationPress={onNotificationPress}
      appStyles={appStyles}
      item={item}
    />
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: '#343434',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          paddingBottom: 15,
        }}>
        <Text style={styles.textTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
      />
    </View>
  );
}

IMNotification.propTypes = {};

export default withNavigation(IMNotification);

import React from 'react';
import { FlatList, TouchableOpacity, Text, View, Image } from 'react-native';
import DialogInput from 'react-native-dialog-input';

import PropTypes from 'prop-types';
import { IMConversationIconView } from '../..';
import AppStyles from '../../../../AppStyles';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { TNEmptyStateView } from '../../../truly-native';
import { IMLocalized } from '../../../localization/IMLocalization';

function IMCreateGroupComponent(props) {
  const {
    onCancel,
    isNameDialogVisible,
    friends,
    onSubmitName,
    onCheck,
    appStyles,
    onEmptyStatePress,
  } = props;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onCheck(item)}
      style={styles.itemContainer}>
      <View style={styles.chatIconContainer}>
        <IMConversationIconView
          style={styles.photo}
          imageStyle={styles.photo}
          participants={[item]}
          appStyles={AppStyles}
        />
        <Text style={styles.name}>{item.firstName}</Text>
      </View>
      <View style={styles.addFlexContainer}>
        {item.checked && (
          <Image style={styles.checked} source={AppStyles.iconSet.checked} />
        )}
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  );

  const emptyStateConfig = {
    title: IMLocalized("You can't create groups"),
    description: IMLocalized(
      "You don't have enough friends to create groups. Add at least 2 friends to be able to create groups.",
    ),
    buttonName: IMLocalized('Go back'),
    onPress: onEmptyStatePress,
  };

  return (
    <View style={styles.container}>
      {friends && friends.length > 1 && (
        <FlatList
          data={friends}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          initialNumToRender={5}
          removeClippedSubviews={true}
        />
      )}
      {friends && friends.length <= 1 && (
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView
            appStyles={appStyles}
            emptyStateConfig={emptyStateConfig}
          />
        </View>
      )}
      <DialogInput
        isDialogVisible={isNameDialogVisible}
        title={IMLocalized('Le nom de votre groupe')}
        hintInput="Nom du groupe"
        textInputProps={{ selectTextOnFocus: true }}
        submitText="Valider"
        submitInput={(inputText) => {
          onSubmitName(inputText);
        }}
        closeDialog={onCancel}
      />
    </View>
  );
}

IMCreateGroupComponent.propTypes = {
  friends: PropTypes.array,
  onCancel: PropTypes.func,
  isNameDialogVisible: PropTypes.bool,
  friends: PropTypes.func,
  onSubmitName: PropTypes.func,
  onCheck: PropTypes.func,
};

export default IMCreateGroupComponent;

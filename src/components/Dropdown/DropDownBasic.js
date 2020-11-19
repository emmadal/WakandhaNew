import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStyles from '../../AppStyles';

const DropDownBasic = (props) => {
  const [opned, setOpned] = useState(false);
  const { colorSet } = props;
  return (
    <View>
      <TouchableOpacity onPress={() => setOpned(!opned)}>
        <Icon
          name="ellipsis-h"
          color={AppStyles.colorSet[colorSet].grey9}
          size={18}
        />
      </TouchableOpacity>
      {opned && (
        <View
          style={{
            position: 'absolute',
            height: 50,
            width: 100,
            top: 15,
            backgroundColor: '#fff',
            zIndex: 1000,
            right: 0,
          }}>
          <Text style={{ color: '#fff' }}>h</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default DropDownBasic;

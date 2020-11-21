import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const selectColor = '#DDB937';
const unSelectColor = '#949bb1';

export default class DrawerButton extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { textColor, icon, onPress, title } = this.props;
    return (
      <TouchableOpacity activeOpacity={1.0} onPress={onPress}>
        <View style={styles.btnStyle}>
          {icon}
          <Text
            style={{
              fontSize: 16,
              textAlign: 'left',
              marginLeft: 14,
              fontWeight: '600',
              color: textColor,
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    flexDirection: 'row',
    width: '90%',
    height: 40,

    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

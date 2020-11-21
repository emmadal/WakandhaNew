import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

function IMIconButton(props) {
  const { tintColor, onPress, source, marginRight, width, height } = props;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#181825',
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height,
        marginRight,
      }}
      onPress={onPress}>
      <Image
        resizeMode={'contain'}
        style={{ width: '50%', height: '50%', tintColor }}
        source={source}
      />
    </TouchableOpacity>
  );
}

export default IMIconButton;

import React from 'react';
import { View, Text, Image } from 'react-native';

function ShopWidget(props) {
  const { shopData } = props;
  const {
    shopPicture: { downloadURL },
    shopName,
    shopType,
  } = shopData;

  const mainYellowColor = '#DDB937';

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <Image
        source={{ uri: downloadURL }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 150,
          marginRight: 15,
        }}
        resizeMode={'cover'}
      />

      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            marginBottom: 5,
            color: mainYellowColor,
          }}>
          {shopName}
        </Text>

        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            color: mainYellowColor,
          }}>
          {shopType}
        </Text>
      </View>
    </View>
  );
  // }
}

export default ShopWidget;

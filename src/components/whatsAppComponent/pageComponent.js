import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class PageComponent extends Component {
  state = {};
  render() {
    return (
      <View
        style={{
          width: '90%',
          height: 60,
          alignSelf: 'center',
          backgroundColor: 'lightgrary',
          borderRadius: 30,
        }}>
        <View
          style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            resizeMode="stretch"
            source={require('../../../assets/images/dot_map.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: '600' }}>Page A</Text>
        </View>
      </View>
    );
  }
}
export default PageComponent;

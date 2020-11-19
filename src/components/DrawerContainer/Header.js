import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
class Header extends Component {
  render() {
    const { onPress, title, onCartPress } = this.props;
    return (
      <View
        style={{
          height: 60,
          flexDirection: 'row',

          paddingHorizontal: 10,
          alignItems: 'center',
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={onPress}
          activeOpacity={0.7}>
          <EvilIcons name={'navicon'} size={35} color={'#DDB937'} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            color: '#DDB937',
            fontWeight: '700',
            marginLeft: 20,
          }}>
          {title}
        </Text>
        {onCartPress && (
          <TouchableOpacity
            style={{ position: 'absolute', right: 22 }}
            onPress={onCartPress}>
            <FontAwesome5 name={'shopping-cart'} color={'#DDB937'} size={22} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default Header;

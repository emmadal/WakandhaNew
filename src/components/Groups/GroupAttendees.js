import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import Entypo from 'react-native-vector-icons/Entypo';

let tempUri = 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man.png';
class GroupAttendees extends Component {
  render() {
    const { data } = this.props;
    return (
      <View
        style={[
          styles.interested,
          { marginTop: 5, marginBottom: 7, marginLeft: 20 },
        ]}>
        {data.length &&
          data.map((item, index) => {
            let zIndex = index + 0.8;
            let negativeIndex = -zIndex;
            return (
              <FastImage
                style={[
                  styles.peopleImage,
                  { zIndex: negativeIndex, marginLeft: zIndex * -3 },
                ]}
                source={{
                  uri: tempUri,
                  priority: FastImage.priority.normal,
                  cache: FastImage.cacheControl.immutable,
                }}
              />
            );
          })}
        {data.length > 4 && (
          <View
            style={[
              styles.peopleImage,
              {
                zIndex: -6,
                marginLeft: -12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
              },
            ]}>
            <Entypo name={'dots-three-horizontal'} size={12} color={'white'} />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  peopleImage: {
    width: 37,
    height: 37,
    borderRadius: 17.5,
    borderWidth: 1,
    borderColor: '#DDB937',
    marginTop: -6,
  },

  interested: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default GroupAttendees;

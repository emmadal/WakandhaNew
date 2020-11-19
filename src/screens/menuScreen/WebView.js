import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';
import MainHeader from '../../navigators/mainHeader';
import { responsiveWidth } from 'react-native-responsive-dimensions';

class MyWebview extends React.Component {
  constructor(props, context) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  static navigationOptions = ({ screenProps, navigation }) => {
    const { params = {} } = navigation.state;
    return MainHeader({ navigation, params });
  };
  goBack() {
    this.props.navigator.pop();
  }

  render() {
    if (!this.props) {
      return null;
    } else {
      return (
        <View style={[{ flex: 1 }]}>
          <View
            style={{
              height: 50,
              width: '100%',
              backgroundColor: 'black',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ height: 20, width: 20 }} />
            <Image
              style={{
                width: responsiveWidth(30),
                height: 30,
                // alignSelf: 'center',
              }}
              source={require('../../../assets/images/app-logo.png')}
              resizeMode={'contain'}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack(null)}>
              <Image
                style={{
                  width: responsiveWidth(10),
                  height: 20,
                  //   alignSelf: 'flex-end',
                  tintColor: '#fff',
                }}
                source={require('../../../assets/icons/whtasappicon/arrow_down.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <WebView
            startInLoadingState={true}
            source={{ uri: 'https://wakandha.com/article' }}
          />
        </View>
      );
    }
  }
}

MyWebview.propTypes = {
  navigator: PropTypes.object,
  route: PropTypes.object,
};

export default MyWebview;

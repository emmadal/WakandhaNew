import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import styles from './styles';
import AppStyles from '../../AppStyles';

const HomeScreenComponents = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const LatestNewsScreenComponents = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

class HealthScreen extends Component {
  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      headerTitle: '',
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: '#DDB937',
    };
  };
  state = {
    index: 0,
    routes: [
      { key: 'pharmacies', title: 'Pharmacies' },
      { key: 'hôpitaux', title: 'Hôpitaux' },
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });
  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'pharmacies':
        return <HomeScreenComponents />;
      case 'hôpitaux':
        return (
          <LatestNewsScreenComponents navigation={this.props.navigation} />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TabView
          tabBarUnderlineColor={'#FFFF00'}
          inactiveColor={'#FFFF00'}
          activeColor={'#FFFF00'}
          renderTabBar={(props) => (
            <TabBar
              indicatorContainerStyle={{
                backgroundColor: '#000000',
              }}
              labelStyle={{
                fontSize: 13,
                fontWeight: 'bold',
              }}
              scrollEnabled={false}
              ovescroll={false}
              swipeEnabled={true}
              indicatorStyle={{
                backgroundColor: '#ffbf00',
                height: 2,
                borderRadius: 5,
              }}
              inactiveColor={'#807e7a'}
              activeColor={'#ffc400'}
              tabStyle={{ backgroundColor: '#fffffff' }}
              {...props}
            />
          )}
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          onIndexChange={this._handleIndexChange}
        />
      </View>
    );
  }
}
export default HealthScreen;

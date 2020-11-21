import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  BackHandler,
} from 'react-native';
import { connect, ReactReduxContext } from 'react-redux';
import Grid from 'react-native-grid-component';
import FastImage from 'react-native-fast-image';
import { WebView } from 'react-native-webview';
import authManager from '../../Core/onboarding/utils/authManager';
import { logout } from '../../Core/onboarding/redux/auth';
import MyWebview from './WebView';
import SocialNetworkConfig from '../../SocialNetworkConfig';

import MainHeader from '../../navigators/mainHeader';

import AppStyles from '../../AppStyles';
import styles from './styles';

class MenuScreen extends Component {
  static contextType = ReactReduxContext;

  static navigationOptions = ({ screenProps, navigation }) => {
    const { params = {} } = navigation.state;
    return MainHeader({ navigation, params });
  };

  // static navigationOptions = ({ screenProps, navigation }) => {
  //   let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
  //   return {
  //     headerTitle: 'Guiss',
  //     headerStyle: {
  //       backgroundColor: currentTheme.backgroundColor,
  //       borderBottomColor: currentTheme.hairlineColor,
  //     },
  //     headerTintColor: '#DDB937',
  //   };
  // };

  constructor(props) {
    super(props);
    this.state = {};

    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) => {
        this.willBlur = false;
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        );
      },
    );
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      (payload) => {
        this.willBlur = true;
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        );
      },
    );
  }

  onLogout() {
    authManager.logout(this.props.user);
    this.props.logout();
    this.props.navigation.navigate('LoadScreen', {
      appStyles: AppStyles,
      appConfig: SocialNetworkConfig,
    });
  }

  onweb() {
    // let passObj = Object.assign({}, Routes.MyWebview, {
    //   url: url,
    // });
    // this.props.navigator.push(passObj);
    // <WebView />;
  }
  renderMenuBloc = ({ title, backgroundColor, action, color }, i) => {
    return (
      <TouchableOpacity
        onPress={action}
        style={{
          backgroundColor,
          flex: 1,
          margin: 5,
          height: 40,
          borderRadius: 5,
          padding: 12,
        }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color,
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { user } = this.props;

    const menuList = [
      {
        title: 'Pages',
        backgroundColor: '#DDB937',
        color: 'black',
        action: () =>
          this.props.navigation.navigate('Page', {
            stackKeyTitle: 'Page',
            lastScreenTitle: 'Menu',
          }),
      },
      {
        title: 'Groupes',
        backgroundColor: '#9437DD',
        color: 'white',
        action: () => {
          this.props.navigation.navigate('GroupC', {
            stackKeyTitle: 'GroupC',
            lastScreenTitle: 'Menu',
          });
        },
      },
      { title: 'Musique', backgroundColor: '#2854F0', color: 'white' },
      {
        title: 'Dating',
        backgroundColor: '#DD3791',
        color: 'white',
      },
      {
        title: 'Guiss',
        backgroundColor: '#32CD32',
        color: 'white',
        action: () => {
          this.props.navigation.navigate('HomeScreen', {
            stackKeyTitle: 'HomeScreen',
            lastScreenTitle: 'Menu',
          });
        },
        // action: () => Linking.openURL('https://guiss.wakandha.com'),
      },
      { title: 'Portefeuille', backgroundColor: '#DD4137', color: 'white' },
      { title: 'Art', backgroundColor: '#FF8110', color: 'white' },
      { title: 'Eat', backgroundColor: '#21F9F6', color: 'black' },
      { title: 'Addictium', backgroundColor: '#FFFFFF', color: 'black' },
      { title: 'Eventium', backgroundColor: '#FFF000', color: 'black' },
      {
        title: 'Santé',
        backgroundColor: '#FF0003',
        color: 'white',
        action: () => {
          this.props.navigation.navigate('HealthScreen', {
            stackKeyTitle: 'HealthScreen',
            lastScreenTitle: 'Menu',
          });
        },
      },
      { title: '', backgroundColor: 'black', color: 'black' },
    ];

    const settingsList = [
      {
        title: 'Aide',
        action: () => this.props.navigation.push('MyWebview'),
        lastScreenTitle: 'Menu',
        appStyles: AppStyles,
        appConfig: SocialNetworkConfig,
      },
      {
        title: 'Paramètres',
        action: () =>
          this.props.navigation.navigate('ProfileProfileSettings', {
            lastScreenTitle: 'Menu',
            appStyles: AppStyles,
            appConfig: SocialNetworkConfig,
          }),
      },
      { title: 'Se déconnecter', action: () => this.onLogout() },
    ];

    return (
      <View style={styles.pageContainer}>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.textPageTitle}>Menu</Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('PageDetail', {
              stackKeyTitle: 'PageDetail',
              lastScreenTitle: 'Menu',
            })
          }
          style={{
            ...styles.containerRowCenter,
            paddingHorizontal: 10,
            marginBottom: 30,
          }}>
          <View
            style={{
              ...styles.pictureAvatar,
              borderColor: '#DDB937',
              borderWidth: 2,
              marginRight: 20,
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={{ flex: 1 }}
              source={{ uri: user?.profilePictureURL || null }}
            />
          </View>

          <View>
            <Text
              style={{
                ...styles.textSubTitle,
                marginBottom: 5,
              }}>
              {user.firstName} {user.lastName}
            </Text>

            <Text
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontWeight: '500',
                fontSize: 15,
              }}>
              Voir mon profil
            </Text>
          </View>
        </TouchableOpacity>

        <Grid
          contentContainerStyle={{ marginHorizontal: 5 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={this.renderMenuBloc}
          data={menuList}
          numColumns={2}
          ListFooterComponent={() =>
            settingsList.map(({ title, action }) => (
              <TouchableOpacity
                onPress={action}
                style={{
                  paddingHorizontal: 30,
                  borderTopWidth: 1,
                  borderTopColor: 'rgba(255,255,255,0.2)',
                  paddingTop: 10,
                  marginTop: 10,
                }}>
                <Text style={styles.textParagraph}>{title}</Text>
              </TouchableOpacity>
            ))
          }
        />
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {
  logout,
})(MenuScreen);

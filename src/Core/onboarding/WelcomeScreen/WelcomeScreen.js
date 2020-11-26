import React, { useState, useEffect } from 'react';
import Button from 'react-native-button';
import { Text, View, Image } from 'react-native';

import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import { IMLocalized } from '../../localization/IMLocalization';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { setUserData } from '../redux/auth';
import { connect } from 'react-redux';
import authManager from '../utils/authManager';

const WelcomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const appStyles =
    props.navigation.state.params.appStyles ||
    props.navigation.getParam('appStyles');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const appConfig =
    props.navigation.state.params.appConfig ||
    props.navigation.getParam('appConfig');

  useEffect(() => {
    tryToLoginFirst();
  }, []);

  const tryToLoginFirst = async () => {
    setIsLoading(true);
    authManager
      .retrievePersistedAuthUser(appConfig)
      .then((response) => {
        setIsLoading(false);
        if (response.user) {
          const user = response.user;
          props.setUserData({
            user: response.user,
          });
          props.navigation.navigate('MainStack', { user: user });
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  if (isLoading == true) {
    return <TNActivityIndicator appStyles={appStyles} />;
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ width: '30%', height: 100, alignSelf: 'center' }}
        source={require('../../../../assets/images/appIcon.png')}
        resizeMode={'contain'}
      />
      <Text style={styles.title}>
        {appConfig.onboardingConfig.welcomeTitle}
      </Text>
      <Text style={styles.caption}>
        {appConfig.onboardingConfig.welcomeCaption}
      </Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => props.navigation.navigate('Login', { appStyles, appConfig })}>
        {IMLocalized('Se connecter')}
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        onPress={() => props.navigation.navigate('Signup', { appStyles, appConfig })}>
        {IMLocalized("S'inscrire")}
      </Button>
    </View>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {
  setUserData,
})(WelcomeScreen);

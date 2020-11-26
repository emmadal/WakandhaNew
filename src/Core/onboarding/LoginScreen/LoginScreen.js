import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import { IMLocalized } from '../../localization/IMLocalization';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { setUserData } from '../redux/auth';
import authManager from '../utils/authManager';
import { localizedErrorMessage } from '../utils/ErrorCode';

const LoginScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const appStyles =
    props.navigation.state.params.appStyles ||
    props.navigation.getParam('appStyles');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const appConfig =
    props.navigation.state.params.appConfig ||
    props.navigation.getParam('appConfig');

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const onPressLogin = () => {
    setLoading(true);
    authManager
      .loginWithEmailAndPassword(email, password, appConfig)
      .then((response) => {
        if (response.user) {
          const user = response.user;
          props.setUserData({
            user: response.user,
          });
          props.navigation.navigate('MainStack', { user: user });
        } else {
          setLoading(false);
          Alert.alert(
            '',
            localizedErrorMessage(response.error),
            [{ text: IMLocalized('OK') }],
            {
              cancelable: false,
            },
          );
        }
      });
  };

  const onFBButtonPress = () => {
    authManager.loginOrSignUpWithFacebook(appConfig).then((response) => {
      if (response.user) {
        const user = response.user;
        props.setUserData({
          user: response.user,
        });
        props.navigation.navigate('MainStack', { user: user });
      } else {
        Alert.alert(
          '',
          localizedErrorMessage(response.error),
          [{ text: IMLocalized('OK') }],
          {
            cancelable: false,
          },
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <TouchableOpacity
          style={{ alignSelf: 'flex-start' }}
          onPress={() => props.navigation.goBack()}>
          <Image
            style={appStyles.styleSet.backArrowStyle}
            source={appStyles.iconSet.backArrow}
          />
        </TouchableOpacity>

        <Image
          style={{ width: '30%', height: 100, alignSelf: 'center' }}
          source={require('../../../../assets/images/appIcon.png')}
          resizeMode={'contain'}
        />

        <Text style={styles.title}>{IMLocalized('Se connecter')}</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('E-mail ou Numéro de téléphone')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.InputContainer}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder={IMLocalized('Mot de passe')}
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => onPressLogin()}>
          {IMLocalized('Se connecter')}
        </Button>

          <TouchableOpacity
            containerStyle={styles.phoneNumberContainer}
            style={styles.bottomTextContainer}
            onPress={() =>
              props.navigation.navigate('Signup', { appStyles, appConfig })
            }>
            <Text style={styles.textBottomLight}>{IMLocalized("Vous n'avez pas de compte?")}{"  "}</Text>
            <Text style={styles.textBottom}>{IMLocalized("S'inscrire")}</Text>
          </TouchableOpacity>

        {loading && <TNActivityIndicator appStyles={appStyles} />}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default connect(null, {
  setUserData,
})(LoginScreen);

import React, { useState, useEffect } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import { Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { MenuProvider } from 'react-native-popup-menu';
import configureStore from './redux/store';
import AppContainer from './screens/AppContainer';
import { setI18nConfig } from './Core/localization/IMLocalization';
import * as FacebookAds from 'expo-ads-facebook';
import SocialNetworkConfig from './SocialNetworkConfig';
import { enableScreens } from 'react-native-screens';

if (SocialNetworkConfig.adsConfig) {
  FacebookAds.AdSettings.addTestDevice(
    FacebookAds.AdSettings.currentDeviceHash,
  );
  FacebookAds.AdSettings.setLogLevel('debug');
}

const store = configureStore();
const handleLocalizationChange = () => {
  setI18nConfig();
};

const App = (props) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  enableScreens();

  useEffect(() => {
    SplashScreen.hide();
    YellowBox.ignoreWarnings(['Remote Debugger']);
    console.disableYellowBox = true;
    setI18nConfig();
    Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <AppearanceProvider>
          <MenuProvider>
            <AppContainer screenProps={{ theme: colorScheme }} />
          </MenuProvider>
        </AppearanceProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;

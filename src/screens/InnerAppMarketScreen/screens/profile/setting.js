import React from 'react';

import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Switch } from 'react-native';
import { Header, ListItem, ThemedView } from '../../components';
import {
  TextHeader,
  CartIcon,
  IconHeader,
} from '../../containers/HeaderComponent';
import Container from '../../containers/Container';
import Language from './containers/Language';
import Currency from './containers/Currency';
import ConfigAdvanced from './containers/Advanced';

import { themeSelector } from '../../modules/common/selectors';
import { switchMode } from '../../modules/common/actions';
import { DARK } from '../../modules/common/constants';
import { mainStack } from '../../config/navigator';

import { ENABLE_CONFIG_DEMO } from '../../config/development';

class SettingScreen extends React.Component {
  render() {
    const { t, theme, navigation } = this.props;
    const titleProps = {
      medium: true,
    };
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('common:text_setting')} />}
          rightComponent={<CartIcon />}
        />
        <Container>
          <Language title={t('profile:text_language')} />
          <Currency title={t('profile:text_currency')} />
          <ConfigAdvanced title={t('profile:text_config_advanced')} />
          <ListItem
            title={t('profile:text_dark')}
            type="underline"
            titleProps={titleProps}
            rightElement={
              <Switch
                value={theme === DARK}
                onValueChange={this.props.switchMode}
              />
            }
          />
          {/* {ENABLE_CONFIG_DEMO && (
            <ListItem
              title={'Test Store'}
              type="underline"
              titleProps={titleProps}
              onPress={() => navigation.navigate(mainStack.demo_config)}
            />
          )} */}
        </Container>
      </ThemedView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    theme: themeSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  switchMode: () => dispatch(switchMode()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(SettingScreen));

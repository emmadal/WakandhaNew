import React from 'react';
import { Text, Linking, View } from 'react-native';
import { IMLocalized } from '../../localization/IMLocalization';

const TermsOfUseView = (props) => {
  const { tosLink, style } = props;
  return (
    <View style={style}>
      <Text style={{ fontSize: 12 }}>
        En créant votre compte, vous acceptez nos conditions d'utilisation.
      </Text>
    </View>
  );
};

export default TermsOfUseView;

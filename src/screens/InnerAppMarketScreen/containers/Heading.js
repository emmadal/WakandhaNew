// @flow
import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../components';
import { padding } from '../components/config/spacing';
import { sizes } from '../components/config/fonts';

type Props = {
  title: string,
  subTitle?: string,
  onPress?: Function,
};

const Heading = function (props: Props) {
  const {
    title,
    subTitle,
    onPress,
    subTitleComponent,
    style,
    containerStyle,
  } = props;

  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <Text medium style={[styles.textTitle, style && style]}>
        {title}
      </Text>
      {subTitleComponent ? (
        subTitleComponent
      ) : subTitle ? (
        <TouchableOpacity onPress={onPress} style={styles.touchSubtitle}>
          <Text colorThird h6>
            {subTitle}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: padding.big,
  },
  textTitle: {
    flex: 1,
    fontSize: sizes.h3,
    paddingRight: padding.large,
  },
  touchSubtitle: {
    paddingVertical: 5,
    justifyContent: 'center',
  },
});

Heading.defaultProps = {
  onPress: () => {},
};

export default Heading;

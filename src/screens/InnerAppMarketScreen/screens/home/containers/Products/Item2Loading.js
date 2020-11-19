import * as React from 'react';
import { ThemedView, ThemeConsumer } from '../../../../components';
import { padding } from '../../../../components/config/spacing';

function Item2Loading(props) {
  const { height, style } = props;
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <ThemedView
          colorSecondary
          style={[
            {
              height: height + 2 * padding.small,
              borderBottomWidth: 1,
              borderColor: theme.colors.border,
            },
            style && style,
          ]}
        />
      )}
    </ThemeConsumer>
  );
}

export default Item2Loading;

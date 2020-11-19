import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, Icon, Text } from './styles';

import icon from '../../../../assets/icons/icon.png';

export const Header = (props) => {
  return (
    <Container>
      <Icon source={icon} />
      <TouchableOpacity>
        <Text>TV Shows</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Films</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Ma Liste</Text>
      </TouchableOpacity>
    </Container>
  );
};

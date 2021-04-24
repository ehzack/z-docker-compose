import styled from 'styled-components';
import {View, Container, Content} from 'native-base';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import platform from '../../../../native-base-theme/variables/platform';

const Link = ({className, children}) => (
  <Container>
    <LinearGradient
      start={{x: 1, y: 0.9}}
      colors={['#645AFF', '#A573FF']}
      style={{
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}>
        {children}
      </View>
    </LinearGradient>
  </Container>
);

const ViewWrapper = styled(Link)``;

export default Link;

import styled from 'styled-components';
import {View, Container, Content} from 'native-base';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import platform from '../../../../native-base-theme/variables/platform';

const Link = ({className, children}) => (
  <Container>
    <LinearGradient
      start={{x: 1, y: 0.8}}
      colors={['#14D2B8', '#0EAED1']}
      style={{
        width: '100%',
        height: '100%',
        paddingTop: platform.getRelativeHeight(50),
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#FAFBFD',
          position: 'relative',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}>
        <Content
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 10,
            paddingLeft: platform.getRelativeWidth(32),
            paddingRight: platform.getRelativeWidth(32),
          }}>
          {children}
        </Content>
      </View>
    </LinearGradient>
  </Container>
);

const ViewWrapper = styled(Link)``;

export default Link;

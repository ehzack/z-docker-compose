import styled from 'styled-components';
import {View, Container, Content} from 'native-base';
import React, {Component} from 'react';
import platform from '../../../../native-base-theme/variables/platform';
import Toast from '../../shared/items/toast';

const Link = ({className, children, style, center}) => (
  <Container
    style={{
      backgroundColor: '#FAFBFD',
      flex: 1,
    }}>
    <Content
      contentContainerStyle={[
        {
          alignItems: 'center',
          flexDirection: 'column',
          flexGrow: 1,
          width: '100%',
          paddingLeft: platform.getResponsiveWidth(10),
          paddingRight: platform.getResponsiveWidth(10),
        },
        style,
      ]}>
      {children}
    </Content>
  </Container>
);

const ViewWrapper = styled(Link)``;

export default Link;

import styled from 'styled-components';
import { Container, Content } from 'native-base';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import platform from '../../../../native-base-theme/variables/platform';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from '../../shared/items/toast';
import BackIcon from '../../../../assets/icons/navigation/leftWhite.svg';
import NavigationServices from '../../../navigation/NavigationService';

const Link = ({ className, children, style, Icon, Title }) => (
  <Container
    style={{
      backgroundColor: '#FAFBFD',
      flex: 1,
    }}
  >
    <LinearGradient
      style={{ flex: 1, alignItems: 'center' }}
      colors={['#0EAED1', '#14D2B8']}
    >
      {children}
    </LinearGradient>
  </Container>
);

const ViewWrapper = styled(Link)``;

export default Link;

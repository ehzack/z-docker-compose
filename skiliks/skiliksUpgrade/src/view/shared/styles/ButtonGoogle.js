import styled from 'styled-components';
import { View, Container, Content } from 'native-base';
import React, { Component } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import platform from '../../../../native-base-theme/variables/platform';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Link = ({ className, children, handleSubmit, loading, style }) => (
  <TouchableOpacity
    rounded
    onPress={(e) => handleSubmit()}
    style={[
      {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        height: platform.getResponsiveHeight(7),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        paddingLeft: platform.getRelativeWidth(24),
        paddingRight: platform.getRelativeWidth(24),
      },
      style,
      Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        },
        android: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 2,
        },
      }),
    ]}
  >
    <Image
      source={require('../../../../assets/icons/socials/Google.png')}
      style={{
        width: platform.normalize(15),
        height: platform.normalize(15),
        position: 'absolute',
        left: '10%',
      }}
    />
    <Text
      style={{
        fontSize: platform.normalize(16),
        color: platform.brandSuccess,
        fontFamily: 'CalibriBold',
        textAlign: 'center',
      }}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

const ViewWrapper = styled(Link)``;

export default Link;

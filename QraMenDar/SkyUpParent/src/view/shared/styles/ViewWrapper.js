import styled from 'styled-components';
import {Container, Content} from 'native-base';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity, View, Text} from 'react-native';
import platform from '../../../../native-base-theme/variables/platform';
import NavigationServices from '../../../navigation/NavigationService';
import BackIcon from '../../../../assets/icons/navigation/leftWhite.svg';

const Link = ({
  className,
  children,
  Title,
  Keyword,
  withoutPadding,
  WithBottomIcon,
}) => (
  <Container>
    <LinearGradient
      start={{x: 1, y: 0.8}}
      colors={['#0EAED1', '#14D2B8']}
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
      }}>
      <View
        style={{
          paddingLeft: !withoutPadding ? platform.getRelativeWidth(32) : 0,
          paddingRight: !withoutPadding ? platform.getRelativeWidth(32) : 0,
          flex: 1,
        }}>
        <View
          style={{
            widht: '100%',
            height: '20%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              NavigationServices.goBack();
            }}
            style={{
              position: 'absolute',
              width: platform.getRelativeWidth(20),
              justifyContent: 'center',
              alignItems: 'center',
              left: platform.getResponsiveWidth(8),
            }}>
            <BackIcon />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: 'CalibriBold',
              fontSize: platform.normalize(22),
              textAlign: 'center',
              color: 'white',
            }}>
            {Title}
          </Text>
        </View>

        {children}
      </View>

      {WithBottomIcon}
    </LinearGradient>
  </Container>
);

const ViewWrapper = styled(Link)``;

export default Link;

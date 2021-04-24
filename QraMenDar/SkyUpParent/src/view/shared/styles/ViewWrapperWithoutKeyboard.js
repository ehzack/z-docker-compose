import styled from 'styled-components';
import {View, Container, Content} from 'native-base';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import platform from '../../../../native-base-theme/variables/platform';

const Link = ({className, children}) => (
  <View style={{flex: 1}}>
    <LinearGradient
      start={{x: 1, y: 0.8}}
      colors={['#645AFF', '#A573FF']}
      style={{
        width: '100%',
        height: '100%',
        paddingTop: platform.getRelativeHeight(22),
      }}>
      <LinearGradient
        start={[1, 0.8]}
        colors={['rgba(100, 90, 255, 0.8)', 'rgba(100, 90, 255, 0.8)']}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingTop: platform.getRelativeHeight(30),
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#FAFBFD',
            position: 'relative',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,

            paddingTop: platform.getRelativeHeight(27),
          }}>
          {children}
        </View>
      </LinearGradient>
    </LinearGradient>
  </View>
);

const ViewWrapper = styled(Link)``;

export default Link;

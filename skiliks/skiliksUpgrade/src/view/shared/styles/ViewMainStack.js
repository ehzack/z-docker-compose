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

const Link = ({ className, children, style, Title, Icon, secondTitle }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#F6F8FB',
      justifyContent: 'space-between',
    }}
  >
    <View
      style={{
        flex: 0.2,
        width: platform.getResponsiveWidth(100),
        zIndex: 999999,
      }}
    >
      <View style={{ height: '80%' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LinearGradient
            colors={['#0EAED1', '#14D2B8']}
            start={[0, 1]}
            end={[0.9, 0]}
            style={{
              alignItems: 'center',
              width: platform.getResponsiveWidth(100) * 3,
              height: platform.getResponsiveWidth(100) * 3,
              borderRadius: platform.getResponsiveWidth(100) * 2,
              position: 'absolute',
              top: -platform.getResponsiveWidth(100) * 2.67,
            }}
          ></LinearGradient>
        </View>

        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              NavigationServices.goBack();
            }}
            style={{
              position: 'absolute',
              width: platform.getResponsiveWidth(10),
              height: platform.getResponsiveHeight(5),
              justifyContent: 'center',
              alignItems: 'flex-start',
              left: platform.getResponsiveWidth(8),
            }}
          >
            <BackIcon />
          </TouchableOpacity>
          <View style={{ width: platform.getResponsiveWidth(60) }}>
            <Text
              style={{
                fontFamily: 'CalibriBold',
                fontSize: platform.normalize(22),
                textAlign: 'center',
                color: 'white',
              }}
            >
              {Title}
            </Text>
            <Text
              style={{
                fontFamily: 'Calibri',
                fontSize: platform.normalize(12),
                textAlign: 'center',
                color: '#24F0B6',
              }}
            >
              {secondTitle}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          top: platform.getResponsiveHeight(12),
        }}
      >
        {Icon}
      </View>
    </View>

    <View
      style={{
        flex: 0.8,
        alignItems: 'center',
        zIndex: 0,
      }}
    >
      {children}
    </View>
  </View>
);

const ViewWrapper = styled(Link)``;

export default Link;

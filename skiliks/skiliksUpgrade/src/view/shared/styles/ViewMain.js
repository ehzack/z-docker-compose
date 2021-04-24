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

const Link = ({
  className,
  children,
  style,
  Icon,
  Title,
  NavigateTo,
  DisableGoBack,
  Sticky,
}) => (
  <Container
    style={{
      backgroundColor: '#FAFBFD',
      flex: 1,
    }}
  >
    <Content
      contentContainerStyle={[
        {
          alignItems: 'center',
          flexDirection: 'column',
          flexGrow: 1,
          width: '100%',
        },
        style,
      ]}
    >
      <View
        style={{
          height: platform.getResponsiveHeight(25),
          width: platform.getResponsiveWidth(100),
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
                top: -platform.getResponsiveWidth(100) * 2.7,
              }}
            ></LinearGradient>
          </View>

          <View
            style={{
              widht: '100%',
              height: '50%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!DisableGoBack && (
              <TouchableOpacity
                onPress={() => {
                  {
                    NavigateTo ? NavigateTo() : NavigationServices.goBack();
                  }
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
            )}

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
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            alignItems: 'center',
            top: platform.getResponsiveHeight(10),
          }}
        >
          {Icon}
        </View>
      </View>
      <View
        style={{
          paddingLeft: platform.getResponsiveWidth(7),
          paddingRight: platform.getResponsiveWidth(7),
          width: '100%',
        }}
      >
        {children}
      </View>
    </Content>
  </Container>
);

const ViewWrapper = styled(Link)``;

export default Link;

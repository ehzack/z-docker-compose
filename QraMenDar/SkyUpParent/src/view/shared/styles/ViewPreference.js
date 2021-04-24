import styled from 'styled-components';
import {Container, Content} from 'native-base';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import platform from '../../../../native-base-theme/variables/platform';
import Toast from '../../shared/items/toast';
import BackIcon from '../../../../assets/icons/navigation/leftWhite.svg';
import NavigationServices from '../../../navigation/NavigationService';

const Link = ({
  className,
  children,
  style,
  ProfileContainer,
  Title,
  goBack,
  disableBackIcon,
}) => (
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
        },
        style,
      ]}>
      <View
        style={{
          width: platform.getResponsiveWidth(100),
        }}>
        <View style={{width: '100%'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LinearGradient
              colors={['#0EAED1', '#14D2B8']}
              start={{x: 0, y: 1}}
              end={{x: 0.9, y: 0}}
              style={{
                alignItems: 'center',
                width: platform.getResponsiveWidth(100) * 3,
                height: platform.getResponsiveWidth(100) * 3,
                borderRadius: platform.getResponsiveWidth(100) * 2,
                position: 'absolute',
                top: -platform.getResponsiveWidth(100) * 2.6,
              }}></LinearGradient>
          </View>

          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                width: '100%',
                height: platform.getResponsiveHeight(5),
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {!disableBackIcon && (
                <TouchableOpacity
                  onPress={() => {
                    if (goBack) {
                      goBack();
                    } else {
                      NavigationServices.goBack();
                    }
                  }}
                  style={{
                    position: 'absolute',
                    width: platform.getResponsiveWidth(10),
                    height: platform.getResponsiveHeight(5),
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    left: platform.getResponsiveWidth(8),
                  }}>
                  <BackIcon />
                </TouchableOpacity>
              )}

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
          </View>
        </View>
      </View>
      <View
        style={{
          paddingLeft: platform.getResponsiveWidth(5),
          paddingRight: platform.getResponsiveWidth(5),
          width: '100%',
        }}>
        {children}
      </View>
    </Content>
  </Container>
);

const ViewWrapper = styled(Link)``;

export default Link;

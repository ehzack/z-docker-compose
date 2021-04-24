import styled from 'styled-components';
import { Container, Content } from 'native-base';
import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import platform from '../../../../native-base-theme/variables/platform';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Link = ({
  className,
  children,
  handleSubmit,
  loading,
  fontSize,
  bold,
  style,
  disabled,
  scroll,
  styleText,
  backgroundColor,
}) => (
  <View
    style={{
      width: '100%',
      paddingTop: scroll ? platform.getResponsiveHeight(2) : 0,
      paddingBottom: scroll ? platform.getResponsiveHeight(2) : 0,
    }}
  >
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        !loading ? handleSubmit() : '';
      }}
      style={[
        {
          backgroundColor: backgroundColor || platform.brandPrimary,
          flexDirection: 'row',
          width: '100%',
          height: platform.getResponsiveHeight(7),
          paddingLeft: '10%',
          paddingRight: '10%',

          alignItems: 'center',
          borderRadius: 50,
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 2,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color="rgba(228, 228, 228, 0.43)"
        />
      ) : (
        <Text
          style={[
            {
              fontSize: fontSize
                ? platform.normalize(fontSize)
                : platform.normalize(18),
              fontFamily: bold ? 'CalibriBold' : 'Calibri',
              color: 'white',
              textAlign: 'center',
            },
            styleText,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  </View>
);

const ViewWrapper = styled(Link)``;

export default Link;

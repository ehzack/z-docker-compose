import React, { Component, useState } from 'react';

import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import platform from '../../../../native-base-theme/variables/platform';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SwitchSelector from 'react-native-switch-selector';

import PropTypes from 'prop-types';
import { FastField } from 'formik';
import { View } from 'native-base';

const SwitchFormItemNotFast = ({
  className,
  field,
  value,
  onChangeText,
  onBlur,
  secureTextEntry,
  placeholder,
  style,
  keyboardType,
  editable,
  multiline,
  maxLength,
  removeSpacing,
  options,
  error,
  scroll,
}) => {
  return (
    <View
      style={{
        width: '100%',
        paddingTop: scroll ? platform.getResponsiveHeight(1) : 0,
        paddingBottom: scroll ? platform.getResponsiveHeight(1) : 0,
      }}
    >
      <SwitchSelector
        initial={value == 'male' ? 0 : value == 'female' ? 1 : 0}
        borderRadius={50}
        onPress={(value) => onChangeText(value)}
        textColor="#2C2929" //'#7a44cf'
        selectedColor={platform.brandDark}
        buttonColor={platform.brandPrimary}
        borderColor={'white'}
        animationDuration={200}
        onChangeText={(data) => {
          onChangeText(removeSpacing ? data.replace(/\s/g, '') : data);
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
        textStyle={{
          fontFamily: 'Calibri',
          fontSize: platform.getRelativeWidth(18),
        }}
        selectedTextStyle={{
          fontFamily: 'Calibri',
          fontSize: platform.getRelativeWidth(18),
          color: 'white',
        }}
        hasPadding
        style={{
          paddingLeft: platform.getRelativeWidth(10),
          paddingRight: platform.getRelativeWidth(10),
          backgroundColor: 'white',
          height: platform.getRelativeHeight(58),

          borderRadius: 50,

          justifyContent: 'center',
          alignItems: 'center',
          color: '#2C2929',
          shadowColor: 'rgb(78, 79, 114)',
          shadowOffset: {
            width: 50,
            height: 50,
          },
          shadowOpacity: 1,
          shadowRadius: 1,

          elevation: 4,
        }}
        options={options}
      />
      {error && (
        <Text
          style={{
            fontFamily: 'Calibri',
            fontSize: platform.getRelativeWidth(11),
            color: '#F57969',
            paddingLeft: platform.getRelativeWidth(15),
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

class SwitchItem extends Component {
  render() {
    return (
      <FastField name={this.props.name}>
        {({ form }) => <SwitchFormItemNotFast {...this.props} form={form} />}
      </FastField>
    );
  }
}

export default SwitchItem;

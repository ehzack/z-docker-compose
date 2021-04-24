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

import PropTypes from 'prop-types';
import { FastField } from 'formik';
import { View } from 'native-base';
import Eye from 'assets/icons/popular/eyse.png';

const TextInputFormItemNotFast = ({
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
  error,
  scroll,
  textArea,
  styleTextInput,
  textAlign,
}) => {
  const [IsVisible, setVisible] = useState(false);
  const [ShowEye, setShowEye] = useState(false);

  return (
    <View
      style={{
        width: '100%',
        paddingTop: scroll ? platform.getResponsiveHeight(1) : 0,
        paddingBottom: scroll ? platform.getResponsiveHeight(1) : 0,
      }}
    >
      <View
        style={[
          {
            width: '100%',
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: 50,
            borderWidth: error ? 1 : 0,
            borderColor: '#F57969',
            height: platform.getResponsiveHeight(7),
          },
          style,

          Platform.select({
            ios: {
              elevation: 2,
            },
            android: {
              elevation: 2,
            },
          }),
        ]}
      >
        <TextInput
          editable={editable}
          multiline={multiline}
          maxLength={maxLength}
          style={[
            {
              height: '100%',
              width: secureTextEntry ? '90%' : '100%',
              paddingLeft: platform.getRelativeWidth(35),
              paddingRight: platform.getRelativeWidth(35),
              fontSize: platform.normalize(15),
              fontFamily: 'Calibri',
              color: 'black',
            },
            styleTextInput,
          ]}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !IsVisible}
          onChangeText={(data) => {
            onChangeText(removeSpacing ? data.replace(/\s/g, '') : data);
          }}
          placeholder={placeholder}
          onFocus={() => setShowEye(true)}
          onBlur={(data) => {
            setShowEye(false);
            onBlur(data);
          }}
          value={value}
          textAlign={textAlign || 'left'}
        />
        {secureTextEntry && ShowEye && (
          <TouchableOpacity
            onPress={() => setVisible(!IsVisible)}
            style={{ padding: platform.normalize(5) }}
          >
            <Image
              source={
                !IsVisible
                  ? require('assets/icons/popular/eyse.png')
                  : require('assets/icons/popular/eyseClose.png')
              }
              style={{
                width: platform.normalize(15),
                height: platform.normalize(15),
                opacity: 0.7,
              }}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text
          style={{
            fontFamily: 'Calibri',
            fontSize: platform.normalize(12),
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

class TextInputItem extends Component {
  render() {
    return (
      <FastField name={this.props.name}>
        {({ form }) => <TextInputFormItemNotFast {...this.props} form={form} />}
      </FastField>
    );
  }
}

export default TextInputItem;

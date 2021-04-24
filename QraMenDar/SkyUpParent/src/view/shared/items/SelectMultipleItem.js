import React, { Component, useState } from "react";

import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  TextInput,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import platform from "../../../../native-base-theme/variables/platform";

import PropTypes from "prop-types";
import { FastField } from "formik";
import { View } from "native-base";

const SelectMultipleItemNotFast = ({
  className,
  field,
  value,
  onChangeText,
  onBlur,
  placeholder,
  style,
  keyboardType,
  editable,
  multiline,
  maxLength,
  removeSpacing,
  error,
}) => {
  return <View style={{ width: "100%" }}></View>;
};

class SelectMultipleItem extends Component {
  render() {
    return (
      <FastField name={this.props.name}>
        {({ form }) => (
          <SelectMultipleItemNotFast {...this.props} form={form} />
        )}
      </FastField>
    );
  }
}

export default SelectMultipleItem;

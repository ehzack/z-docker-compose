import React, { Component, useState } from "react";

import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  TextInput,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import platform from "../../../../../native-base-theme/variables/platform";

import PropTypes from "prop-types";
import { FastField } from "formik";
import CustomMarker from "./CustomMarker";
import CustomLabel from "./CustomLabel";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
const SlideFormItemNotFast = ({
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
  handleChange,
}) => {
  console.log("Value Slide *** ======= ", value);
  return (
    <View
      style={{
        width: "100%",
        paddingTop: scroll ? platform.getResponsiveHeight(2) : 0,
        paddingBottom: scroll ? platform.getResponsiveHeight(2) : 0,
      }}
    >
      <MultiSlider
        values={
          Array.isArray(value) && value.length > 0 ? value : [1000, 50000]
        }
        allowOverlap={false}
        isMarkersSeparated={true}
        enabledTwo={true}
        min={1000}
        max={50000}
        step={1000}
        snapped
        onValuesChange={(e) => {
          handleChange(e);
        }}
        markerOffsetY={platform.getResponsiveHeight(1.5)}
        containerStyle={{
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 15,
          width: "100%",
        }}
        sliderLength={platform.getResponsiveWidth(80)}
        trackStyle={{
          height: 10,
          backgroundColor: "#E4E4E4",
        }}
        selectedStyle={{
          backgroundColor: "#7041EE",
        }}
        customMarkerLeft={(e) => <CustomMarker value={e.currentValue} />}
        customMarkerRight={(e) => <CustomMarker value={e.currentValue} />}
      />
    </View>
  );
};

class SlideItemForm extends Component {
  render() {
    return (
      <FastField name={this.props.name}>
        {({ form }) => <SlideFormItemNotFast {...this.props} form={form} />}
      </FastField>
    );
  }
}

export default SlideItemForm;

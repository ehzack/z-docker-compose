import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, TextInput,Platform } from "react-native";
import plateform from "../../../../native-base-theme/variables/platform";

import PropTypes from "prop-types";
import { FastField } from "formik";

class ButtonItemRateForm extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    var { value } = this.props;
    this.setState({ value });
  }
  OnChangeRate = (key) => {
    var { value } = this.state;
    var { index } = this.props;
    if (key < 0) {
      value.rate = Math.abs(key);
    } else {
      value.rate = key;
    }
    this.props.handleUpdateRate(value, key, index);
  };

  handleDelete = (item) => {
    var { index } = this.props;
    this.props.handleDelete(index);
  };

  render() {
    //const { loading } = this.state;

    const {
      form,
      label,
      name,
      hint,
      layout,
      size,
      placeholder,
      autoFocus,
      formItemProps,
      inputProps,
      errorMessage,
      defaultActiveFirstOption,
      allowClear,
      mode,
      required,
      styleTextItem,
      value,
      withRate,
      styleItem,
      disableClose,
      imageIcon,
      disableDeleteIcon,
      handlePress,
    } = this.props;

    var rate = value.rate ? value.rate : 0;
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[
          {
            width: plateform.getRelativeWidth(325),
            height: plateform.getRelativeHeight(48),
            backgroundColor: "white",
            borderRadius: 25,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: plateform.getRelativeWidth(15),
            paddingRight: plateform.getRelativeWidth(15),
            marginTop: plateform.getRelativeHeight(14),
            color: "black",
          },
          styleItem,
          Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            },
            android: {
              shadowColor: "rgb(78, 79, 114)",
              shadowOffset: {
                width: 50,
                height: 50,
              },
              shadowOpacity: 1,
              shadowRadius: 1,

              elevation: 4,
            },
          }),
        ]}
      >
        {imageIcon && (
          <Image
            style={{
              width: plateform.getRelativeWidth(34),
              height: plateform.getRelativeHeight(26),
            }}
            source={imageIcon}
          />
        )}
        <Text
          style={[
            {
              fontSize: plateform.getRelativeWidth(18),
              fontFamily: "Calibri",
              color: "black",
            },
            styleTextItem,
          ]}
        >
          {value.label}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {withRate &&
              Array.from(Array(5).keys()).map((e, index) => {
                if (rate >= index + 1) {
                  return (
                    <TouchableOpacity
                      onPress={() => this.OnChangeRate(-(index + 1))}
                      style={{ marginLeft: plateform.getRelativeWidth(5) }}
                    >
                      <Image
                        style={{
                          width: plateform.getRelativeWidth(17),
                          height: plateform.getRelativeWidth(17),
                        }}
                        source={require("../../../../assets/icons/popular/StarY.png")}
                      />
                    </TouchableOpacity>
                  );
                }
                return (
                  <TouchableOpacity
                    onPress={() => this.OnChangeRate(index + 1)}
                    style={{ marginLeft: plateform.getRelativeWidth(5) }}
                  >
                    <Image
                      style={{
                        width: plateform.getRelativeWidth(17),
                        height: plateform.getRelativeWidth(17),
                      }}
                      source={require("../../../../assets/icons/popular/StarNGris.png")}
                    />
                  </TouchableOpacity>
                );
              })}
          </View>
          {!disableDeleteIcon && (
            <TouchableOpacity
              onPress={() => this.handleDelete()}
              style={{
                height: plateform.getRelativeHeight(48),
                width: "20%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../../../assets/icons/popular/closeIcon.png")}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default ButtonItemRateForm;

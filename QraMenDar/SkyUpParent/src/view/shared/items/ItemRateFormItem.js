import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import plateform from "../../../../native-base-theme/variables/platform";

import PropTypes from "prop-types";
import { FastField } from "formik";
import { Rating, AirbnbRating } from "react-native-ratings";
import Remove from "../../../../assets/icons/popular/Delete.svg";

class ItemRateFormItem extends Component {
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
    // if (key < 0) {
    //   value.rate = Math.abs(key);
    // } else {
    //   value.rate = key;
    // }
    value.rate = key;

    // console.log("PArams======= ", value, key, index);
    this.props.handleUpate(value, key, index);
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
      backgroundColorRate,
    } = this.props;

    var rate = value.rate ? value.rate : 0;

    return (
      <View
        style={{
          height: plateform.getResponsiveHeight(10),
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={[
            {
              width: "100%",
              height: plateform.getResponsiveHeight(7),
              backgroundColor: "white",
              borderRadius: 50,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: plateform.getResponsiveWidth(6),
              paddingRight: plateform.getResponsiveWidth(6),

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
            <TouchableOpacity onPress={handlePress}>
              <Image
                style={{
                  width: plateform.getResponsiveWidth(9),
                  height: plateform.getResponsiveHeight(4),
                  resizeMode: "contain",
                }}
                source={imageIcon}
              />
            </TouchableOpacity>
          )}
          <Text
            style={[
              {
                fontSize: plateform.normalize(14),
                fontFamily: "Calibri",
                color: "black",
              },
              styleTextItem,
            ]}
          >
            {value.label ? value.label : value.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {
                withRate && (
                  <Rating
                    type="custom"
                    onFinishRating={this.OnChangeRate}
                    imageSize={plateform.normalize(18)}
                    ratingCount={5}
                    startingValue={rate}
                    tintColor={backgroundColorRate}
                  />
                )
                // Array.from(Array(5).keys()).map((e, index) => {
                //   if (rate >= index + 1) {
                //     return (
                //       <TouchableOpacity
                //         onPress={() => this.OnChangeRate(-(index + 1))}
                //         style={{ marginLeft: plateform.getRelativeWidth(5) }}
                //       >
                //         <Image
                //           style={{
                //             width: plateform.getRelativeWidth(17),
                //             height: plateform.getRelativeWidth(17),
                //           }}
                //           source={require("../../../../assets/icons/popular/StarY.png")}
                //         />
                //       </TouchableOpacity>
                //     );
                //   }
                //   return (
                //     <TouchableOpacity
                //       onPress={() => this.OnChangeRate(index + 1)}
                //       style={{ marginLeft: plateform.getRelativeWidth(5) }}
                //     >
                //       <Image
                //         style={{
                //           width: plateform.getRelativeWidth(17),
                //           height: plateform.getRelativeWidth(17),
                //         }}
                //         source={require("../../../../assets/icons/popular/StarNGris.png")}
                //       />
                //     </TouchableOpacity>
                //   );
                // })
              }
            </View>
            {!disableDeleteIcon && (
              <TouchableOpacity
                onPress={() => this.handleDelete()}
                style={{
                  paddingLeft: plateform.getResponsiveWidth(8),
                }}
              >
                <Remove
                  width={plateform.normalize(16)}
                  height={plateform.normalize(16)}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default ItemRateFormItem;

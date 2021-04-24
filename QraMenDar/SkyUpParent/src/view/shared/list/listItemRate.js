import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import plateform from "../../../../native-base-theme/variables/platform";

import PropTypes from "prop-types";
import { FastField } from "formik";
import ItemRateFormItem from "../items/ItemRateFormItem";
import { Item } from "native-base";
import i18n, { setLanguageCode, getFlags } from "i18n/index";

class ListRateFormItem extends Component {
  handleUpate = (item, newRate, index) => {
    var { value } = this.props;

    value[index].rate = item.rate;
    this.props.handlUpdate(value);
  };
  handleDelete = async (indexArray) => {
    var { value } = this.props;

    var filtred = value.filter((el, index) => {
      return index != indexArray;
    });
    await this.props.handlUpdate(filtred);
  };

  render() {
    //const { loading } = this.state;

    const {
      value,
      withRate,
      styleItem,
      styleTextItem,
      isLanguage,
    } = this.props;
    console.log(value);
    console.log(isLanguage);
    return (
      <View
        style={{
          paddingTop: plateform.getResponsiveHeight(1),
          paddingBottom: plateform.getResponsiveHeight(1),
        }}
      >
        {value.map((item, index) => (
          <ItemRateFormItem
            value={item}
            rate={item.rate ? item.rate : 0}
            handleUpate={this.handleUpate}
            index={index}
            handleDelete={this.handleDelete}
            withRate={withRate}
            styleItem={styleItem}
            styleTextItem={styleTextItem}
            imageIcon={isLanguage ? getFlags(item.code.split("-")[0]) : false}
          />
        ))}
      </View>
    );
  }
}

export default ListRateFormItem;

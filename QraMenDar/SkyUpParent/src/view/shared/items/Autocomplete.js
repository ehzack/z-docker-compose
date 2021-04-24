import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  FlatList,
  Platform,
} from "react-native";
import plateform from "../../../../native-base-theme/variables/platform";

import PropTypes from "prop-types";
import { FastField } from "formik";
import Remove from "../../../../assets/icons/popular/XWhite.svg";
import Search from "assets/icons/popular/Search.svg";
class AutocompleteItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScroll: false,
      text: "",
      result: [],
    };
  }

  HandleChange = async (value) => {
    this.setState({ text: value });
    if (value != "" && value != null) {
      var data = await this.props.Fetchfn(value);

      if (data.length > 0) {
        this.setState({ result: data, showScroll: true });
      }
    } else {
      this.setState({ showScroll: false });
    }
  };

  AddItem = (item) => {
    var { value, solo } = this.props;

    if (solo) {
      this.setState({ text: item.label });

      this.props.HandleUpdate(item);
    } else {
      this.props.HandleUpdate(item);
    }
    this.setState({ showScroll: false, text: "" });
  };

  renderItem = (item) => (
    <TouchableOpacity
      key={item.value}
      onPress={() => this.AddItem(item)}
      style={{
        width: "100%",
        height: plateform.getRelativeHeight(45),
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Calibri",
          fontSize: plateform.getRelativeWidth(16),
        }}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  init = () => {
    var { value, solo } = this.props;

    this.setState({ result: [], showScroll: false });
    if (solo) {
      this.props.HandleUpdate("");
    }
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
      value,
      style,
      disableIcon,
      solo,
    } = this.props;

    return (
      <View
        style={{
          paddingTop: plateform.getResponsiveHeight(3),
          paddingBottom: plateform.getResponsiveHeight(1),
        }}
      >
        <View
          style={[
            {
              height: plateform.getResponsiveHeight(7),
              width: "100%",
              backgroundColor: "white",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomRightRadius: this.state.showScroll ? 0 : 50,
              borderBottomLeftRadius: this.state.showScroll ? 0 : 50,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: plateform.getResponsiveWidth(7),
              paddingRight: plateform.getResponsiveWidth(7),
            },
            style,
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
          {!disableIcon && (
            <View style={{ width: "10%" }}>
              <Search />
            </View>
          )}

          <TextInput
            placeholder={placeholder}
            onChangeText={(e) => {
              this.HandleChange(e);
            }}
            value={solo ? value.label : this.state.text}
            style={{
              width: "80%",
              fontSize: plateform.getRelativeWidth(14),
              fontFamily: "Calibri",
              color: "black",
              textAlign: "center",
            }}
          />

          <TouchableOpacity
            style={{
              width: "20%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: 0,
            }}
            onPress={() => {
              this.init();
            }}
          >
            <Remove
              width={plateform.getRelativeWidth(13)}
              height={plateform.getRelativeWidth(13)}
            />
          </TouchableOpacity>
        </View>
        {this.state.showScroll && (
          <SafeAreaView style={{}}>
            <FlatList
              style={{
                width: "100%",
                backgroundColor: "white",
                borderTopLeftRadius: this.state.showScroll ? 0 : 25,
                borderTopRightRadius: this.state.showScroll ? 0 : 25,
                borderBottomRightRadius: 25,
                borderBottomLeftRadius: 25,
                padding: plateform.normalize(15),
                maxHeight: plateform.getResponsiveHeight(40),
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.1)",
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.result}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    width: "100%",
                    borderWidth: 0.2,
                    borderColor: "black",
                    opacity: 0.1,
                  }}
                ></View>
              )}
              renderItem={({ item }) => this.renderItem(item)}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        )}
      </View>
    );
  }
}

export default AutocompleteItem;

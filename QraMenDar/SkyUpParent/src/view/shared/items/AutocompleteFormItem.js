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

class AutocompleteFormItemNoFast extends Component {
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
    var { value } = this.props;
    let index = value.findIndex((element) => element.id === item.id);

    if (index == -1) {
      value.push(item);
      this.props.HandleUpdate(value);
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
    this.setState({ result: [], showScroll: false });
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
    } = this.props;

    return (
      <View>
        <View
          style={[
            {
              width: "100%",
              height: plateform.getResponsiveHeight(7),
              backgroundColor: "white",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomRightRadius: this.state.showScroll ? 0 : 50,
              borderBottomLeftRadius: this.state.showScroll ? 0 : 50,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: plateform.getRelativeWidth(15),
              paddingRight: plateform.getRelativeWidth(30),
            },
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
          <View style={{ width: "10%" }}>
            <Image
              style={{}}
              source={require("../../../../assets/icons/popular/Search.png")}
            />
          </View>
          <TextInput
            placeholder={placeholder}
            onChangeText={(e) => {
              this.HandleChange(e);
            }}
            value={this.state.text}
            style={{
              width: "90%",

              fontSize: plateform.getRelativeWidth(14),
              fontFamily: "Calibri",
              color: "black",
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.init();
            }}
          >
            <Image
              source={require("../../../../assets/icons/popular/closeIcon.png")}
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
                padding: plateform.getRelativeWidth(15),
              }}
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

class AutocompleteFormItem extends Component {
  render() {
    var { name } = this.props;
    return (
      // <SkeletonContent
      //   containerStyle={{}}
      //   isLoading={loading}
      //   layout={[
      //     {
      //       key: "someId",
      //       width: style.width,
      //       height: style.height,
      //     },
      //   ]}
      // >
      <FastField name={name}>
        {({ form }) => {
          return <AutocompleteFormItemNoFast {...this.props} form={form} />;
        }}
      </FastField>
      // </SkeletonContent>
    );
  }
}

export default AutocompleteFormItem;

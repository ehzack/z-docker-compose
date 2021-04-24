import Toast from "react-native-toast-message";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import { Ionicons } from "@expo/vector-icons";

const page = StyleSheet.create({
  container: {
    width: platform.getRelativeWidth(305),
    height: platform.getRelativeHeight(58),
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    padding: platform.getRelativeWidth(10),
    paddingLeft: platform.getRelativeWidth(10),
    paddingRight: platform.getRelativeWidth(50),

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 2,
  },
  iconContainer: {
    width: platform.getRelativeWidth(40),
    height: platform.getRelativeWidth(40),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginLeft: platform.getRelativeWidth(15),
    fontSize: platform.getRelativeWidth(14),
    fontFamily: "Calibri",
  },
});
const toastConfig = {
  success: (internalState) => (
    <View style={[page.container, { backgroundColor: "#F4FCF6" }]}>
      <View style={[page.iconContainer, { backgroundColor: "#5CD6A7" }]}>
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
      </View>
      <Text style={[page.text, { color: "#5CD6A7" }]}>
        {internalState.text1}
      </Text>
    </View>
  ),
  error: (internalState) => (
    <View style={[page.container, { backgroundColor: "#FBF4F4" }]}>
      <View style={[page.iconContainer, { backgroundColor: "#F57969" }]}></View>
      <Text style={[page.text, { color: "#F57969" }]}>
        {internalState.text1}
      </Text>
    </View>
  ),
  info: (internalState) => (
    <View style={[page.container, { backgroundColor: "#EEF3FC" }]}>
      <View style={[page.iconContainer, { backgroundColor: "#63A0EA" }]}></View>
      <Text style={[page.text, { color: "#63A0EA" }]}>
        {internalState.text1}
      </Text>
    </View>
  ),
  alert: (internalState) => (
    <View style={[page.container, { backgroundColor: "#FDF8F2" }]}>
      <View style={[page.iconContainer, { backgroundColor: "#FCBA6E" }]}></View>
      <Text style={[page.text, { color: "#FCBA6E" }]}>
        {internalState.text1}
      </Text>
    </View>
  ),
};

const Root = () => {
  return <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />;
};

export default Root;

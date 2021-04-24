import React, { Component, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSubscription, gql } from "@apollo/client";
import ViewMainStack from "../shared//styles/ViewMain";
import platform from "native-base-theme/variables/platform";
import { Ionicons } from "@expo/vector-icons";
import Animated, { Easing } from "react-native-reanimated";
import * as Svg from "react-native-svg";

const { Value, timing } = Animated;

var transX = new Value(50);
var transY = new Value(0);

const homePage = ({ navigation }) => {
  useEffect(() => {
    console.log("Start *******");
    timing(transX, {
      duration: 1500,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {});
  }, []);
  return (
    <ViewMainStack DisableGoBack>
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.Text
          style={[
            {
              color: platform.brandDanger,
              fontSize: platform.normalize(42),
              fontFamily: "GothamMedium",
            },
            {
              transform: [
                {
                  scale: transX,
                },
              ],
            },
          ]}
        >
          Notifications
        </Animated.Text>
      </View>
    </ViewMainStack>
  );
};

export default homePage;

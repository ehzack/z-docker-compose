import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import platfom from "../../../../native-base-theme/variables/platform";
import { LinearGradient } from "expo-linear-gradient";
import platform from "../../../../native-base-theme/variables/platform";
import ItemShowImage from "../../shared/items/ItemShowImage";
import i18n from "i18n-js";
import ArrowRSVG from "../../../../assets/icons/navigation/arrowR.svg";
import ArrowLSVG from "../../../../assets/icons/navigation/arrowL.svg";
import Animated, { Easing, interpolate } from "react-native-reanimated";

export default class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  item = (text) => (
    <View style={{ padding: platfom.normalize(4) }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: platfom.getRelativeWidth(18),
          paddingRight: platfom.getRelativeWidth(18),
          paddingTop: platfom.getRelativeHeight(5),
          paddingBottom: platfom.getRelativeHeight(5),
          borderColor: platfom.brandPrimary,
          borderWidth: 2,
          borderRadius: 25,
        }}
      >
        <Text
          style={{
            fontFamily: "Calibri",
            fontSize: platfom.normalize(14),
            color: "black",
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
  render() {
    var { card } = this.props;
    if (!card) return <View></View>;
    
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "space-around",
        }}
      >
        <View style={{ width: "100%" }}>
          <Text
            style={{
              fontFamily: "Calibri",
              fontSize: platfom.normalize(12),
              color: "#2C2929",
            }}
          >
            {card.bio ? card.bio.substring(1, 250) + " ..." : ""}
          </Text>
        </View>

        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            {card.skills
              ? card.skills.slice(0, 6).map((e) => this.item(e.label))
              : null}
          </View>
        </View>
      </View>
    );
  }
}

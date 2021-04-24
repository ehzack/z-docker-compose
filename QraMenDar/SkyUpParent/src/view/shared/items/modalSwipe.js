import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity } from "react-native";
import { View, Button, List, ListItem, Radio } from "native-base";
import Modal from "react-native-modal";
import InputRadioButton from "../../shared/items/InputRadioButton";
import platform from "../../../../native-base-theme/variables/platform";
import i18n, { setLanguageCode, getFlags } from "../../../i18n/index";
import LampSvg from "assets/3DElements/lamp.svg";
import ButtonLink from "view/shared/styles/ButtonLink";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
export default class SelectI18n extends Component {
  render() {
    var {
      onSubmit1,
      onSubmit2,
      duoButton,
      TitleButton1,
      TitleButton2,
      TitleHeader,
      Description,
      icon,
    } = this.props;
    return (
      <View
        style={{
          position: "absolute",
          zIndex: 999999,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: platform.normalize(12),
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            padding: platform.normalize(22),
          }}
        >
          {icon ? (
            icon
          ) : (
            <LampSvg
              width={platform.normalize(122)}
              height={platform.normalize(122)}
            />
          )}

          {TitleHeader && (
            <Text
              style={{
                fontFamily: "CalibriBold",
                fontSize: platform.normalize(18),
                color: "black",
                textAlign: "center",
              }}
            >
              {TitleHeader}
            </Text>
          )}
          {Description && (
            <Text
              style={{
                fontFamily: "Calibri",
                fontSize: platform.normalize(16),
                color: "black",
                textAlign: "center",
              }}
            >
              {Description}
            </Text>
          )}
          <View
            style={{
              paddingTop: platform.getResponsiveHeight(2),

              paddingBottom: platform.getResponsiveHeight(2),
              width: "100%",
            }}
          >
            <ButtonLink handleSubmit={() => onSubmit1()} bold={true}>
              {TitleButton1}
            </ButtonLink>
          </View>
          {duoButton && (
            <View
              style={{
                paddingTop: platform.getResponsiveHeight(2),

                paddingBottom: platform.getResponsiveHeight(2),
                width: "100%",
              }}
            >
              <ButtonLink
                bold={true}
                handleSubmit={() => onSubmit2()}
                backgroundColor={platform.brandInfo}
              >
                Keep Discovering
                {TitleButton2}
              </ButtonLink>
            </View>
          )}
        </View>
      </View>
    );
  }
}

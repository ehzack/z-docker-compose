import styled from "styled-components";
import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import plateform from "../../../../native-base-theme/variables/platform";
import { Container, Content } from "native-base";
import NavigationServices from "../../../navigation/NavigationService";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "native-base";

const Link = ({
  className,
  children,
  style,
  handlePress,
  Title,
  Keyword,
  navigateTo,
}) => (
  <Container
    style={{
      backgroundColor: "#F6F8FB",
      paddingTop: plateform.getRelativeHeight(40),
    }}
  >
    <View
      style={{
        width: "100%",
        alignItems: "center",
        paddingLeft: plateform.getRelativeWidth(25),
        paddingRight: plateform.getRelativeWidth(25),
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigateTo
            ? navigateTo()
            : NavigationServices.NavigateToNested("MainStack", "Menu");
        }}
        style={{
          width: "100%",
          height: plateform.getRelativeHeight(58),
          backgroundColor: "black",
          borderRadius: 29,
          flexDirection: "row",
          paddingRight: plateform.getRelativeWidth(10),
          paddingLeft: plateform.getRelativeWidth(10),
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: plateform.getRelativeWidth(40),
            height: plateform.getRelativeWidth(40),
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: plateform.brandPrimary,
          }}
        >
          <Image
            source={require("../../../../assets/icons/navigation/whiteHome.png")}
          />
        </View>
        <Text
          style={{
            fontSize: plateform.getRelativeWidth(18),
            fontFamily: "Calibri",
            color: "white",
            marginLeft: plateform.getRelativeWidth(46),
          }}
        >
          Back to Home
        </Text>
      </TouchableOpacity>
    </View>
    <Content contentContainerStyle={[{}, style]}>
      <View
        style={{
          paddingTop: plateform.getRelativeHeight(20),
          paddingBottom: plateform.getRelativeHeight(20),
        }}
      >
        <View
          style={[
            {
              backgroundColor: "white",
              borderRadius: 25,
              paddingLeft: plateform.getRelativeWidth(25),
              paddingRight: plateform.getRelativeWidth(25),
              paddingTop: plateform.getRelativeHeight(20),
              paddingBottom: plateform.getRelativeHeight(20),
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

                elevation: 2,
              },
            }),
          ]}
        >
          {children}
        </View>
      </View>
    </Content>
  </Container>
);

const ViewWrapper = styled(Link)``;

export default Link;

import styled from "styled-components";
import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import plateform from "../../../../native-base-theme/variables/platform";
import { Container, Content } from "native-base";
import NavigationServices from "../../../navigation/NavigationService";

const Link = ({ className, children, style, handlePress, Title, Keyword }) => (
  <Container style={{ backgroundColor: "#F6F8FB" }}>
    <Content
      contentContainerStyle={[
        {
          flexDirection: "column",

          paddingTop: plateform.getRelativeHeight(55),
          paddingLeft: plateform.getRelativeWidth(25),
          paddingRight: plateform.getRelativeWidth(25),
          flexGrow: 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => NavigationServices.goBack()}
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
              width: plateform.getRelativeHeight(50),
              height: plateform.getRelativeHeight(50),
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
            Back to Preference
          </Text>
        </TouchableOpacity>
      </View>

      {Title && (
        <View
          style={{
            width: "100%",
            paddingTop: plateform.getRelativeHeight(40),
            flexDirection: "row",
            flexWrap: "wrap",
            paddingLeft: "2%",

            paddingRight: plateform.getRelativeWidth(10),
            paddingBottom: plateform.getRelativeHeight(40),
          }}
        >
          {Title.split(" ").map((item, index) => (
            <Text
              style={{
                fontFamily: "Calibri",
                fontSize: plateform.normalize(30),
                color:
                  item.toLowerCase() == Keyword.toLowerCase()
                    ? plateform.brandPrimary
                    : "black",
                marginRight: plateform.getRelativeWidth(5),
              }}
            >
              {item.replace(/ /g, "")}
            </Text>
          ))}
        </View>
      )}

      {children}
    </Content>
  </Container>
);

const ViewWrapper = styled(Link)``;

export default Link;

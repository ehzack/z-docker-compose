import styled from "styled-components";
import React, { Component } from "react";
import platform from "../../../../native-base-theme/variables/platform";
import { Text } from "react-native";

const Link = ({ className, children }) => (
  <Text
    style={{
      fontSize: platform.getRelativeWidth(18),
      fontFamily: "Calibri",
      color: "black",
      opacity: 0.78,
    }}
  >
    {children}
  </Text>
);

const ViewWrapper = styled(Link)``;

export default Link;

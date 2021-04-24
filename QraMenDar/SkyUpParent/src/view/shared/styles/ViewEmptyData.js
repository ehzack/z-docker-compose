import styled from "styled-components";
import { View, Container, Content } from "native-base";
import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import platform from "../../../../native-base-theme/variables/platform";

const Link = ({ className, children }) => (
  <Container>
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#EAEAEA",
      }}
    >
      {children}
    </View>
  </Container>
);

const ViewWrapper = styled(Link)``;

export default Link;

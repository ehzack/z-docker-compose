import React, { useState } from "react";
import plateform from "../../../../native-base-theme/variables/platform";

import {
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  Switch,
  Platform,
} from "react-native";

const ButtonItem = ({
  style,
  handleSubmit,
  Title,
  value,
  handleChange,
  icon,
}) => {
  return (
    <View
      style={{
        height: plateform.getResponsiveHeight(9),
        width: "100%",
        justifyContent: "center",
      }}
    >
      <View
        onPress={() => handleSubmit()}
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            height: plateform.getResponsiveHeight(7),
            width: "100%",
            alignItems: "center",
            paddingLeft: plateform.getRelativeWidth(20),
            paddingRight: plateform.getRelativeWidth(20),
            borderRadius: 25,
            backgroundColor: "white",
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon && icon()}

          {Title && (
            <Text
              style={{
                fontFamily: "Calibri",
                fontSize: plateform.getRelativeWidth(18),
                marginLeft: plateform.getRelativeWidth(15),
              }}
            >
              {Title}
            </Text>
          )}
        </View>
        <Switch
          trackColor={{ false: "#EFF1F6", true: "#EFF1F6" }}
          thumbColor={plateform.brandPrimary}
          value={value}
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
          onValueChange={handleChange}
        />
      </View>
    </View>
  );
};

export default ButtonItem;

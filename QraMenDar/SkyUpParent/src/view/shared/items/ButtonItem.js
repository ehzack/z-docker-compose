import React, { useState } from "react";

import {
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";

const ButtonItem = ({
  styleButton,
  styleText,
  loading,
  handleSubmit,
  Text,
}) => {
  return (
    <TouchableOpacity
      onPress={() => (!loading ? handleSubmit() : null)}
      style={styleButton}
    >
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color="rgba(228, 228, 228, 0.43)"
        />
      ) : (
        <Text style={styleText}>{Text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonItem;

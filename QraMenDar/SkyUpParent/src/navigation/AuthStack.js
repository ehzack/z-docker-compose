import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SigninPage from "../view/auth/signinPage";

const Stack = createStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SigninPage" headerMode="none">
      <Stack.Screen
        name="SigninPage"
        component={SigninPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

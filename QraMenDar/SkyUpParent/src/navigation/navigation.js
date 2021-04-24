import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import actions from "src/modules/auth/authActions";

import { AuthStackNavigator } from "./AuthStack.js";
import { MainStackNavigator } from "./MainStack.js";
import SplashScreen from "src/view/auth/SplashScreen";
import { connect } from "react-redux";

const Stack = createStackNavigator();

const AuthNavigator = ({ dispatch }) => {
  useEffect(() => {
    dispatch(actions.doSigninFromAuthChange());
  });
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
        <Stack.Screen name="MainStack" component={MainStackNavigator} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(AuthNavigator);

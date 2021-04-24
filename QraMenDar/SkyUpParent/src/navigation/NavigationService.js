import * as React from "react";
import { StackActions, CommonActions } from "@react-navigation/native";
import { NavigationActions, SwitchActions } from "@react-navigation/compat";

export const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function NavigateToNested(routeNameParent, routeNameChild) {
  navigationRef.current?.navigate({
    routeName: routeNameParent,

    params: {},

    action: navigationRef.current?.navigate({ routeName: routeNameChild }),
  });
}

function Reset(routeNameParent, routeNameChild) {
  navigationRef.current?.resetRoot({
    index: 0,
    routes: [{ name: routeNameParent }],
  });
}

function JumTo(routeName) {
  navigationRef.current?.dispatch(SwitchActions.jumpTo({ routeName }));
}
function goBack() {
  navigationRef.current?.dispatch(NavigationActions.back());
}

function Current() {
  return navigationRef.current;
}
export default {
  Current,
  navigate,
  Reset,
  NavigateToNested,
  goBack,
  JumTo,
};

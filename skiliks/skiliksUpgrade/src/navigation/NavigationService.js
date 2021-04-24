import { NavigationActions, StackActions } from 'react-navigation';
import { SwitchActions } from 'react-navigation';

let _navigator;
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function NavigateToNested(routeNameParent, routeNameChild) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: routeNameParent,

      params: {},

      action: NavigationActions.navigate({ routeName: routeNameChild }),
    }),
  );
}

function Reset(routeNameParent, routeNameChild) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: routeNameParent,

          params: {},

          action: NavigationActions.navigate({ routeName: routeNameChild }),
        }),
      ],
    }),
  );
}

function JumTo(routeName) {
  _navigator.dispatch(SwitchActions.jumpTo({ routeName }));
}
function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

function Current() {
  return _navigator.current;
}
export default {
  Current,
  navigate,
  setTopLevelNavigator,
  Reset,
  NavigateToNested,
  goBack,
  JumTo,
};

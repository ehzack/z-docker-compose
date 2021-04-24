import React, { Component } from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import SigninPage from '../view/auth/signinPage';

import SignupPage from '../view/auth/signupPage';

import VerifiedAccount from '../view/auth/verifiedAccount';
import SendMailCode from '../view/auth/forgotPassword/sendMailCode';
import SetMailCode from '../view/auth/forgotPassword/setMailCode';
import UpdatePassword from '../view/auth/forgotPassword/updatePassword';
import WelcomePage from '../view/auth/firtAuth/welcomePage';
import LookingPage from '../view/auth/firtAuth/lookingPage';
import PrivacyPage from '../view/auth/firtAuth/privacyPage';

import material from '../../native-base-theme/variables/material';

import SplashScreen from '../view/auth/splashScreen';
import OnBording from '../view/auth/onBording';
import i18n from '../i18n/index';

import { Icon, Button } from 'native-base';

const SplashScreenMain = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    OnBording: { screen: OnBording },
  },

  {
    headerMode: 'none',
    initialRouteName: 'SplashScreen',
    // transitionConfig: () => ({
    //   screenInterpolator: (sceneProps) => {
    //     const { layout, position, scene } = sceneProps;
    //     const { index } = scene;

    //     const translateX = position.interpolate({
    //       inputRange: [index - 1, index, index + 1],
    //       outputRange: [layout.initWidth, 0, 0],
    //     });

    //     const opacity = position.interpolate({
    //       inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
    //       outputRange: [0, 1, 1, 0.3, 0],
    //     });

    //     return { opacity, transform: [{ translateX }] };
    //   },
    // }),
    defaultNavigationOptions: {
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.1, 1],
          }),
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.2],
            extrapolate: 'clamp',
          }),
        },
      }),
    },

    navigationOptions: {
      cardStack: {},
    },
  },
);

const ForgotPassword = createStackNavigator(
  {
    SendMailCode: { screen: SendMailCode },
    SetMailCode: { screen: SetMailCode },
    UpdatePassword: { screen: UpdatePassword },
  },
  {
    //headerMode: 'none',
    initialRouteName: 'SendMailCode',
    headerMode: 'none',
  },
);

const FirstAuth = createStackNavigator(
  {
    WelcomePage: { screen: WelcomePage },
    LookingPage: { screen: LookingPage },
    PrivacyPage: { screen: PrivacyPage },
  },
  {
    headerMode: 'none',
    initialRouteName: 'PrivacyPage',
  },
);

const AuthStack = createStackNavigator(
  {
    SigninPage: { screen: SigninPage },
    SignupPage: { screen: SignupPage },
    VerifiedAccount: { screen: VerifiedAccount },
    ForgotPassword: { screen: ForgotPassword },
    SplashScreenMain: { screen: SplashScreenMain },
    FirstAuth: { screen: FirstAuth },
  },
  {
    headerMode: 'none',
    initialRouteName: 'SplashScreenMain',

    navigationOptions: ({ navigation }) => ({
      cardStack: {
        gesturesEnabled: false,
      },
    }),
    tabBarPosition: 'bottom',
    shifting: true,
    labeled: false,
    tabBarOptions: {
      tintColor: material.brandDark,
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: material.brandDark,
        borderTopWidth: 0.5,
        borderTopColor: 'grey',
        height: material.footerHeight - (material.footerHeight * 20) / 100,
      },
      showIcon: true,
      showLabel: false,
    },
  },
);

export default AuthStack;

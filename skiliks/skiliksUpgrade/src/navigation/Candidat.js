import React, { Component } from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';

import SetupProfile1 from '../view/candidat/setupProfile/setupProfile1';
import SetupProfile2 from '../view/candidat/setupProfile/setupProfile2';
import MainHome from '../view/candidat/mainHome';
import Menu from '../view/candidat/menu';

import Notification from '../view/notification/notification';
import Preferences from '../view/candidat/profile/preferenceMain';
import Skills from '../view/candidat/profile/skills';
import Locations from '../view/candidat/profile/locations';
import ContractTypeSalary from '../view/candidat/profile/contractTypeSalary';
import Languages from '../view/candidat/profile/languages';
import Salary from '../view/candidat/profile/salary';
import Settings from '../view/candidat/profile/settings';
import MainProfile from '../view/candidat/profile/mainProfile';
import UpdatePasswordUser from '../view/auth/updatePasswordUser/updatePasswordUser';
import Chats from '../view/candidat/chats/mainChats';
import Discussion from '../view/chats/discussion';
import PrivacyContainer from '../view/auth/privacy/privacy';

import platform from '../../native-base-theme/variables/platform';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View, Image, Text } from 'react-native';
import i18n from '../i18n/index';
import NavBareHomeActive from '../../assets/icons/navigation/navBarHomeActive.svg';
import NavBareHome from '../../assets/icons/navigation/navBarHome.svg';

import NavBarInbox from '../../assets/icons/navigation/navBarInbox.svg';
import NavBarInboxActive from '../../assets/icons/navigation/navBarInboxActive.svg';

import NavBareNews from '../../assets/icons/navigation/navBarNews.svg';
import NavBareNewsActive from '../../assets/icons/navigation/navBarNewsActive.svg';

import NavBareProfile from '../../assets/icons/navigation/navBarProfile.svg';
import NavBareProfileActive from '../../assets/icons/navigation/navBarProfileActive.svg';

import NavBareMenu from '../../assets/icons/navigation/navBarMenu.svg';
import NavBareMenuActive from '../../assets/icons/navigation/parametreActife.svg';

const SetupProfile = createStackNavigator(
  {
    SetupProfile1: { screen: SetupProfile1 },
    SetupProfile2: { screen: SetupProfile2 },
  },
  {
    headerMode: 'none',
    initialRouteName: 'SetupProfile1',
  },
);

const PreferanceCandidatStack = createStackNavigator(
  {
    Skills: { screen: Skills },
    Locations: { screen: Locations },
    ContractTypeSalary: { screen: ContractTypeSalary },
    Languages: { screen: Languages },
    Salary: { screen: Salary },
    Settings: { screen: Settings },
    Preferences: { screen: Preferences },
    MainProfile: { screen: MainProfile },
    UpdatePasswordUser: { screen: UpdatePasswordUser },
    PrivacyContainer: { screen: PrivacyContainer },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Preferences',
  },
);

var MainStack = createBottomTabNavigator(
  {
    Menu: {
      screen: PreferanceCandidatStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;

          if (focused) {
            return (
              <View
                style={{
                  backgroundColor: 'EBE3FF, 100 %',
                  width: platform.getResponsiveWidth(50),
                  height: platform.getRelativeHeight(31),
                  borderRadius: platform.getRelativeWidth(15),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <NavBareMenuActive />
                <Text
                  style={{
                    marginLeft: platform.getRelativeWidth(7),
                    fontFamily: 'Calibri',
                    fontSize: platform.getRelativeWidth(14),
                    color: platform.brandPrimary,
                  }}
                >
                  {i18n.t('user.candidat.navigation.parameteres')}
                </Text>
              </View>
            );
          }
          return (
            <View
              style={{
                height: platform.getRelativeHeight(31),
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <NavBareMenu />
            </View>
          );
        },
      }),
    },

    MainHome: {
      screen: MainHome,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;

          if (focused) {
            return (
              <View
                style={{
                  backgroundColor: '#EBE3FF',
                  width: platform.getRelativeWidth(82),
                  height: platform.getRelativeHeight(31),
                  borderRadius: platform.getRelativeWidth(15),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <NavBareHomeActive />

                <Text
                  style={{
                    marginLeft: platform.getRelativeWidth(7),
                    fontFamily: 'Calibri',
                    fontSize: platform.getRelativeWidth(14),
                    color: '#7041EE',
                  }}
                >
                  {i18n.t('user.candidat.navigation.home')}
                </Text>
              </View>
            );
          }
          return (
            <View
              style={{
                height: platform.getRelativeHeight(31),
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <NavBareHome />
            </View>
          );
        },
      }),
    },
    Notification: {
      screen: Notification,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;

          if (focused) {
            return (
              <View
                style={{
                  backgroundColor: 'rgba(20, 210, 184, 0.28);',
                  width: platform.getRelativeWidth(82),
                  height: platform.getRelativeHeight(31),
                  borderRadius: platform.getRelativeWidth(15),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <NavBareNewsActive />
                <Text
                  style={{
                    marginLeft: platform.getRelativeWidth(7),
                    fontFamily: 'Calibri',
                    fontSize: platform.getRelativeWidth(14),
                    color: '#085D52',
                  }}
                >
                  {i18n.t('user.candidat.navigation.notif')}
                </Text>
              </View>
            );
          }
          return (
            <View
              style={{
                height: platform.getRelativeHeight(31),
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <NavBareNews />
            </View>
          );
        },
      }),
    },
    Chats: {
      screen: Chats,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;

          if (focused) {
            return (
              <View
                style={{
                  backgroundColor: 'rgba(14, 119, 236, 0.21);',
                  width: platform.getRelativeWidth(82),
                  height: platform.getRelativeHeight(31),
                  borderRadius: platform.getRelativeWidth(15),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <NavBarInboxActive />
                <Text
                  style={{
                    marginLeft: platform.getRelativeWidth(7),
                    fontFamily: 'Calibri',
                    fontSize: platform.getRelativeWidth(14),
                    color: '#0E77EC',
                  }}
                >
                  {i18n.t('user.candidat.navigation.chat')}
                </Text>
              </View>
            );
          }
          return (
            <View
              style={{
                height: platform.getRelativeHeight(31),
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <NavBarInbox />
            </View>
          );
        },
      }),
    },
  },
  {
    initialRouteName: 'MainHome',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: 'white',
        paddingLeft: platform.getRelativeWidth(26),
        paddingRight: platform.getRelativeWidth(26),
        height: platform.getRelativeHeight(67),
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      },
    },
  },
);

const CandidatStack = createStackNavigator(
  {
    SetupProfile: { screen: SetupProfile },
    MainStack: { screen: MainStack },
    Discussion: { screen: Discussion },
  },

  {
    headerMode: 'none',
    initialRouteName: 'MainStack',
  },
);

export default CandidatStack;

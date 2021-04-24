import React, { Component } from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';

import SetupProfile1 from '../view/recuiter/setupProfile/setupProfile1';
import SetupProfile2 from '../view/recuiter/setupProfile/setupProfile2';
import SetupProfile3 from '../view/recuiter/setupProfile/setupProfile3';
import MainHome from '../view/recuiter/mainHome';
import Menu from '../view/candidat/menu';

import MainOffers from '../view/recuiter/offer/mainOffers';

import NotificationMain from '../view/notification/notification';
import Preferences from '../view/recuiter/profile/preferenceMain';

import Chats from '../view/recuiter/chats/mainChats';
import Discussion from '../view/chats/discussion';
import FormOffer from '../view/recuiter/offer/formOffer';

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
import PrivacyContainer from '../view/auth/privacy/privacy';

import NavBareMenu from '../../assets/icons/navigation/navBarMenu.svg';
import NavBareMenuActive from '../../assets/icons/navigation/navBarMenuActive.svg';
import JobIcon from '../../assets/icons/popular/job.svg';
import JobIconActive from '../../assets/icons/popular/jobActive.svg';
import UpdatePasswordUser from '../view/auth/updatePasswordUser/updatePasswordUser';
import MainProfile from '../view/recuiter/profile/mainProfile';
import SettingOffer from '../view/recuiter/offer/settingOffer';
import DetailOffer from '../view/recuiter/offer/detailOffer';
const SetupProfile = createStackNavigator(
  {
    SetupProfile1: { screen: SetupProfile1 },
  },
  {
    headerMode: 'none',
    initialRouteName: 'SetupProfile1',
  },
);

const PreferanceRecruiterStack = createStackNavigator(
  {
    Preferences: { screen: Preferences },
    UpdatePasswordUser: { screen: UpdatePasswordUser },
    MainProfile: { screen: MainProfile },
    MainOffers: { screen: MainOffers },
    SettingOffer: { screen: SettingOffer },
    DetailOffer: { screen: DetailOffer },
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
      screen: PreferanceRecruiterStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;

          if (focused) {
            return (
              <View
                style={{
                  backgroundColor: 'rgba(255, 51, 122, 0.17);',
                  width: platform.getRelativeWidth(82),
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
                    color: '#FF337A',
                  }}
                >
                  {i18n.t('user.recruiter.navigation.setting')}
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
                  {i18n.t('user.recruiter.navigation.home')}
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
      screen: NotificationMain,
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
                  {i18n.t('user.recruiter.navigation.notif')}
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
                  {i18n.t('user.recruiter.navigation.chat')}
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
        borderTopLeftRadius: platform.getRelativeWidth(33),
        borderTopRightRadius: 25,
      },
    },
  },
);

const RecruiterStack = createStackNavigator(
  {
    SetupProfile: { screen: SetupProfile },
    MainStack: { screen: MainStack },
    Discussion: { screen: Discussion },
    FormOffer: { screen: FormOffer },

    // Skills: { screen: Skills },
    // Locations: { screen: Locations },
    // ContractType: { screen: ContractType },
    // Languages: { screen: Languages },
    // Salary: { screen: Salary },
  },
  {
    headerMode: 'none',
  },
);

export default RecruiterStack;

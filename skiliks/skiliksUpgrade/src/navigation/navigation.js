import { createAppContainer, NavigationActions } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React, { Component } from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';

import AuthStack from './AuthStack';
import CandidatStack from './Candidat';
import RecruiterStack from './Recruiter';

// const HomeStack = createMaterialBottomTabNavigator(
//   {
//     Home: SwipeScreen,
//     ProfileSetting: {
//       screen: ProfileSetting,
//       navigationOptions: {
//         title: "Profile",
//         headerTitleAlign: "center",
//       },
//     },
//   },

//   {
//     shifting: true,

//     barStyle: {
//       backgroundColor: material.brandPrimary,
//       height: material.footerHeight,
//     },

//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, horizontal, tintColor }) => {
//         const { routeName } = navigation.state;
//         let IconComponent = Icon;
//         let iconName;
//         let typeIcon;

//         if (routeName === "Home") {
//           iconName = "home";
//           typeIcon = "AntDesign";
//         } else if (routeName === "ProfileSetting") {
//           iconName = "user";
//           typeIcon = "AntDesign";
//         } else if (routeName === "Ads") {
//           iconName = "book";
//           typeIcon = "AntDesign";
//         } else if (routeName === "Candidat") {
//           iconName = "hearto";
//           typeIcon = "AntDesign";
//         }
//         return (
//           <IconComponent
//             type={typeIcon}
//             name={iconName}
//             style={{ color: "white", fontSize: 20 }}
//           ></IconComponent>
//         );
//       },
//     }),

//     navigationOptions: ({ navigation }) => {
//       const { routeName } = navigation.state.routes[navigation.state.index];
//       if (routeName == "Ads") {
//         return {
//           headerTitle: "Ads",
//           headerTitleAlign: "center",
//         };
//       } else if (routeName == "Candidat") {
//         return {
//           headerTitle: "Candidat",
//           headerTitleAlign: "center",
//         };
//       } else if (routeName == "ProfileSetting") {
//         return {
//           headerTitle: "Profile",
//         };
//       } else {
//         return {
//           headerTitle: "Skiliks",
//           headerTitleAlign: "center",
//         };
//       }
//     },
//     cardStack: {
//       // gesturesEnabled: false,
//     },
//   }
// );

// const MainHome = createStackNavigator({
//   HomeStack: {
//     screen: HomeStack,

//     navigationOptions: {
//       title: "Home Page",
//       drawerLabel: "Home",
//       drawerIcon: ({ tintColor }) => (
//         <Icon name="home" size={24} style={{ color: "black" }} />
//       ),
//     },
//   },
//   UpdateImage: UpdateImage,
//   UpdatePassword: {
//     screen: UpdatePassword,

//     navigationOptions: {
//       title: i18n.t("user.fields.updatePassword"),
//     },
//   },
//   GeneralInformation: {
//     screen: GeneralInformation,

//     navigationOptions: {
//       title: i18n.t("user.fields.editAccount"),
//     },
//   },
//   Skills: {
//     screen: Skills,

//     navigationOptions: {
//       title: i18n.t("user.candidat.fields.skills"),
//     },
//   },
//   UpdateSkills: {
//     screen: UpdateSkills,

//     navigationOptions: {
//       title: i18n.t("user.candidat.fields.skills"),
//     },
//   },

//   Availability: {
//     screen: Availability,

//     navigationOptions: {
//       title: i18n.t("user.candidat.fields.availability"),
//     },
//   },

//   Localizations: {
//     screen: Localizations,

//     navigationOptions: {
//       title: i18n.t("user.candidat.fields.localizations"),
//     },
//   },

//   ContractType: {
//     screen: ContractType,

//     navigationOptions: {
//       title: i18n.t("user.candidat.fields.contractType"),
//     },
//   },
//   Languages: {
//     screen: Languages,

//     navigationOptions: {
//       title: i18n.t("user.candidat.fields.languages"),
//     },
//   },
//   SettingNotification: {
//     screen: SettingNotification,

//     navigationOptions: {
//       title: i18n.t("user.candidat.common.settingNotification"),
//     },
//   },
//   Discussion: {
//     screen: Discussion,

//     navigationOptions: {
//       title: i18n.t("user.candidat.fields.discussion"),
//       headerShown: false, //this will hide the header
//     },
//   },
//   AutoCompletList: {
//     screen: AutoCompletList,

//     navigationOptions: ({ navigation }) => {
//       return {
//         title: i18n.t(`user.candidat.fields.${navigation.state.params}`),
//       };
//     },
//   },
// });

const RootNavigator = createStackNavigator(
  {
    AuthStack: { screen: AuthStack },
    CandidatStack: { screen: CandidatStack },
    RecruiterStack: { screen: RecruiterStack },
  },

  {
    headerMode: 'none',
    initialRouteName: 'AuthStack',
    navigationOptions: {
      cardStack: {},
    },
  },
);

const AppNavigator = createAppContainer(RootNavigator);
export default AppNavigator;

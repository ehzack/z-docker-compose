import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AssignementsNotification from "src/view/notification/assignementsNotification";
import RoomsessionNotification from "src/view/notification/roomsessionNotification";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import graphqlClientConfig from "src/modules/shared/graphql/graphqlClient";
import { ApolloProvider } from "@apollo/client";

import platform from "native-base-theme/variables/platform";
const Tab = createBottomTabNavigator();

export const MainStackNavigator = () => {
  return (
    <ApolloProvider client={graphqlClientConfig.config()}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: platform.brandDanger,
          inactiveTintColor: platform.brandDark,
        }}
      >
        <Tab.Screen
          name="AssignementsNotification"
          component={AssignementsNotification}
          options={{
            tabBarLabel: "Cours",
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign
                name="book"
                size={24}
                color={focused ? platform.brandDanger : "black"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="RoomsessionNotification"
          component={RoomsessionNotification}
          options={{
            tabBarLabel: "Emploi du temps",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name="ios-time-outline"
                size={24}
                color={focused ? platform.brandDanger : "black"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </ApolloProvider>
  );
};

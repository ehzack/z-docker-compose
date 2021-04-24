import React, { Component, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useSubscription, gql } from "@apollo/client";
import ViewMainStack from "./shared//styles/ViewMain";
import platform from "native-base-theme/variables/platform";
import { Ionicons } from "@expo/vector-icons";
import Functions from "src/modules/shared/processing/Functions";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";

const LIST_NOTIFICATION = gql`
  subscription ListNotification {
    parentNotification {
      content
      created_at
      id
      id_parent
      updated_at
      isRead
    }
  }
`;

const _renderSectionTitle = (section) => {
  return (
    <View
      style={{
        width: "100%",
        paddinTop: platform.getResponsiveHeight(3),
        paddinBottom: platform.getResponsiveHeight(3),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Ionicons
        name={true ? "notifications-outline" : "notifications-sharp"}
        size={platform.normalize(22)}
        color="black"
      />
      <View
        style={{
          width: "100%",
          padding: platform.normalize(18),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: platform.normalize(18),
            fontFamily: "CalibriBold",
            color: "white",
            backgroundColor: platform.brandInfo,
            padding: platform.normalize(8),
          }}
        >
          {`${section.content.student_name}`}
        </Text>
        <Text
          style={{
            fontSize: platform.normalize(18),
            backgroundColor: platform.brandDanger,
            padding: platform.normalize(6),
            fontFamily: "CalibriBold",
            marginLeft: platform.getRelativeWidth(5),
          }}
        >
          {`${section.content.element}`}
        </Text>
        <Text
          style={{
            fontSize: platform.normalize(15),
            fontFamily: "Calibri",
            color: "#000000",
            opacity: 0.7,
          }}
        >
          {Functions.isToday(new Date(section.created_at))
            ? Functions.GetDateTime(new Date(section.created_at))
            : Functions.GetDateTime(new Date(section.created_at))}
        </Text>
      </View>
      {/* <Ionicons name="notifications-sharp" size={24} color="black" /> */}
    </View>
  );
};

const _renderContent = (section) => {
  return (
    <View
      style={{
        width: "100%",

        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: platform.getResponsiveHeight(2),
      }}
    >
      <View
        style={{ width: "100%", paddingLeft: platform.getResponsiveWidth(10) }}
      >
        <Text
          style={{
            fontSize: platform.normalize(18),
            fontFamily: "GothamLight",
            marginTop: platform.getResponsiveHeight(1),
          }}
        >
          {`Matière : ${section.content.matter}`}
        </Text>
        <Text
          style={{
            fontSize: platform.normalize(18),
            fontFamily: "GothamLight",
            marginTop: platform.getResponsiveHeight(1),
          }}
        >
          {`Cours : ${section.content.cours}`}
        </Text>
        <Text
          style={{
            fontSize: platform.normalize(18),
            fontFamily: "GothamLight",
            marginTop: platform.getResponsiveHeight(1),
          }}
        >
          {`enseignant : ${section.content.teacher_name}`}
        </Text>
      </View>
    </View>
  );
};

const _renderHeader = () => <View></View>;
const homePage = () => {
  const { data, loading } = useSubscription(LIST_NOTIFICATION);
  const [activeSections, setActiveSection] = useState([]);
  if (loading) {
    return <View></View>;
  }
  return (
    <ViewMainStack Title={"Notification"}>
      <AccordionList
        style={{
          width: "100%",
          paddingBottom: platform.getResponsiveHeight(9),
        }}
        list={data.parentNotification}
        header={_renderSectionTitle}
        body={_renderContent}
        keyExtractor={(item) => item.key}
      />
    </ViewMainStack>
  );
};

export default homePage;

import React, { Component, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSubscription, gql } from "@apollo/client";
import ViewMainStack from "../shared//styles/ViewMain";
import platform from "native-base-theme/variables/platform";
import { Ionicons } from "@expo/vector-icons";
import Functions from "src/modules/shared/processing/Functions";
import moment from "moment";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import Service from "src/modules/parent/service";
import Accordion from "react-native-collapsible/Accordion";
import actions from "../../modules/auth/authActions";
import { connect } from "react-redux";
import config from "src/config/index";
import * as Linking from "expo-linking";

const STATUS = {
  DELETE: { label: " A été supprimé ", color: "#B40404" },
  INSERT: { label: "A été ajouteé", color: "#088A29" },
  UPDATE: { label: "A été modifié", color: "#045FB4" },
};
const LIST_NOTIFICATION = gql`
  subscription ListNotification {
    parentNotification(
      where: { type: { _eq: "ROOMSESSION" } }
      order_by: { created_at: desc }
    ) {
      content
      created_at
      id
      id_parent
      updated_at
      isRead
    }
  }
`;

const GoToWebSite = () => {
  Linking.openURL(config.website);
};
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
        name={section.isRead ? "notifications-outline" : "notifications-sharp"}
        size={platform.normalize(22)}
        color={section.isRead ? "black" : platform.brandDanger}
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
          {Functions.GetDateTime(new Date(section.created_at))}
        </Text>
      </View>
      {/* <Ionicons name="notifications-sharp" size={24} color="black" /> */}
    </View>
  );
};
const _renderContent = (section, flag) => {
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
            fontFamily: "GothamMedium",
            marginTop: platform.getResponsiveHeight(1),
            color: STATUS[section.content.status].color,
          }}
        >
          {`Status : ${STATUS[section.content.status].label}`}
        </Text>
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
          {`Semain : ${section.content.roomsesion.id_week}`}
        </Text>
        <Text
          style={{
            fontSize: platform.normalize(18),
            fontFamily: "GothamLight",
            marginTop: platform.getResponsiveHeight(1),
          }}
        >
          {`Temp : ${moment(
            section.content.roomsesion.start_time,
            "h:mm a"
          ).format("h:mm ")} |  ${moment(
            section.content.roomsesion.end_time,
            "h:mm a"
          ).format("h:mm ")} `}
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
        <View
          style={{
            marginTop: platform.getResponsiveHeight(1.5),

            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              GoToWebSite();
            }}
            style={{
              backgroundColor: platform.brandPrimary,
              borderRadius: 12,
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
              padding: platform.normalize(8),
            }}
          >
            <Text
              style={{
                fontSize: platform.normalize(18),
                fontFamily: "GothamLight",
                color: "white",
              }}
            >
              {`Consulter`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const handleChange = async (id) => {
  await Service.isRead(id);
};
const homePage = ({ navigation, dispatch }) => {
  const { data, loading } = useSubscription(LIST_NOTIFICATION);
  const [activeSections, setActiveSection] = useState([0]);

  const Signout = () => {
    dispatch(actions.doSignout());
  };
  useEffect(() => {
    let count = loading
      ? 0
      : data.parentNotification.filter((e) => !e.isRead).length;

    navigation.setOptions({ tabBarBadge: count == 0 ? null : count });
  }, [data]);
  return (
    <ViewMainStack
      Title={"Emploi du temps"}
      NavigateTo={() => {
        Signout();
      }}
    >
      {loading && (
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ActivityIndicator
            size={platform.normalize(60)}
            color={platform.brandDanger}
          />
        </View>
      )}
      {!loading && (
        <Accordion
          activeSections={activeSections}
          sections={data.parentNotification}
          renderHeader={_renderSectionTitle}
          renderContent={_renderContent}
          underlayColor={"rgba(0,0,0,0.0)"}
          onChange={(e, index) => {
            setActiveSection(e);
            console.log(e[0]);

            if (!isNaN(e[0]) && !data.parentNotification[e[0]].isRead) {
              handleChange(data.parentNotification[e[0]].id);
            }
          }}
        />
      )}
    </ViewMainStack>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(homePage);

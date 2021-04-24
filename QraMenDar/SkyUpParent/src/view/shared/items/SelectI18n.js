import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity } from "react-native";
import { View, Button, List, ListItem, Radio } from "native-base";
import Modal from "react-native-modal";
import InputRadioButton from "../../shared/items/InputRadioButton";
import platform from "../../../../native-base-theme/variables/platform";
import i18n, { setLanguageCode, getFlags } from "../../../i18n/index";
import ButtonLink from "../styles/ButtonLink";
import VectorBottom from "../../../../assets/icons/popular/vectorBottom.svg";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
export default class SelectI18n extends Component {
  constructor(props) {
    super(props);
    this.state = { locale: i18n.locale };
  }
  toggleModal = (flag) => {
    this.setState({ showModal: flag });
  };

  handleChangeLanguage = () => {
    if (this.state.locale != i18n.locale) setLanguageCode(this.state.locale);
    this.props.trigger();
    this.toggleModal(false);
  };

  render() {
    const languages = Object.keys(i18n.translations);
    const style = this.props.style;
    return (
      <View
        style={[
          {
            // position: "absolute",
            // left: 0,
            // right: 0,
            // bottom: platform.getRelativeHeight(20)
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
          },
          style,
        ]}
      >
        <View style={{ paddingBottom: platform.getResponsiveHeight(1) }}>
          <Button
            transparent
            onPress={(e) => {
              this.setState({ locale: i18n.locale });
              this.toggleModal(true);
            }}
          >
            <View
              style={{
                paddingLeft: platform.getResponsiveWidth(1),
                paddingRight: platform.getResponsiveWidth(1),
              }}
            >
              <Image
                style={{
                  width: platform.normalize(21),
                  height: platform.normalize(21),
                }}
                source={getFlags(this.state.locale)}
              />
            </View>
            <View
              style={{
                paddingLeft: platform.getResponsiveWidth(1),
                paddingRight: platform.getResponsiveWidth(1),
              }}
            >
              <Text
                style={{
                  fontFamily: "Calibri",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  textAlign: "center",
                  opacity: 0.7,
                  fontSize: platform.normalize(14),
                }}
              >
                {i18n.t(`shared.i18n.${this.state.locale}`)}
              </Text>
            </View>
            <View
              style={{
                paddingLeft: platform.getResponsiveWidth(1),
                paddingRight: platform.getResponsiveWidth(1),
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <VectorBottom style={{}} />
            </View>
          </Button>
        </View>
        <Modal
          isVisible={this.state.showModal}
          deviceWidth={screenWidth}
          deviceHeight={screenHeight}
          onBackdropPress={(e) => this.toggleModal(false)}
          style={{ justifyContent: "flex-end", margin: 0, width: "100%" }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingLeft: platform.getResponsiveWidth(5),
              paddingRight: platform.getResponsiveWidth(5),
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
                paddingLeft: platform.getResponsiveWidth(2),
                paddingRight: platform.getResponsiveWidth(2),
                paddingTop: platform.getResponsiveHeight(1),
              }}
            >
              {languages.map((e) => (
                <InputRadioButton
                  onPress={() => {
                    this.setState({ locale: e });
                  }}
                  active={e == this.state.locale}
                  label={i18n.t(`shared.i18n.${e}`)}
                />
              ))}
            </View>

            <ButtonLink
              bold={true}
              handleSubmit={() => {
                this.handleChangeLanguage();
              }}
            >
              Confirm
            </ButtonLink>

            <View
              style={{
                width: "100%",
                paddingLeft: platform.getRelativeWidth(50),
                paddingRight: platform.getRelativeWidth(50),
                padding: platform.getRelativeWidth(10),
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Calibri",
                  fontSize: platform.normalize(14),
                }}
              >
                {i18n.t("shared.i18n.info")}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

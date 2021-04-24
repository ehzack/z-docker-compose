import React, { Component } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { View, Button, List, ListItem, Radio } from "native-base";
import plateform from "../../../../native-base-theme/variables/platform";
import i18n, { setLanguageCode, getFlags } from "../../../i18n/index";
import { Picker, Form } from "native-base";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default class SelectI18n extends Component {
  constructor(props) {
    super(props);
    this.state = { locale: i18n.locale };
  }

  handleChangeLanguage = (data) => {
    // if (this.state.locale != i18n.locale) setLanguageCode(this.state.locale);
    // this.props.trigger();
    var { value, listI18N } = this.props;
    let lang = listI18N.find((e) => e.id == data);
    setLanguageCode(lang.label.split("-")[0], true);
    this.props.trigger();
    this.props.handleChange(lang);
  };

  render() {
    // const languages = Object.keys(i18n.translations);
    var { value, listI18N } = this.props;
    console.log(value, listI18N);
    return (
      <View
        style={{
          height: plateform.getResponsiveHeight(9),
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-between",
              height: plateform.getResponsiveHeight(7),
              width: "100%",
              alignItems: "center",
              paddingLeft: plateform.getRelativeWidth(20),
              paddingRight: plateform.getRelativeWidth(20),

              borderRadius: 25,
              backgroundColor: "white",
            },
            Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
              },
              android: {
                shadowColor: "rgb(78, 79, 114)",
                shadowOffset: {
                  width: 50,
                  height: 50,
                },
                shadowOpacity: 1,
                shadowRadius: 1,

                elevation: 4,
              },
            }),
          ]}
        >
          <Image
            style={{
              width: plateform.getResponsiveWidth(7),
              height: plateform.getResponsiveHeight(4),
              resizeMode: "cover",
            }}
            source={getFlags(value.label ? value.label.split("-")[0] : "")}
          />

          <Picker
            note
            style={{
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: plateform.getRelativeWidth(10),
            }}
            itemStyle={{
              fontFamily: "Calibri",
              fontSize: plateform.getRelativeWidth(50),
              color: "red",
              textAlign: "left",
            }}
            selectedValue={value.id}
            onValueChange={this.handleChangeLanguage}
          >
            {listI18N.map((e) => (
              <Picker.Item
                label={i18n.t(`shared.i18n.${e.label.split("-")[0]}`)}
                value={e.id}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  }
}

import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Left,
  Right,
  Body,
  Title,
  Card,
  CardItem,
  Button,
  Text,
  View,
  List,
  Icon,
} from "native-base";
import i18n from "../../i18n/index";
import actions from "../../modules/auth/authActions";
import { Image, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { Formik } from "formik";
import model from "../../modules/auth/userModel";
import FormSchema from "../shared/form/formSchema";
import { AndroidBackHandler } from "react-navigation-backhandler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dimensions, Keyboard, ActivityIndicator } from "react-native";
import platform from "../../../native-base-theme/variables/platform";
import Modal from "react-native-modal";
import InputRadioButton from "../shared/items/InputRadioButton";
import SelectI18n from "../shared/items/SelectI18n";
import selectors from "../../modules/auth/authSelectors";
import ModalInputCode from "./shared/ModalInputCode";
import services from "../../modules/auth/authService";
import ButtonItem from "../shared/items/ButtonItem";
import ViewAuth from "../shared/styles/ViewAuth";
import ButtonLink from "../shared/styles/ButtonLink";
import TextInputItem from "../shared/items/TextInputItem";
import ButtonGoogle from "../shared/styles/ButtonGoogle";
import Toast from "react-native-toast-message";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const { fields } = model;
class SigninPage extends Component {
  schema = new FormSchema(fields.id, [fields.email, fields.password]);

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      showModal: false,
      showI18n: true,
      i18nTrigger: 0,
      submit: false,
    };
  }

  initialValues = () => {
    return this.schema.initialValues();
  };

  handleSubmitLogin(values) {
    var dispatch = this.props.dispatch;
    console.log(values);
    dispatch(
      actions.doSigninWithEmailAndPassword(values.email, values.password)
    );
  }

  onBackButtonPressAndroid = () => {
    return true;
  };
  handleActivateAccount = (value) => {
    var CurrentUser = this.props.CurrentUser;
    if (CurrentUser.email) {
      var dispatch = this.props.dispatch;
      dispatch(actions.doActivateAccount(CurrentUser.email, value));
    }
  };

  initAuth = () => {
    var dispatch = this.props.dispatch;

    dispatch(actions.doInitAuth());
  };
  handleRegisterGoogle = () => {
    var dispatch = this.props.dispatch;

    dispatch(actions.doSigninSocial());
  };

  ResendCode = () => {
    var CurrentUser = this.props.CurrentUser;
    services.sendEmailVerification(CurrentUser.email ? CurrentUser.email : "");
  };

  render() {
    var { errorMessage, loading } = this.props;
    var { submit } = this.state;

    return (
      <ViewAuth>
        <View
          style={{
            alignItems: "center",
            height: (screenHeight * 25) / 100,
            width: "100%",
            justifyContent: "center",
            paddingTop: platform.getResponsiveHeight(6),
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: platform.normalize(30),
              fontFamily: "CalibriBold",
            }}
          >
            {i18n.t("auth.signin")}
          </Text>
        </View>

        <ButtonGoogle handleSubmit={() => this.handleRegisterGoogle()}>
          {i18n.t("auth.signinGoogle")}
        </ButtonGoogle>

        <View
          style={{
            marginTop: platform.getResponsiveHeight(3),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              opacity: 0.4,
              fontSize: platform.normalize(14),
              color: "black",
              fontFamily: "Calibri",
            }}
          >
            {i18n.t("common.or")}
          </Text>
        </View>

        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={(values) => this.handleSubmitLogin(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
            console.log(errors);
            return (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    marginTop: platform.getResponsiveHeight(3),
                    width: "100%",
                  }}
                >
                  <TextInputItem
                    placeholder={fields.email.label}
                    value={values.email}
                    onChangeText={handleChange(fields.email.name)}
                    onBlur={handleBlur(fields.email.name)}
                    removeSpacing={true}
                    error={submit ? errors.email : false}
                  />

                  <TextInputItem
                    placeholder={fields.password.label}
                    secureTextEntry={true}
                    onChangeText={handleChange(fields.password.name)}
                    onBlur={handleBlur(fields.password.name)}
                    value={values.password}
                    style={{
                      marginTop: platform.getResponsiveHeight(2),
                    }}
                    error={submit ? errors.password : false}
                  />

                  <ButtonLink
                    bold={true}
                    style={{ marginTop: platform.getResponsiveHeight(4) }}
                    handleSubmit={() => {
                      this.setState({ submit: true });
                      handleSubmit();
                    }}
                    loading={this.props.loading}
                  >
                    {i18n.t("auth.signin")}
                  </ButtonLink>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: platform.getRelativeHeight(14),
                  }}
                >
                  <Text
                    style={{
                      fontSize: platform.getRelativeWidth(15),
                      lineHeight: platform.getRelativeWidth(20),
                      color: platform.brandSuccess,
                      fontFamily: "Calibri",
                      color: "#999999",
                    }}
                  >
                    {i18n.t("auth.forgotPassword")} ?
                  </Text>
                  <TouchableOpacity
                    style={{ marginLeft: platform.getRelativeWidth(5) }}
                    onPress={() =>
                      this.props.navigation.navigate("ForgotPassword")
                    }
                  >
                    <Text
                      style={{
                        fontSize: platform.getRelativeWidth(15),
                        lineHeight: platform.getRelativeWidth(20),
                        color: platform.brandSuccess,
                        fontFamily: "Calibri",
                        color: platform.brandPrimary,
                      }}
                    >
                      {i18n.t("common.resetHere")}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    marginTop: platform.getRelativeWidth(45),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.props.navigation.replace("SignupPage")}
                  >
                    <Text
                      style={{
                        fontSize: platform.getRelativeWidth(18),
                        color: platform.brandSuccess,
                        fontFamily: "CalibriBold",
                        color: platform.brandPrimary,
                      }}
                    >
                      {i18n.t("auth.createAnAccount")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        </Formik>
        <SelectI18n
          trigger={() => this.setState({ i18nTrigger: 1 })}
          style={{ flex: 1 }}
        />

        <ModalInputCode
          showModal={this.props.showModal}
          initAuth={this.initAuth}
          handleActivateAccount={this.handleActivateAccount}
          loading={this.props.loading}
          ResendCode={this.ResendCode}
        />
      </ViewAuth>
    );
  }
}

const mapStateToProps = (state) => ({
  CurrentUser: selectors.selectCurrentUser(state),
  loading: selectors.selectLoading(state),
  errorMessage: selectors.selectErrorMessage(state),
  showModal: selectors.selectShowModalActivateAccounte(state),
});

export default connect(mapStateToProps)(SigninPage);

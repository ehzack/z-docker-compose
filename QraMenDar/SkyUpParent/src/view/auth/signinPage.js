import React, { Component, useState, useEffect } from "react";

import i18n from "../../i18n/index";
import actions from "../../modules/auth/authActions";
import { connect } from "react-redux";
import { Formik } from "formik";
import model from "../../modules/auth/userModel";
import FormSchema from "../shared/form/formSchema";
import plateform from "native-base-theme/variables/platform";
import {
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  View,
  Text,
} from "react-native";
import TextInputItem from "../shared/items/TextInputItem";
import ButtonLink from "../shared/styles/ButtonLink";
import ViewAuth from "../shared/styles/ViewAuth";
import CheckBox from "react-native-check-box";

import selectors from "../../modules/auth/authSelectors";

const { fields } = model;

const SigninPage = (props) => {
  const [submit, setSubmit] = useState(false);

  const schema = new FormSchema(fields.id, [
    fields.email,
    fields.password,
    fields.rememberMe,
  ]);

  const initialValues = () => {
    return schema.initialValues({ [fields.rememberMe.name]: true });
  };

  const handleSubmitLogin = (values) => {
    var dispatch = props.dispatch;
    dispatch(
      actions.doSigninWithEmailAndPassword(
        values.email,
        values.password,
        values.rememberMe
      )
    );
  };
  return (
    <ViewAuth style={{ justifyContent: "center" }}>
      <View
        style={{
          paddingTop: plateform.getResponsiveHeight(1),
          paddingBottom: plateform.getResponsiveHeight(5),
          width: plateform.getResponsiveWidth(40),
        }}
      >
        <Text
          style={{
            fontSize: plateform.normalize(26),
            textAlign: "center",
            color: "#3A3C6C",
            fontFamily: "CalibriBold",
          }}
        >
          Bienvenu A SkyUp Academy
        </Text>
      </View>
      <Formik
        initialValues={initialValues()}
        validationSchema={schema.schema}
        onSubmit={(values) => handleSubmitLogin(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => {
          console.log(values);
          return (
            <View>
              <View
                style={{
                  width: plateform.getResponsiveWidth(80),
                  paddingTop: plateform.getResponsiveHeight(2),
                  paddingBottom: plateform.getResponsiveHeight(2),
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
              </View>
              <View
                style={{
                  width: plateform.getResponsiveWidth(80),
                  paddingTop: plateform.getResponsiveHeight(2),
                  paddingBottom: plateform.getResponsiveHeight(2),
                }}
              >
                <TextInputItem
                  placeholder={fields.password.label}
                  value={values.password}
                  onChangeText={handleChange(fields.password.name)}
                  onBlur={handleBlur(fields.password.name)}
                  removeSpacing={true}
                  error={submit ? errors.password : false}
                  secureTextEntry={true}
                />
              </View>

              <View
                style={{
                  paddingTop: plateform.getResponsiveHeight(2),
                  paddingBottom: plateform.getResponsiveHeight(2),
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CheckBox
                  checkedCheckBoxColor={plateform.brandPrimary}
                  uncheckedCheckBoxColor={plateform.brandPrimary}
                  onClick={() => {
                    setFieldValue(fields.rememberMe.name, !values.rememberMe);
                  }}
                  isChecked={values.rememberMe}
                />
                <Text
                  style={{
                    fontSize: plateform.normalize(12),
                    opacity: 0.5,
                  }}
                >
                  {fields.rememberMe.label}
                </Text>
              </View>

              <View
                style={{
                  width: plateform.getResponsiveWidth(80),
                  paddingTop: plateform.getResponsiveHeight(2),
                  paddingBottom: plateform.getResponsiveHeight(2),
                }}
              >
                <ButtonLink
                  bold={true}
                  handleSubmit={() => {
                    setSubmit(true);
                    handleSubmit();
                  }}
                  loading={props.loading}
                >
                  {i18n.t("auth.signin")}
                </ButtonLink>
              </View>

              <View
                style={{
                  width: plateform.getResponsiveWidth(80),
                  paddingTop: plateform.getResponsiveHeight(2),
                  paddingBottom: plateform.getResponsiveHeight(2),
                }}
              >
                <Text
                  style={{
                    fontSize: plateform.normalize(10),
                    textAlign: "center",
                  }}
                >
                  Mot de passe oublié
                </Text>
              </View>
            </View>
          );
        }}
      </Formik>
    </ViewAuth>
  );
};

const mapStateToProps = (state) => ({
  loading: selectors.selectLoading(state),
  errorMessage: selectors.selectErrorMessage(state),
});

export default connect(mapStateToProps)(SigninPage);

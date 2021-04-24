import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import ViewMainProfileSetup from "../../shared/styles/ViewMainProfileSetup";
import plateform from "../../../../native-base-theme/variables/platform";

import { connect } from "react-redux";
import selectors from "../../../modules/candidat/candidatSelectors";
import FileUpload from "../../../modules/shared/upload/upload.js";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Col, Row, Grid } from "react-native-easy-grid";
import AutocompleteItem from "../../shared/items/Autocomplete";
import { Formik } from "formik";
import model from "../../../modules/candidat/candidatModel";
import FormSchema from "../../shared/form/formSchema";
import ListItemRate from "../../shared/list/listItemRate";
import Action from "../../../modules/candidat/candidatActions";
import DictionaryServices from "../../../modules/dictionary/dictionaryService";
import SelectFromItem from "../../shared/items/SelectFormItem";
import TextInputItem from "../../shared/items/TextInputItem";
import i18n from "../../../i18n/index";
const { fields } = model;

class Salary extends Component {
  schema = new FormSchema(fields.id, [fields.salary, fields.currency]);
  constructor(props) {
    super(props);
    this.state = {};
  }
  Fetchfn = async (value) => {
    return DictionaryServices.listAutocompleteDictionary(value, "SKL");
  };

  initialValues = () => {
    var { salary } = this.props;

    return this.schema.initialValues({
      salary: JSON.stringify(salary.salary),
      currency: { name: salary.currency },
    });
  };
  HandleUpdate = async (data) => {
    var { dispatch } = this.props;

    await dispatch(
      Action.DoUpdateSalaryCandidat({
        salary: parseInt(data.salary),
        currency: data.currency.name,
      })
    );
  };

  render() {
    var { salary } = this.props;
    return (
      <ViewMainProfileSetup
        Title={i18n.t("user.candidat.menu.preferences.salary.subTitle")}
        Keyword={i18n.t("user.candidat.fields.jobs")}
      >
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={(value) => {
            if (value.currency.name != undefined) {
              this.HandleUpdate(value);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            form,
          }) => {
            // this.HandleUpdate(values);
            return (
              <View
                style={{
                  marginTop: plateform.getRelativeHeight(20),
                  paddingTop: plateform.getRelativeHeight(10),
                  width: "100%",
                }}
              >
                <SelectFromItem
                  fields={fields}
                  name={fields.currency.name}
                  label={fields.currency.label}
                  placeholder={fields.currency.label}
                  value={values.currency}
                  onChange={(value) => {
                    handleSubmit();
                  }}
                  style={{
                    backgroundColor: "white",
                    height: plateform.getRelativeHeight(58),
                    borderRadius: 25,
                  }}
                />

                <TextInputItem
                  placeholder={fields.salary.label}
                  onChangeText={(value) => {
                    setFieldValue(fields.salary.name, value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur(fields.salary.name)}
                  value={values.salary}
                  keyboardType={"numeric"}
                  style={{ marginTop: plateform.getRelativeHeight(11) }}
                />
              </View>
            );
          }}
        </Formik>
      </ViewMainProfileSetup>
    );
  }
}

const mapStateToProps = (state) => ({
  listCurrency: selectors.selectListCurrency(state),
  salary: selectors.selectSalary(state),
});

export default connect(mapStateToProps)(Salary);

import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Form,
} from 'react-native';
import ViewWrapper from '../../shared/styles/ViewWrapper';
import platform from '../../../../native-base-theme/variables/platform';
import i18n from '../../../i18n/index';

import { ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import model from '../../../modules/recruiter/recruiterModel';
import FormSchema from '../../shared/form/formSchema';
import SelectFromItem from '../../shared/items/SelectFormItem';
import actions from '../../../modules/recruiter/setupProfile/setupProfileActions';
import selectors from '../../../modules/recruiter/setupProfile/setupProfileSelectors';
import authselectors from '../../../modules/auth/authSelectors';
import ButtonLink from '../../shared/styles/ButtonLink';
import ArrowLeft from '../../../../assets/icons/navigation/arrow-left.svg';
import TextInputItem from '../../shared/items/TextInputItem';
import Autocomplete from '../../shared/items/Autocomplete';
import DictionaryServices from '../../../modules/dictionary/dictionaryService';
import { onChange } from 'react-native-reanimated';

const { fields } = model;

class SetupProfile2 extends Component {
  schema = new FormSchema(fields.id, [
    fields.company_size,
    fields.localization,
    fields.bio,
  ]);
  constructor(props) {
    super(props);
    this.state = {};
  }
  Fetchfn = async (value) => {
    return DictionaryServices.listAutocompleteGeo(value);
  };

  initialValues = () => {
    return this.schema.initialValues();
  };

  handleSubmitStep2 = (value) => {
    var dispatch = this.props.dispatch;

    dispatch(actions.Step2Action(value));
  };
  render() {
    return (
      <ViewWrapper
        Title={i18n.t('user.candidat.setupProfile.setupProfile')}
        Keyword={i18n.t('user.candidat.fields.profile').toLowerCase()}
      >
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={(values) => this.handleSubmitStep2(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldValue,
          }) => {
            return (
              <View>
                <View>
                  <TextInputItem
                    placeholder={fields.company_size.label}
                    onChangeText={handleChange(fields.company_size.name)}
                    onBlur={handleBlur(fields.company_size.name)}
                    value={values.company_size}
                    style={{ marginTop: platform.getRelativeHeight(22) }}
                    keyboardType={'numeric'}
                  />

                  <Autocomplete
                    name={fields.localization.name}
                    placeholder={fields.localization.label}
                    value={values.localization || []}
                    Fetchfn={this.Fetchfn}
                    HandleUpdate={(data) => {
                      setFieldValue(fields.localization.name, data);
                    }}
                    style={{
                      marginTop: platform.getRelativeHeight(22),
                      paddingLeft: platform.getRelativeWidth(35),
                      paddingRight: platform.getRelativeWidth(35),
                    }}
                    solo={true}
                  />

                  <TextInputItem
                    editable={true}
                    multiline={true}
                    maxLength={40}
                    placeholder={fields.bio.label}
                    onChangeText={handleChange(fields.bio.name)}
                    onBlur={handleBlur(fields.bio.name)}
                    value={values.bio}
                    error={errors.bio}
                    style={{
                      marginTop: platform.getRelativeWidth(22),
                      backgroundColor: 'white',
                      height: platform.getRelativeHeight(210),
                    }}
                    styleTextInput={{
                      paddingTop: platform.getResponsiveHeight(3),
                      textAlignVertical: 'top',
                    }}
                    textArea={true}
                  />
                  <ButtonLink
                    bold={true}
                    style={{ marginTop: platform.getRelativeHeight(37) }}
                    handleSubmit={() => handleSubmit()}
                    loading={this.props.loading}
                  >
                    {i18n.t('common.next')}
                  </ButtonLink>
                </View>
              </View>
            );
          }}
        </Formik>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: platform.getRelativeHeight(30),
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={{
              width: platform.getRelativeWidth(64),
              height: platform.getRelativeHeight(36),
              backgroundColor: '#DADADA',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
            }}
          >
            <ArrowLeft />
          </TouchableOpacity>
        </View>
      </ViewWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: selectors.selectLoading(state),
});

export default connect(mapStateToProps)(SetupProfile2);

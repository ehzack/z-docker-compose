import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  List,
  Left,
  Right,
  Body,
  Icon,
  View,
  Form,
  Item,
  Label,
  Input,
  Card,
  CardItem,
  ActionSheet,
  Footer,
  Button,
} from 'native-base';
import {
  Modal,
  ScrollView,
  Alert,
  ListView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import ViewWrapper from '../../shared/styles/ViewWrapper';
import platform from '../../../../native-base-theme/variables/platform';
import i18n from '../../../i18n/index';
import actions from '../../../modules/recruiter//setupProfile/setupProfileActions';
import selectors from '../../../modules/recruiter/setupProfile/setupProfileSelectors';

import { ImageBackground, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import model from '../../../modules/recruiter/recruiterModel';
import FormSchema from '../../shared/form/formSchema';
import DictionaryServices from '../../../modules/dictionary/dictionaryService';
import AutoCompletList from '../../shared/input/autocomplet/autocompletList';
import Spinner from 'react-native-loading-spinner-overlay';
import ButtonLink from '../../shared/styles/ButtonLink';
import ArrowLeft from '../../../../assets/icons/navigation/arrow-left.svg';

const { fields } = model;
class SetupProfile3 extends Component {
  schema = new FormSchema(fields.id, [fields.expertises]);

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selected: new Array(),
      currentSelected: new Array(),

      loading: true,
      showList: true,
    };
  }
  initialValues = () => {
    return this.schema.initialValues();
  };

  fetchFn = async (value) => {
    console.log('heey');
    return await DictionaryServices.listAutocompleteDictionary(value, 'SKL');
  };

  initialValues = () => {
    return this.schema.initialValues();
  };
  handleSubmitStep3 = (values) => {
    var dispatch = this.props.dispatch;

    dispatch(actions.Step3Action(values));
  };

  render() {
    var { loading } = this.props;
    console.log(loading);
    return (
      <ViewWrapper
        Title="Let's Setup your profile first"
        Keyword="profile"
        withoutPadding={true}
      >
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={(values) => this.handleSubmitStep3(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            form,
          }) => {
            console.log(errors);
            return (
              <View
                style={{
                  width: '100%',
                }}
              >
                <AutoCompletList
                  fetchFn={this.fetchFn}
                  fields={fields}
                  name={fields.expertises.name}
                  label={fields.expertises.label}
                  placeholder={fields.expertises.label}
                  value={values.expertises}
                  style={{ marginTop: platform.getRelativeHeight(38) }}
                />
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: platform.getRelativeWidth(31),
                    paddingLeft: platform.getRelativeWidth(32),

                    paddingRight: platform.getRelativeWidth(32),
                  }}
                >
                  <ButtonLink
                    disabled={
                      values.expertises == null || values.expertises.length == 0
                    }
                    bold={true}
                    style={
                      values.expertises == null || values.expertises.length == 0
                        ? { opacity: 0.5 }
                        : { opacity: 1 }
                    }
                    handleSubmit={() => handleSubmit()}
                    loading={this.props.loading}
                  >
                    Next
                  </ButtonLink>
                </View>
              </View>
            );
          }}
        </Formik>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
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

export default connect(mapStateToProps)(SetupProfile3);

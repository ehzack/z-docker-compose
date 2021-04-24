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
import actions from '../../../modules/candidat/setupProfile/setupProfileActions';
import selectors from '../../../modules/candidat/setupProfile/setupProfileSelectors';

import { ImageBackground, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import model from '../../../modules/candidat/candidatModel';
import FormSchema from '../../shared/form/formSchema';
import DictionaryServices from '../../../modules/dictionary/dictionaryService';
import AutoCompletList from '../../shared/input/autocomplet/autocompletList';
import Spinner from 'react-native-loading-spinner-overlay';
import ButtonLink from '../../shared/styles/ButtonLink';
import ArrowLeft from '../../../../assets/icons/navigation/arrow-left.svg';
import Target3D from '../../../../assets/3DElements/target_2.svg';

const { fields } = model;
class SetupProfile2 extends Component {
  schema = new FormSchema(fields.id, [fields.skills]);

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

    dispatch(actions.Step2Action(values));
  };

  render() {
    var { loading } = this.props;
    console.log(loading);
    return (
      <ViewWrapper
        Title="My Skills"
        withoutPadding={true}
        WithBottomIcon={
          <Target3D
            width={platform.normalize(150)}
            height={platform.normalize(150)}
            style={{
              transform: [{ rotate: '-25deg' }],
              position: 'absolute',
              bottom: -platform.getResponsiveHeight(4),
              left: -platform.getRelativeWidth(27),
            }}
          />
        }
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
            return (
              <View
                style={{
                  width: '100%',
                }}
              >
                <AutoCompletList
                  fetchFn={this.fetchFn}
                  fields={fields}
                  name={fields.skills.name}
                  label={fields.skills.label}
                  placeholder={fields.skills.label}
                  value={values.skills}
                />
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: platform.getRelativeWidth(32),

                    paddingRight: platform.getRelativeWidth(32),
                  }}
                >
                  <ButtonLink
                    disabled={
                      values.skills == null || values.skills.length == 0
                    }
                    bold={true}
                    style={
                      values.skills == null || values.skills.length == 0
                        ? { opacity: 0.5 }
                        : { opacity: 1 }
                    }
                    handleSubmit={() => handleSubmit()}
                    loading={this.props.loading}
                    scroll={true}
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
      </ViewWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: selectors.selectLoading(state),
});

export default connect(mapStateToProps)(SetupProfile2);

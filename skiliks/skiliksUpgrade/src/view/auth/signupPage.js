import React, { Component } from 'react';
import {
  Container,
  Item,
  Input,
  Button,
  Text,
  View,
  Icon,
  Left,
  List,
  Right,
} from 'native-base';
import actions from '../../modules/auth/authActions';

import { Image, ImageBackground, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import model from '../../modules/auth/userModel';
import FormSchema from '../shared/form/formSchema';

import { AndroidBackHandler } from 'react-navigation-backhandler';
import platform from '../../../native-base-theme/variables/platform';
import selectors from '../../modules/auth/authSelectors';
import services from '../../modules/auth/authService';
import {
  Dimensions,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import InputRadioButton from '../shared/items/InputRadioButton';
import PhoneInput from '../shared/input/InputPhone/index';
import SelectI18n from '../shared/items/SelectI18n';
import ModalInputCode from './shared/ModalInputCode';
import ViewAuth from '../shared/styles/ViewAuth';
import ButtonGoogle from '../shared/styles/ButtonGoogle';

import ButtonLink from '../shared/styles/ButtonLink';
import TextInputItem from '../shared/items/TextInputItem';

import NavigationService from '../../navigation/NavigationService';
import i18n from '../../i18n';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const { fields } = model;
class SignupPage extends Component {
  schema = new FormSchema(fields.id, [
    fields.email,
    fields.password,

    fields.confirmPassword,
  ]);

  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      showModal: false,
      showI18n: true,
      pickerData: null,
      i18nTrigger: 0,
      submit: false,
    };
  }

  initialValues = () => {
    return this.schema.initialValues();
  };

  handleSubmitRegister(values) {
    var dispatch = this.props.dispatch;

    dispatch(actions.doRegisterEmailAndPassword(values.email, values.password));
  }

  ResendCode = () => {
    var CurrentUser = this.props.CurrentUser;
    services.sendEmailVerification(CurrentUser.email ? CurrentUser.email : '');
  };

  initAuth = () => {
    var dispatch = this.props.dispatch;

    dispatch(actions.doInitAuth(true));
  };

  toggleModal = (flag) => {
    this.setState({ showModal: flag });
  };

  handleRegisterGoogle = () => {
    var dispatch = this.props.dispatch;

    dispatch(actions.doSigninSocial());
  };
  handleActivateAccount = (value) => {
    var CurrentUser = this.props.CurrentUser;
    if (CurrentUser.email) {
      var dispatch = this.props.dispatch;
      dispatch(actions.doActivateAccount(CurrentUser.email, value));
    }
  };
  render() {
    var { submit } = this.state;
    return (
      <ViewAuth>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: platform.getRelativeHeight(60),
          }}
        >
          <Text
            style={{
              color: 'black',
              fontSize: platform.normalize(30),
              fontFamily: 'CalibriBold',
            }}
          >
            {i18n.t('auth.signup')}
          </Text>
        </View>

        <ButtonGoogle
          handleSubmit={() => this.handleRegisterGoogle()}
          style={{ marginTop: platform.getRelativeHeight(62) }}
        >
          {i18n.t('auth.signinGoogle')}
        </ButtonGoogle>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: platform.getRelativeHeight(21),
          }}
        >
          <Text
            style={{
              opacity: 0.4,
              fontSize: platform.normalize(15),
              color: 'black',
              fontFamily: 'Calibri',
            }}
          >
            or
          </Text>
        </View>

        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={(values) => this.handleSubmitRegister(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
            console.log(errors);
            return (
              <View
                style={{
                  width: '100%',

                  marginTop: platform.getRelativeHeight(12),
                }}
              >
                <View style={{ width: '100%' }}>
                  <TextInputItem
                    placeholder={fields.email.label}
                    onChangeText={handleChange(fields.email.name)}
                    onBlur={handleBlur(fields.email.name)}
                    value={values.email}
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
                      marginTop: platform.getRelativeHeight(12),
                    }}
                    error={submit ? errors.password : false}
                  />
                  <TextInputItem
                    placeholder={fields.confirmPassword.label}
                    secureTextEntry={true}
                    onChangeText={handleChange(fields.confirmPassword.name)}
                    onBlur={handleBlur(fields.confirmPassword.name)}
                    value={values.confirmPassword}
                    style={{
                      marginTop: platform.getRelativeHeight(12),
                    }}
                    error={submit ? errors.confirmPassword : false}
                  />

                  <ButtonLink
                    bold={true}
                    style={{ marginTop: platform.getRelativeHeight(37) }}
                    handleSubmit={() => {
                      this.setState({ submit: true });
                      handleSubmit();
                    }}
                    loading={this.props.loading}
                  >
                    {i18n.t('common.getstarted')}
                  </ButtonLink>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: platform.getRelativeHeight(14),
                  }}
                >
                  <Text
                    style={{
                      fontSize: platform.getRelativeWidth(15),
                      lineHeight: platform.getRelativeWidth(20),
                      color: platform.brandSuccess,
                      fontFamily: 'Calibri',
                      color: '#999999',
                    }}
                  >
                    {i18n.t('auth.forgotPassword')}
                  </Text>
                  <TouchableOpacity
                    style={{ marginLeft: platform.getRelativeWidth(5) }}
                    onPress={() =>
                      this.props.navigation.navigate('ForgotPassword')
                    }
                  >
                    <Text
                      style={{
                        fontSize: platform.getRelativeWidth(15),
                        lineHeight: platform.getRelativeWidth(20),
                        color: platform.brandSuccess,
                        fontFamily: 'Calibri',
                        color: platform.brandPrimary,
                      }}
                    >
                      {i18n.t('common.resetHere')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    marginTop: platform.getRelativeHeight(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.props.navigation.replace('SigninPage')}
                  >
                    <Text
                      style={{
                        fontSize: platform.getRelativeWidth(18),
                        lineHeight: platform.getRelativeWidth(20),
                        color: platform.brandSuccess,
                        fontFamily: 'Calibri',
                        color: platform.brandPrimary,
                        fontWeight: 'bold',
                      }}
                    >
                      {i18n.t('auth.signin')} !
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
          toggleModal={this.navigateToLogin}
          handleActivateAccount={this.handleActivateAccount}
          loading={this.props.loading}
          initAuth={this.initAuth}
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

export default connect(mapStateToProps)(SignupPage);

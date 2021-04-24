import React, { Component } from 'react';

import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Card,
  CardItem,
  Thumbnail,
  View,
  H1,
  Item,
  Input,
} from 'native-base';
import {
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import i18n from '../../../i18n/index';
import actions from '../../../modules/auth/authActions';
import platform from '../../../../native-base-theme/variables/platform';
import SelectI18n from '../../shared/items/SelectI18n';
import ViewAuth from '../../shared/styles/ViewAuth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import selectors from '../../../modules/auth/authSelectors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputCode from '../../shared/input/inputCode';
import model from '../../../modules/auth/userModel';
import FormSchema from '../../shared/form/formSchema';
import NavigationService from '../../../navigation/NavigationService';
import ButtonLink from '../../shared/styles/ButtonLink';
import TextInputItem from '../../shared/items/TextInputItem';
const { fields } = model;
class UpdatePassword extends Component {
  schema = new FormSchema(fields.id, [fields.password, fields.confirmPassword]);

  handleSubmitUpdatePassword(values) {
    var dispatch = this.props.dispatch;
    var { CurrentUser } = this.props;

    dispatch(
      actions.resetEmailUpdatePassword(
        values.password,
        CurrentUser.refresh_token,
        CurrentUser.email,
      ),
    );
  }

  initialValues = () => {
    return this.schema.initialValues();
  };
  render() {
    return (
      <ViewAuth
        style={{
          paddingTop: platform.getRelativeHeight(50),
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              width: platform.getRelativeWidth(90),
              height: platform.getRelativeHeight(110),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,

              elevation: 24,
            }}
            source={require('../../../../assets/icons/messaging/done.png')}
          />
          <Text
            style={{
              marginTop: platform.getRelativeHeight(60),
              color: 'black',
              fontSize: platform.getRelativeWidth(21),
              lineHeight: platform.getRelativeWidth(26),
              color: platform.brandDark,
              fontFamily: 'Calibri',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {i18n.t('auth.createNewPassword')}
          </Text>

          <Text
            style={{
              color: 'black',
              fontSize: platform.getRelativeWidth(14),
              lineHeight: platform.getRelativeWidth(17),
              color: platform.brandDark,
              fontFamily: 'Calibri',
              textAlign: 'center',
            }}
          >
            {i18n.t('auth.createNewPasswordExplain')}
          </Text>
        </View>
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.schema.schema}
          onSubmit={(values) => this.handleSubmitUpdatePassword(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {/* <View style={{ marginLeft: "auto", marginRight: "auto" }}>
                    {errors.email && (
                      <Text style={{ color: "red" }}>{errors.email}</Text>
                    )}
                    {errorMessage != null && (
                      <Text style={{ color: "red" }}>{errorMessage}</Text>
                    )}
                  </View> */}
                <TextInputItem
                  placeholder={fields.password.label}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  secureTextEntry={true}
                  placeholder={fields.password.label}
                  onChangeText={handleChange(fields.password.name)}
                  onBlur={handleBlur(fields.password.name)}
                  value={values.password}
                  error={errors.password}
                />

                <TextInputItem
                  placeholder={fields.confirmPassword.label}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  secureTextEntry={true}
                  placeholder={fields.confirmPassword.label}
                  onChangeText={handleChange(fields.confirmPassword.name)}
                  onBlur={handleBlur(fields.confirmPassword.name)}
                  value={values.confirmPassword}
                  style={{ marginTop: platform.getRelativeHeight(10) }}
                  error={errors.confirmPassword}
                />

                <ButtonLink
                  bold={true}
                  handleSubmit={() => handleSubmit()}
                  loading={this.props.loading}
                  style={{ marginTop: platform.getRelativeHeight(43) }}
                >
                  {i18n.t('auth.savePassword')}
                </ButtonLink>
              </View>
            );
          }}
        </Formik>
        <View
          style={{
            marginTop: platform.getRelativeHeight(50),

            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'black',
              fontSize: platform.getRelativeWidth(18),
              lineHeight: platform.getRelativeWidth(20),
              color: platform.brandDark,
              fontFamily: 'Calibri',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {i18n.t('common.backTo')}
          </Text>
          <TouchableOpacity
            onPress={() => NavigationService.Reset('AuthStack', 'SigninPage')}
          >
            <Text
              style={{
                marginLeft: 5,
                color: 'black',
                fontSize: platform.getRelativeWidth(18),
                lineHeight: platform.getRelativeWidth(20),
                color: platform.brandPrimary,
                fontFamily: 'Calibri',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {i18n.t('auth.signin')}
            </Text>
          </TouchableOpacity>
        </View>

        <SelectI18n
          trigger={() => this.setState({ i18nTrigger: 1 })}
          style={{ flex: 1 }}
        />
      </ViewAuth>
    );
  }
}

const mapStateToProps = (state) => ({
  CurrentUser: selectors.selectCurrentUser(state),
  loading: selectors.selectLoadingPasswordReset(state),
  errorMessage: selectors.selectErrorMessage(state),
  showModal: selectors.selectShowModalActivateAccounte(state),
});
export default connect(mapStateToProps)(UpdatePassword);

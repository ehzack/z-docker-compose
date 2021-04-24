import React, { Component } from 'react';

import { Button, Text, View, Item, Input, Container } from 'native-base';
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

import { Formik } from 'formik';
import model from '../../../modules/auth/userModel';
import FormSchema from '../../shared/form/formSchema';
import ViewAuth from '../../shared/styles/ViewAuth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import selectors from '../../../modules/auth/authSelectors';
import SelectI18n from '../../shared/items/SelectI18n';
import ButtonLink from '../../shared/styles/ButtonLink';
import TextInputItem from '../../shared/items/TextInputItem';
import MailSVG from 'assets/3DElements/mail.svg';
const { fields } = model;

class SendMailCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i18nTrigger: 0,
    };
  }
  schema = new FormSchema(fields.id, [fields.email]);

  handleSubmitSendMail(values) {
    var dispatch = this.props.dispatch;
    dispatch(actions.doSendPasswordResetEmail(values.email));
  }

  render() {
    var { errorMessage } = this.props;

    return (
      <ViewAuth>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: platform.getResponsiveHeight(20),
          }}
        >
          <View
            style={{
              paddingBottom: platform.getResponsiveHeight(6),
            }}
          >
            <MailSVG
              width={platform.normalize(120)}
              height={platform.normalize(120)}
            />
          </View>
          <Text
            style={{
              fontSize: platform.getRelativeWidth(21),
              color: platform.brandDark,
              fontFamily: 'CalibriBold',
              textAlign: 'center',
            }}
          >
            {i18n.t('auth.forgotYourPassword')}
          </Text>

          <Text
            style={{
              color: 'black',
              fontSize: platform.getRelativeWidth(14),
              fontFamily: 'Calibri',
              textAlign: 'center',

              paddingTop: platform.getResponsiveHeight(1),
            }}
          >
            {i18n.t('auth.forgotpasswordExplain')}
          </Text>
        </View>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={this.schema.schema}
          onSubmit={(values) => this.handleSubmitSendMail(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View
              style={{
                marginTop: 35,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <TextInputItem
                placeholder={fields.email.label}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={{
                  marginTop: platform.getRelativeHeight(7),
                }}
                removeSpacing={true}
                error={errors.email}
                textAlign={'center'}
              />

              <ButtonLink
                bold={true}
                style={{ marginTop: platform.getRelativeHeight(37) }}
                handleSubmit={() => handleSubmit()}
                loading={this.props.loading}
              >
                {i18n.t('common.send')}
              </ButtonLink>
            </View>
          )}
        </Formik>
        <View
          style={{
            marginTop: platform.getRelativeHeight(80),
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
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
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

export default connect(mapStateToProps)(SendMailCode);

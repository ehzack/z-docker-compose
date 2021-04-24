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
  Platform,
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
import ButtonLink from '../../shared/styles/ButtonLink';
import TextInputItem from '../../shared/items/TextInputItem';
import NavigationService from '../../../navigation/NavigationService.js';
import MailSVG from '../../../../assets/3DElements/mail.svg';

class SetMailCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i18nTrigger: 0,
    };
  }
  handleSubmitSendCode = (values) => {
    var dispatch = this.props.dispatch;
    let { CurrentUser } = this.props;
    console.log(values);
    dispatch(actions.doSendCodeResetEmail(CurrentUser.email, values.code));
  };

  render() {
    var { errorMessage, CurrentUser } = this.props;
    var CurrentEmail = CurrentUser.email;

    return (
      <ViewAuth>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: platform.getResponsiveHeight(24),
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
              color: 'black',
              fontSize: platform.getRelativeWidth(21),
              lineHeight: platform.getRelativeWidth(26),
              fontFamily: 'Calibri',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {i18n.t('auth.checkmail')}
          </Text>

          <Text
            style={{
              color: 'black',
              fontSize: platform.getRelativeWidth(14),
              paddingLeft: platform.getRelativeWidth(17),
              paddingRight: platform.getRelativeWidth(17),

              color: platform.brandDark,
              fontFamily: 'Calibri',
              textAlign: 'center',
              paddingTop: platform.getResponsiveHeight(1),
            }}
          >
            {i18n.t('auth.entercode')}
            <Text
              style={{
                color: 'black',
                fontSize: platform.getRelativeWidth(14),
                fontFamily: 'CalibriBold',
                textAlign: 'center',
                paddingLeft: 15,
              }}
            >
              {CurrentEmail}
            </Text>
          </Text>
        </View>
        <Formik
          initialValues={{ code: '' }}
          validationSchema={Yup.object().shape({
            code: Yup.number().required('Required'),
          })}
          onSubmit={(values) => this.handleSubmitSendCode(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
            return (
              <View
                style={{
                  marginTop: 35,
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
                <InputCode
                  onChangeText={handleChange('code')}
                  value={values.code}
                />
                <ButtonLink
                  bold={true}
                  handleSubmit={() => handleSubmit()}
                  loading={this.props.loading}
                  style={{ marginTop: platform.getResponsiveHeight(3) }}
                >
                  {i18n.t('common.send')}
                </ButtonLink>
              </View>
            );
          }}
        </Formik>
        <View
          style={{
            marginTop: platform.getResponsiveHeight(10),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
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

export default connect(mapStateToProps)(SetMailCode);

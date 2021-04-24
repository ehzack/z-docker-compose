import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import ViewMainProfileSetup from '../../shared/styles/ViewAuth';
import plateform from '../../../../native-base-theme/variables/platform';

import { connect } from 'react-redux';
import selectors from '../../../modules/auth/authSelectors';
import FileUpload from '../../../modules/shared/upload/upload.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AutocompleteItem from '../../shared/items/Autocomplete';
import { Formik } from 'formik';
import model from '../../../modules/auth/userModel.js';
import FormSchema from '../../shared/form/formSchema';
import ListItemRate from '../../shared/list/listItemRate';
import Action from '../../../modules/auth/authActions';
import DictionaryServices from '../../../modules/dictionary/dictionaryService';
import i18n from '../../../i18n/index';
import Logo from 'assets/3DElements/lock.svg';
import ButtonLink from 'src/view/shared/styles/ButtonLink';
import TextInputItem from 'src/view/shared/items/TextInputItem';
const { fields } = model;

class UpdatePasswordUser extends Component {
  schema = new FormSchema(fields.id, [
    fields.password,
    fields.confirmPassword,
    fields.currentPassword,
  ]);
  constructor(props) {
    super(props);
    this.state = { submit: false };
  }

  initialValues = () => {
    var { currenUser } = this.props;
    return this.schema.initialValues();
  };
  handlUpdate = (data) => {
    var { dispatch, currenUser } = this.props;
    dispatch(
      Action.doUpdatePassword(
        currenUser.email,
        data.currentPassword,
        data.password,
      ),
    );
  };

  render() {
    var { submit } = this.state;
    var { loading } = this.props;

    return (
      <ViewMainProfileSetup>
        <View style={{ paddingTop: plateform.getResponsiveHeight(10) }}>
          <Logo
            height={plateform.circleSize(400)}
            width={plateform.circleSize(400)}
          />
        </View>

        <View style={{ paddingTop: plateform.getResponsiveHeight(5) }}>
          <Text
            style={{
              fontFamily: 'CalibriBold',
              fontSize: plateform.normalize(22),
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {i18n.t('auth.editpassword.title')}
          </Text>
        </View>
        <View
          style={{
            paddingTop: plateform.getResponsiveHeight(2),
            paddingBottom: plateform.getResponsiveHeight(5),
          }}
        >
          <Text
            style={{
              fontFamily: 'Calibri',
              fontSize: plateform.normalize(16),
              textAlign: 'center',
            }}
          >
            {i18n.t('auth.editpassword.subTitle')}
          </Text>
        </View>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={(values) => this.handlUpdate(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldValue,
          }) => {
            console.log(errors);
            return (
              <View style={{ width: '100%' }}>
                <TextInputItem
                  placeholder={fields.currentPassword.label}
                  secureTextEntry={true}
                  onChangeText={handleChange(fields.currentPassword.name)}
                  onBlur={handleBlur(fields.currentPassword.name)}
                  value={values.currentPassword}
                  error={submit ? errors.currentPassword : false}
                  scroll
                />
                <TextInputItem
                  placeholder={fields.password.label}
                  secureTextEntry={true}
                  onChangeText={handleChange(fields.password.name)}
                  onBlur={handleBlur(fields.password.name)}
                  value={values.password}
                  error={submit ? errors.password : false}
                  scroll
                />
                <TextInputItem
                  placeholder={fields.confirmPassword.label}
                  secureTextEntry={true}
                  onChangeText={handleChange(fields.confirmPassword.name)}
                  onBlur={handleBlur(fields.confirmPassword.name)}
                  value={values.confirmPassword}
                  error={submit ? errors.confirmPassword : false}
                  scroll
                />
                <View style={{ paddingTop: plateform.getResponsiveHeight(2) }}>
                  <ButtonLink
                    scroll
                    bold
                    loading={loading}
                    handleSubmit={() => {
                      this.setState({ submit: true });

                      handleSubmit();
                    }}
                  >
                    {i18n.t('common.save')}
                  </ButtonLink>
                </View>
              </View>
            );
          }}
        </Formik>
      </ViewMainProfileSetup>
    );
  }
}

const mapStateToProps = (state) => ({
  currenUser: selectors.selectCurrentUser(state),
  loading: selectors.selectLoading(state),
});

export default connect(mapStateToProps)(UpdatePasswordUser);

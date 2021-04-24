import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import ViewWrapper2 from '../../shared/styles/ViewMain';
import platform from '../../../../native-base-theme/variables/platform';
import modelAuth from '../../../modules/auth/userModel';
import model from '../../../modules/recruiter/recruiterModel.js';
import SwitchSelector from 'react-native-switch-selector';

import { connect } from 'react-redux';
import authSelectors from '../../../modules/auth/authSelectors';
import selectors from '../../../modules/recruiter/recruiterSelectors';

import FileUpload from '../../../modules/shared/upload/upload.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import NavigationService from '../../../navigation/NavigationService.js';
import actions from '../../../modules/recruiter/recruiterActions';
import ImagesUploader from '../../shared/uploaders/imagesUploaders';
import FormSchema from '../../shared/form/formSchema';
import { Formik, Field } from 'formik';
import TextInputItem from '../../shared/items/TextInputItem';
import ButtonLink from '../../shared/styles/ButtonLink';
import SelectFromItem from '../../shared/items/SelectFormItem';
import i18n from '../../../i18n/index';
import SwitchItem from 'src/view/shared/items/switchFormItem';
import Logo from 'assets/3DElements/pencil.svg';
const { fields } = model;
const fieldAuth = modelAuth.fields;
const fieldsRecruiter = fields;

class MainProfile extends Component {
  schema = new FormSchema(fieldAuth.id, [
    fieldAuth.avatar_profile,
    fieldAuth.first_name,
    fieldAuth.last_name,
    fieldAuth.gender,

    fieldsRecruiter.company_name,
    fieldsRecruiter.title,
  ]);
  constructor(props) {
    super(props);
    this.state = { submit: false };
  }
  componentDidMount = () => {
    var { dispatch } = this.props;
    dispatch(actions.DoListProfile());
  };
  handleUpdate = (data) => {
    var { dispatch } = this.props;
    console.log('Hello');
    dispatch(actions.DoUpdateProfile(data));
  };
  initialValues = () => {
    let {
      avatar,
      title,
      company_name,
      first_name,
      last_name,
      currentUser,
    } = this.props;
    return this.schema.initialValues({
      avatar_profile: avatar,
      title,
      first_name,
      last_name,
      company_name,
      [fieldAuth.gender.name]: currentUser.gender,
    });
  };
  randerTitle = (item) => (
    <View
      style={{
        marginTop: platform.getRelativeHeight(13),

        width: platform.getRelativeWidth(325),
        paddingLeft: platform.getRelativeWidth(10),
      }}
    >
      <Text
        style={{
          fontFamily: 'Calibri',
          color: '#898989',
          fontSize: platform.getRelativeWidth(15),
        }}
      >
        {item}
      </Text>
    </View>
  );
  render() {
    var { fullName, loadInit } = this.props;
    var { submit } = this.state;

    return (
      <ViewWrapper2
        Title={i18n.t('user.recruiter.navigation.profile')}
        Icon={
          <Logo
            height={platform.normalize(80)}
            width={platform.normalize(80)}
          />
        }
      >
        {!loadInit && (
          <Formik
            initialValues={this.initialValues()}
            validationSchema={this.schema.schema}
            onSubmit={(values) => this.handleUpdate(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
              console.log(values);
              return (
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ImagesUploader
                    schema={this.schema.schema}
                    handleChange={handleChange(fieldAuth.avatar_profile.name)}
                    name={fieldAuth.avatar_profile.name}
                    values={values.avatar_profile}
                    path={fieldAuth.avatar_profile.path}
                  />

                  <TextInputItem
                    placeholder={fieldAuth.first_name.label}
                    onChangeText={handleChange(fieldAuth.first_name.name)}
                    onBlur={handleBlur(fieldAuth.first_name.name)}
                    value={values.first_name}
                    scroll={true}
                    error={submit ? errors.first_name : false}
                  />
                  <TextInputItem
                    placeholder={fieldAuth.last_name.label}
                    onChangeText={handleChange(fieldAuth.last_name.name)}
                    onBlur={handleBlur(fieldAuth.last_name.name)}
                    value={values.last_name}
                    scroll={true}
                    error={submit ? errors.last_name : false}
                  />
                  <SwitchItem
                    placeholder={fieldAuth.gender.label}
                    onChangeText={handleChange(fieldAuth.gender.name)}
                    onBlur={handleBlur(fieldAuth.gender.name)}
                    value={values.gender}
                    options={fieldAuth.gender.options}
                    scroll
                  />
                  <TextInputItem
                    placeholder={fields.title.label}
                    onChangeText={handleChange(fields.title.name)}
                    onBlur={handleBlur(fields.title.name)}
                    value={values.title}
                    scroll
                  />
                  <TextInputItem
                    placeholder={fields.company_name.label}
                    onChangeText={handleChange(fields.company_name.name)}
                    onBlur={handleBlur(fields.company_name.name)}
                    value={values.company_name}
                    scroll
                  />
                  <View
                    style={{
                      height: platform.getResponsiveHeight(6),
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Calibri',
                        fontSize: platform.normalize(14),
                        color: 'black',
                        textAlign: 'center',
                      }}
                    >
                      Builde your profile with accurate information so that
                      people can trust you.
                    </Text>
                  </View>

                  <ButtonLink
                    bold={true}
                    handleSubmit={() => {
                      this.setState({ submit: true });
                      handleSubmit();
                    }}
                    loading={this.props.loading}
                    scroll
                  >
                    {i18n.t('common.save')}
                  </ButtonLink>
                </View>
              );
            }}
          </Formik>
        )}
      </ViewWrapper2>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: authSelectors.selectAvatar(state),
  fullName: authSelectors.selectCurrentUserFullName(state),
  currentUser: authSelectors.selectCurrentUser(state),
  first_name: authSelectors.selectCurrentUserfirst_name(state),
  last_name: authSelectors.selectCurrentUserlast_name(state),
  title: selectors.selectTitle(state),
  company_name: selectors.selectCompanyName(state),

  loading: selectors.selectLoading(state),
  loadInit: selectors.selectLoadingInit(state),
});

export default connect(mapStateToProps)(MainProfile);

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import ViewWrapper2 from '../../shared/styles/ViewMain';
import platform from '../../../../native-base-theme/variables/platform';
import modelAuth from '../../../modules/auth/userModel';
import model from '../../../modules/candidat/candidatModel';
import SwitchSelector from 'react-native-switch-selector';

import { connect } from 'react-redux';
import authSelectors from '../../../modules/auth/authSelectors';
import selectors from '../../../modules/candidat/candidatSelectors';

import FileUpload from '../../../modules/shared/upload/upload.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import NavigationService from '../../../navigation/NavigationService.js';
import actions from '../../../modules/candidat/candidatActions';
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

class MainProfile extends Component {
  schema = new FormSchema(fieldAuth.id, [
    fieldAuth.avatar_profile,
    fieldAuth.first_name,
    fieldAuth.last_name,
    fieldAuth.gender,
    fields.title,
    fields.bio,
    fields.study_level,
    fields.work_years_number,
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
    console.log(data);
    dispatch(actions.DoUpdateProfile(data));
  };
  initialValues = () => {
    let {
      avatar,
      fullName,
      bio,
      title,
      study_level,
      gender,
      first_name,
      last_name,
      work_years_number,
    } = this.props;

    return this.schema.initialValues({
      avatar_profile: avatar,
      bio,
      title,
      study_level,
      work_years_number,
      gender,
      first_name,
      last_name,
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
        Title={i18n.t('user.candidat.fields.profile')}
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
                  <SelectFromItem
                    fields={fields}
                    name={fields.study_level.name}
                    label={fields.study_level.label}
                    placeholder={fields.study_level.label}
                    value={values.study_level}
                    style={{
                      backgroundColor: 'white',
                      width: platform.getRelativeWidth(305),
                      height: platform.getRelativeHeight(58),
                      borderRadius: 25,
                    }}
                    scroll
                  />
                  <SelectFromItem
                    fields={fields}
                    name={fields.work_years_number.name}
                    label={fields.work_years_number.label}
                    placeholder={fields.work_years_number.label}
                    style={{
                      backgroundColor: 'white',
                      height: platform.getRelativeHeight(58),
                      borderRadius: 25,
                    }}
                    scroll={true}
                    error={submit ? errors.work_years_number : false}
                  />

                  <TextInputItem
                    editable={true}
                    multiline={true}
                    maxLength={40}
                    placeholder={fields.bio.label}
                    onChangeText={handleChange(fields.bio.name)}
                    onBlur={handleBlur(fields.bio.name)}
                    value={values.bio}
                    style={{
                      height: platform.getResponsiveHeight(30),
                    }}
                    styleTextInput={{
                      paddingTop: platform.getResponsiveHeight(3),
                      textAlignVertical: 'top',
                    }}
                    textArea={true}
                    error={errors.bio}
                    scroll={true}
                  />
                  <ButtonLink
                    bold={true}
                    style={{ marginTop: platform.getRelativeHeight(20) }}
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
  gender: authSelectors.selectGender(state),
  bio: selectors.selectBio(state),
  work_years_number: selectors.selectWorkYearsNumber(state),
  study_level: selectors.selectstudy_level(state),
  title: selectors.selectTitle(state),
  skills: selectors.selectSkills(state),
  loading: selectors.selectLoading(state),
  loadInit: selectors.selectLoadingInit(state),
});

export default connect(mapStateToProps)(MainProfile);

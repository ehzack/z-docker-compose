import React, { Component } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import platform from '../../../../native-base-theme/variables/platform';

import { ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import model from '../../../modules/auth/userModel';
import modelCandidat from '../../../modules/candidat/candidatModel';
import i18n from '../../../i18n/index';
import SelectFromItem from '../../shared/items/SelectFormItem';

import FormSchema from '../../shared/form/formSchema';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { Picker, Item } from 'native-base';
import ImagesUploader from '../../shared/uploaders/imagesUploaders';
import selectors from '../../../modules/candidat/setupProfile/setupProfileSelectors';
import authselectors from '../../../modules/auth/authSelectors';
import ButtonLink from '../../shared/styles/ButtonLink';
import TextInputItem from '../../shared/items/TextInputItem';
import actions from '../../../modules/candidat/setupProfile/setupProfileActions';
import ArrowLeft from '../../../../assets/icons/navigation/arrow-left.svg';
import ViewWrapper from '../../shared/styles/ViewMain';
import Logo from 'assets/Logo.svg';
import SwitchItem from 'src/view/shared/items/switchFormItem';

const { fields } = model;
const fieldsCandidat = modelCandidat.fields;

class SetupProfile1 extends Component {
  schema = new FormSchema(fields.id, [
    fields.avatar_profile,
    fields.first_name,
    fields.last_name,
    fields.gender,
    fieldsCandidat.title,
    fieldsCandidat.work_years_number,
    fieldsCandidat.study_level,
    fieldsCandidat.bio,
  ]);
  constructor(props) {
    super(props);
    this.state = { submit: false };
  }

  initialValues = () => {
    return this.schema.initialValues({
      gender: 'male',
      avatar_profile: this.props.avatar_profile,
    });
  };

  handleChoosePicture = () => {
    const options = {
      noData: true,
    };
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async (response) => {
        this.setState({ loading: true });
        response.fileName = 'ProfileImage';
        // let Image = await UploadFile.uploadFromRequest(response);
      })
      .catch((error) => {});
  };
  handleSubmitSetupProfile = (data) => {
    var dispatch = this.props.dispatch;

    dispatch(actions.Step1Action(data));
  };

  render() {
    var { submit } = this.state;
    return (
      <ViewWrapper
        Title={'My Profile'}
        Icon={<Logo height={platform.getResponsiveHeight(10)} />}
      >
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={(values) => this.handleSubmitSetupProfile(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
            console.log(errors);
            return (
              <View style={{ width: '100%', alignItems: 'center' }}>
                <ImagesUploader
                  schema={this.schema.schema}
                  handleChange={handleChange(fields.avatar_profile.name)}
                  name={fields.avatar_profile.name}
                  values={values.avatar_profile}
                  path={fields.avatar_profile.path}
                  scroll={true}
                />
                <TextInputItem
                  placeholder={fields.first_name.label}
                  onChangeText={handleChange(fields.first_name.name)}
                  onBlur={handleBlur(fields.first_name.name)}
                  value={values.first_name}
                  scroll={true}
                  error={submit ? errors.first_name : false}
                />

                <TextInputItem
                  placeholder={fields.last_name.label}
                  onChangeText={handleChange(fields.last_name.name)}
                  onBlur={handleBlur(fields.last_name.name)}
                  value={values.last_name}
                  scroll={true}
                  error={submit ? errors.last_name : false}
                />
                <SwitchItem
                  placeholder={fields.gender.label}
                  onChangeText={handleChange(fields.gender.name)}
                  onBlur={handleBlur(fields.gender.name)}
                  value={values.gender}
                  options={fields.gender.options}
                  scroll={true}
                />

                <TextInputItem
                  placeholder={fieldsCandidat.title.label}
                  onChangeText={handleChange(fieldsCandidat.title.name)}
                  onBlur={handleBlur(fieldsCandidat.title.name)}
                  value={values.title}
                  scroll={true}
                  error={submit ? errors.title : false}
                />

                <SelectFromItem
                  fields={fieldsCandidat}
                  name={fieldsCandidat.study_level.name}
                  label={fieldsCandidat.study_level.label}
                  placeholder={fieldsCandidat.study_level.label}
                  value={values.study_level}
                  style={{
                    backgroundColor: 'white',
                    height: platform.getRelativeHeight(58),
                    borderRadius: 25,
                  }}
                  scroll={true}
                  error={submit ? errors.study_level : false}
                />

                <SelectFromItem
                  fields={fieldsCandidat}
                  name={fieldsCandidat.work_years_number.name}
                  label={fieldsCandidat.work_years_number.label}
                  placeholder={fieldsCandidat.work_years_number.label}
                  scroll={true}
                  value={values.work_years_number}
                  error={submit ? errors.work_years_number : false}
                />

                <TextInputItem
                  editable={true}
                  multiline={true}
                  maxLength={40}
                  placeholder={fieldsCandidat.bio.label}
                  onChangeText={handleChange(fieldsCandidat.bio.name)}
                  onBlur={handleBlur(fieldsCandidat.bio.name)}
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
                    Builde your profile with accurate information so that people
                    can trust you.
                  </Text>
                </View>

                <ButtonLink
                  bold={true}
                  handleSubmit={() => {
                    this.setState({ submit: true });

                    handleSubmit();
                  }}
                  loading={this.props.loading}
                  scroll={true}
                >
                  {i18n.t('common.next')}
                </ButtonLink>
              </View>
            );
          }}
        </Formik>
      </ViewWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: selectors.selectLoading(state),
  avatar_profile: authselectors.selectCurrentUserAvatar(state),
});

export default connect(mapStateToProps)(SetupProfile1);

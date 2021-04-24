import React, { Component } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import ViewWrapper from '../../shared/styles/ViewMain';
import platform from '../../../../native-base-theme/variables/platform';

import { ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import model from '../../../modules/auth/userModel';
import modelRecruiter from '../../../modules/recruiter/recruiterModel.js';
import i18n from '../../../i18n/index';
import Spinner from 'react-native-loading-spinner-overlay';

import FormSchema from '../../shared/form/formSchema';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { Picker, Item } from 'native-base';
import SwitchSelector from 'react-native-switch-selector';
import ImagesUploader from '../../shared/uploaders/imagesUploaders';
import selectors from '../../../modules/recruiter/setupProfile/setupProfileSelectors';
import authselectors from '../../../modules/auth/authSelectors';
import ButtonLink from '../../shared/styles/ButtonLink';
import TextInputItem from '../../shared/items/TextInputItem';
import actions from '../../../modules/recruiter/setupProfile/setupProfileActions';
import ArrowLeft from '../../../../assets/icons/navigation/arrow-left.svg';
import SelectFromItem from '../../shared/items/SelectFormItem';
import Logo from 'assets/Logo.svg';

const { fields } = model;
const fieldsRecruiter = modelRecruiter.fields;

class SetupProfile1 extends Component {
  schema = new FormSchema(fields.id, [
    fields.avatar_profile,
    fields.first_name,
    fields.last_name,
    fieldsRecruiter.company_name,
    fieldsRecruiter.title,
  ]);
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
    };
  }

  initialValues = () => {
    console.log('Avatar ***************** ', this.props.avatar_profile);
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
              <View>
                <View>
                  <ImagesUploader
                    schema={this.schema.schema}
                    handleChange={handleChange(fields.avatar_profile.name)}
                    name={fields.avatar_profile.name}
                    values={values.avatar_profile}
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
                    placeholder={fields.last_name.name}
                    onChangeText={handleChange(fields.last_name.name)}
                    onBlur={handleBlur(fields.last_name.name)}
                    value={values.last_name}
                    scroll={true}
                    error={submit ? errors.last_name : false}
                  />

                  <TextInputItem
                    placeholder={fieldsRecruiter.title.name}
                    onChangeText={handleChange(fieldsRecruiter.title.name)}
                    onBlur={handleBlur(fieldsRecruiter.title.name)}
                    value={values.title}
                    scroll={true}
                    error={submit ? errors.title : false}
                  />

                  <TextInputItem
                    placeholder={fieldsRecruiter.company_name.name}
                    onChangeText={handleChange(
                      fieldsRecruiter.company_name.name,
                    )}
                    onBlur={handleBlur(fieldsRecruiter.company_name.name)}
                    value={values.company_name}
                    scroll={true}
                    error={submit ? errors.company_name : false}
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
                    scroll={true}
                  >
                    {i18n.t('common.next')}
                  </ButtonLink>
                </View>
              </View>
            );
          }}
        </Formik>
        <Spinner
          visible={this.props.loading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
      </ViewWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: selectors.selectLoading(state),
  avatar_profile: authselectors.selectCurrentUserAvatar(state),
});

export default connect(mapStateToProps)(SetupProfile1);

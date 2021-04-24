import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import ViewCreateOffer from '../../shared/styles/ViewMain';
import platform from '../../../../native-base-theme/variables/platform';

import { connect } from 'react-redux';
import selectors from '../../../modules/recruiter/offer/offerSelectors';
import FileUpload from '../../../modules/shared/upload/upload.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Formik } from 'formik';
import model from '../../../modules/recruiter/offer/offerModel';
import FormSchema from '../../shared/form/formSchema';
import ListItemRate from '../../shared/list/listItemRate';
import Action from '../../../modules/candidat/candidatActions';
import { Footer } from 'native-base';
import TextInputItem from '../../shared/items/TextInputItem';
import SelectFromItem from '../../shared/items/SelectFormItem';
import SelectMultipleItem from '../../shared/items/SelectMultipleItem';
import Autocomplete from '../../shared/items/Autocomplete';
import DictionaryServices from '../../../modules/dictionary/dictionaryService';
import { ScrollView } from 'react-native-gesture-handler';
import XIcon from '../../../../assets/icons/popular/X.svg';
import ImagesUploader from '../../shared/uploaders/imagesUploaders';
import action from '../../../modules/recruiter/offer/offerActions';
import Done from '../../../../assets/icons/popular/done.svg';
import Save from '../../../../assets/icons/popular/save.svg';
import SkillsInput from './items/skillsInput';
import LanguageInput from './items/languageInput';
import ContractTypeInput from './items/contractTypeInput';
import AvailabilityInput from './items/availibilityInput';
import LocationInput from './items/locationsInput';
import GenderInput from './items/genderInput';
import i18n from '../../../i18n/index';
import NavigationService from '../../../navigation/NavigationService';
import ICONLOGO from 'assets/3DElements/megaphone.png';
import { LinearGradient } from 'expo-linear-gradient';

const { fields } = model;

class FormOffer extends Component {
  schema = new FormSchema(fields.id, [
    fields.title,
    fields.description,
    fields.study_level,
    fields.work_years_experience,
    fields.localizations,
    fields.required_skills,
    fields.preferred_skills,
    fields.availability,
    fields.company_logo,
    fields.company_name,
    fields.contract_types,
    fields.gender,
    fields.languages,
  ]);
  schema1 = new FormSchema(fields.id, [fields.title]);

  constructor(props) {
    super(props);
    this.state = {
      status: 'DRA',
      submit: false,
    };
  }
  initialValues = () => {
    var { isEditing, item_to_edit } = this.props;

    if (isEditing) {
      return item_to_edit;
    }
    return this.schema.initialValues();
  };

  Fetchfn = async (value) => {
    return DictionaryServices.listAutocompleteGeo(value);
  };

  FetchDictionarySkills = async (value, type) => {
    return DictionaryServices.listAutocompleteDictionary(value, type);
  };
  handleOfferAction = (payload) => {
    var { dispatch, isEditing } = this.props;
    if (isEditing) {
      dispatch(action.updateoffer(payload));
    } else {
      var { status } = this.state;

      dispatch(action.createOffer(payload, status));
    }
  };

  getTitle = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'CalibriBold',
          fontSize: platform.getRelativeWidth(24),
        }}
      >
        Describe your
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'CalibriBold',
          fontSize: platform.getRelativeWidth(24),
          color: platform.brandPrimary,
        }}
      >
        job
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'CalibriBold',
          fontSize: platform.getRelativeWidth(24),
        }}
      >
        position
      </Text>
    </View>
  );

  getField = (text) => (
    <Text
      style={{
        fontFamily: 'Calibri',
        fontSize: platform.getRelativeWidth(12),
        color: '#898989',
        marginTop: platform.getRelativeHeight(20),
      }}
    >
      {text}
    </Text>
  );
  showLabelSelected = (data = [], DeleteItem) => {
    return (
      <ScrollView
        horizontal={true}
        style={{ marginTop: platform.getRelativeHeight(10) }}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => DeleteItem(item)}
            style={{
              padding: platform.getRelativeWidth(5),
              borderRadius: 25,
              backgroundColor: platform.brandInfo,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: platform.getRelativeWidth(8),
            }}
          >
            <XIcon
              style={{
                position: 'absolute',
                right: platform.getRelativeWidth(5),
                top: platform.getRelativeHeight(2),
              }}
            />
            <Text
              style={{
                color: 'white',
                fontSize: platform.getRelativeWidth(18),
                fontFamily: 'Calibri',
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  render() {
    var { loading, errorMessage, isEditing, UploadPhoto } = this.props;
    var { submit, status } = this.state;
    return (
      <Formik
        initialValues={this.initialValues()}
        validationSchema={
          status == 'DRA' ? this.schema1.schema : this.schema.schema
        }
        onSubmit={(values) => {
          this.handleOfferAction(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => {
          return (
            <View style={{ flex: 1 }}>
              <ViewCreateOffer
                Title={
                  isEditing
                    ? i18n.t('user.recruiter.offer.common.updateOffer')
                    : i18n.t('user.recruiter.offer.title.createOffer')
                }
                Icon={
                  <Image
                    source={ICONLOGO}
                    style={{
                      width: platform.normalize(72),
                      height: platform.normalize(72),
                    }}
                  />
                }
              >
                <View
                  style={{
                    width: '100%',
                  }}
                >
                  <View
                    style={{
                      paddingLeft: platform.getRelativeWidth(10),
                      paddingRight: platform.getRelativeHeight(10),
                    }}
                  >
                    {!!UploadPhoto ? (
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <LinearGradient
                          colors={['#645AFF', '#A573FF']}
                          style={{
                            width: platform.getRelativeHeight(87),
                            height: platform.getRelativeHeight(87),
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <ActivityIndicator
                            animating={true}
                            size="large"
                            color="rgba(228, 228, 228, 0.43)"
                          />
                        </LinearGradient>
                      </View>
                    ) : (
                      <ImagesUploader
                        schema={this.schema.schema}
                        handleChange={handleChange(fields.company_logo.name)}
                        name={fields.company_logo.name}
                        values={values.company_logo}
                        path={fields.company_logo.path}
                        mode="company"
                        scroll={true}
                      />
                    )}

                    {/* //Title */}
                    <TextInputItem
                      placeholder={fields.title.label}
                      value={values.title}
                      onChangeText={handleChange(fields.title.name)}
                      onBlur={handleBlur(fields.title.name)}
                      scroll={true}
                      error={submit ? errors.title : false}
                    />

                    <TextInputItem
                      placeholder={fields.company_name.label}
                      value={values.company_name}
                      onChangeText={handleChange(fields.company_name.name)}
                      onBlur={handleBlur(fields.company_name.name)}
                      scroll={true}
                      error={submit ? errors.company_name : false}
                    />

                    <SelectFromItem
                      fields={fields}
                      name={fields.study_level.name}
                      label={fields.study_level.label}
                      placeholder={fields.study_level.label}
                      value={values.study_level}
                      style={{
                        backgroundColor: 'white',
                        height: platform.getRelativeHeight(58),
                        borderRadius: 25,
                      }}
                      scroll={true}
                      error={submit ? errors.study_level : false}
                      withHeadIcon={true}
                    />

                    <SelectFromItem
                      fields={fields}
                      name={fields.work_years_experience.name}
                      label={fields.work_years_experience.label}
                      placeholder={fields.work_years_experience.label}
                      value={values.work_years_experience}
                      style={{
                        backgroundColor: 'white',
                        height: platform.getRelativeHeight(58),
                        borderRadius: 25,
                      }}
                      scroll={true}
                      error={submit ? errors.work_years_experience : false}
                      withHeadIcon={true}
                    />

                    <LocationInput
                      fields={fields}
                      name={fields.localizations.name}
                      label={fields.localizations.label}
                      placeholder={fields.localizations.label}
                      value={values.localizations}
                      scroll={true}
                      error={submit ? errors.localizations : false}
                    />
                    <SkillsInput
                      fields={fields}
                      name={fields.required_skills.name}
                      label={fields.required_skills.label}
                      placeholder={fields.required_skills.label}
                      value={values.required_skills}
                      scroll={true}
                      error={submit ? errors.required_skills : false}
                    />

                    <SkillsInput
                      fields={fields}
                      name={fields.preferred_skills.name}
                      label={fields.preferred_skills.label}
                      placeholder={fields.preferred_skills.label}
                      value={values.preferred_skills}
                      scroll={true}
                      error={submit ? errors.preferred_skills : false}
                    />

                    <LanguageInput
                      name={fields.languages.name}
                      label={fields.languages.label}
                      value={values[fields.languages.name]}
                      style={{
                        backgroundColor: 'white',
                        height: platform.getRelativeHeight(58),
                        borderRadius: 25,
                      }}
                      scroll={true}
                      error={submit ? errors[fields.languages.name] : false}
                    />
                    <ContractTypeInput
                      name={fields.contract_types.name}
                      label={fields.contract_types.label}
                      value={values[fields.contract_types.name]}
                      style={{
                        backgroundColor: 'white',
                        height: platform.getRelativeHeight(58),
                        borderRadius: 25,
                      }}
                      scroll={true}
                      error={
                        submit ? errors[fields.contract_types.name] : false
                      }
                    />

                    <GenderInput
                      name={fields.gender.name}
                      label={fields.gender.label}
                      value={values[fields.gender.name]}
                      style={{
                        backgroundColor: 'white',
                        height: platform.getRelativeHeight(58),
                        borderRadius: 25,
                      }}
                      options={fields.gender.options}
                      scroll={true}
                      error={submit ? errors[fields.gender.name] : false}
                    />
                    <AvailabilityInput
                      name={fields.availability.name}
                      label={fields.availability.label}
                      value={values[fields.availability.name]}
                      style={{
                        backgroundColor: 'white',
                        height: platform.getRelativeHeight(58),
                        borderRadius: 25,
                      }}
                      scroll={true}
                      error={submit ? errors[fields.availability.name] : false}
                    />

                    <TextInputItem
                      editable={true}
                      multiline={true}
                      placeholder={fields.description.label}
                      onChangeText={handleChange(fields.description.name)}
                      onBlur={handleBlur(fields.description.name)}
                      value={values.description}
                      style={{
                        backgroundColor: 'white',
                        height: platform.getRelativeHeight(210),
                        paddingTop: platform.getRelativeWidth(28),
                        textAlignVertical: 'top',
                      }}
                      scroll={true}
                      error={submit ? errors.description : false}
                    />
                  </View>
                </View>
              </ViewCreateOffer>
              <Footer
                style={[
                  {
                    backgroundColor: 'white',
                    alignItems: 'center',
                    height: platform.getRelativeHeight(67),
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                  },
                  Platform.select({
                    ios: {
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.3,
                      shadowRadius: 3,
                    },
                    android: {
                      shadowColor: 'rgb(78, 79, 114)',
                      shadowOffset: {
                        width: 50,
                        height: 50,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 1,

                      elevation: 10,
                    },
                  }),
                ]}
              >
                {!!isEditing && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ submit: true });

                      handleSubmit();
                    }}
                    style={{
                      width: platform.getRelativeWidth(138),
                      height: platform.getRelativeHeight(40),
                      backgroundColor: platform.brandPrimary,
                      borderRadius: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {!!loading ? (
                      <ActivityIndicator
                        animating={true}
                        size="large"
                        color="rgba(228, 228, 228, 0.43)"
                      />
                    ) : (
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                      >
                        <View
                          style={{
                            justifyContent: 'center',
                          }}
                        >
                          <Done />
                        </View>
                        <Text
                          style={{
                            fontFamily: 'Calibri',
                            color: 'white',
                            fontSize: platform.getRelativeWidth(14),
                            marginLeft: platform.getRelativeWidth(10),
                          }}
                        >
                          Update
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )}

                {!isEditing && (
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                  >
                    <View
                      style={{
                        width: platform.getRelativeWidth(138),
                        paddingLeft: platform.getRelativeWidth(5),
                        paddingRight: platform.getRelativeWidth(5),
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ submit: true, status: 'PUB' });
                          setTimeout(() => {
                            handleSubmit();
                          }, 200);
                        }}
                        style={{
                          width: '100%',
                          height: platform.getRelativeHeight(40),
                          backgroundColor: platform.brandPrimary,
                          borderRadius: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {loading && this.state.status == 'PUB' ? (
                          <ActivityIndicator
                            animating={true}
                            size="large"
                            color="rgba(228, 228, 228, 0.43)"
                          />
                        ) : (
                          <View
                            style={{
                              width: '100%',
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}
                          >
                            <View
                              style={{
                                justifyContent: 'center',
                              }}
                            >
                              <Done />
                            </View>
                            <Text
                              style={{
                                fontFamily: 'Calibri',
                                color: 'white',
                                fontSize: platform.getRelativeWidth(14),
                                marginLeft: platform.getRelativeWidth(10),
                              }}
                            >
                              Publish
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: platform.getRelativeWidth(138),
                        paddingLeft: platform.getRelativeWidth(5),
                        paddingRight: platform.getRelativeWidth(5),
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ submit: true, status: 'DRA' });
                          setTimeout(() => {
                            handleSubmit();
                          }, 200);
                        }}
                        style={{
                          width: '100%',
                          height: platform.getRelativeHeight(40),
                          backgroundColor: platform.brandInfo,
                          borderRadius: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {loading && this.state.status == 'DRA' ? (
                          <ActivityIndicator
                            animating={true}
                            size="large"
                            color="rgba(228, 228, 228, 0.43)"
                          />
                        ) : (
                          <View
                            style={{
                              width: '100%',
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}
                          >
                            <View
                              style={{
                                justifyContent: 'center',
                              }}
                            >
                              <Save />
                            </View>
                            <Text
                              style={{
                                fontFamily: 'Calibri',
                                color: 'white',
                                fontSize: platform.getRelativeWidth(14),
                                marginLeft: platform.getRelativeWidth(10),
                              }}
                            >
                              Save
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Footer>
            </View>
          );
        }}
      </Formik>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: selectors.selectLoading(state),
  errorMessage: selectors.selectErrorMsg(state),
  item_to_edit: selectors.item_to_edit(state),
  isEditing: selectors.selectIsEditing(state),
  UploadPhoto: selectors.selectUploadPhoto(state),
});

export default connect(mapStateToProps)(FormOffer);

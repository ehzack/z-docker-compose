import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import ViewMainProfileSetup from '../../shared/styles/ViewPreference';
import { Picker, Form } from 'native-base';
import plateform from '../../../../native-base-theme/variables/platform';

import { connect } from 'react-redux';
import selectors from '../../../modules/recruiter/recruiterSelectors.js';
import FileUpload from '../../../modules/shared/upload/upload.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AutocompleteItem from '../../shared/items/Autocomplete';
import { Formik } from 'formik';
import model from '../../../modules/candidat/candidatModel';
import FormSchema from '../../shared/form/formSchema';
import ListItemRate from '../../shared/list/listItemRate';
import Action from '../../../modules/recruiter/recruiterActions';
import DictionaryServices from '../../../modules/dictionary/dictionaryService';
import ButtonItemSwitch from '../../shared/items/ButtonItemSwitch';
import i18n, { setLanguageCode, getFlags } from '../../../i18n/index';
import SelectI18n from '../../shared/items/i18nSetting';
import ButtonIcon from '../../shared/items/ButtonIcon';
import AuthAction from '../../../modules/auth/authActions';
import NewMatches from '../../../../assets/icons/popular/newMatches.svg';
import NotifMessage from '../../../../assets/icons/popular/notifMessage.svg';
import Legal from '../../../../assets/icons/popular/Legal.svg';
import Stars from '../../../../assets/icons/popular/starts.svg';
import Logout from '../../../../assets/icons/popular/Logout.svg';
import PasswordSVG from '../../../../assets/icons/popular/password.svg';
import DeleteProfile from '../../../../assets/icons/popular/DeleteProfile.svg';
import PincelSVG from 'assets/icons/popular/pincel.svg';
import ItemShowImage from '../../shared/items/ItemShowImage';
import { LinearGradient } from 'expo-linear-gradient';
//import DropDown, { Select, Option, OptionList } from "react-native-selectme";
import NavigationService from '../../../navigation/NavigationService.js';
import Animated, { Easing, interpolate } from 'react-native-reanimated';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i18nTrigger: 0,

      Tranformation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.Tranformation, {
      toValue: 100,
      duration: 200,
      easing: Easing.back(0.8),
    }).start(() => {});
  }
  Fetchfn = async (value) => {
    return DictionaryServices.listAutocompleteDictionary(value, 'SKL');
  };

  handleUpdate = async (type, data) => {
    var { dispatch } = this.props;
    dispatch(Action.DoUpdateSettingsCandidat(type, data));
  };

  Logout = () => {
    var { dispatch } = this.props;

    dispatch(AuthAction.doSignout());
  };

  buttonItem = (item, image, actions) => {
    return (
      <TouchableOpacity
        key={item}
        onPress={() => {
          this.Navigate(actions);
        }}
        style={{
          marginTop: plateform.getRelativeHeight(9),
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: plateform.getRelativeHeight(58),
          width: plateform.getRelativeWidth(325),
          alignItems: 'center',
          paddingLeft: plateform.getRelativeWidth(20),
          paddingRight: plateform.getRelativeWidth(20),
          borderRadius: 25,
          backgroundColor: 'white',
          shadowColor: 'rgb(78, 79, 114)',
          shadowOffset: {
            width: 50,
            height: 50,
          },
          shadowOpacity: 1,
          shadowRadius: 1,

          elevation: 9,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: plateform.getRelativeWidth(20),
              justifyContent: 'center',
            }}
          >
            <Image source={image} />
          </View>
          <Text
            style={{
              marginLeft: plateform.getRelativeWidth(22),
              fontFamily: 'Calibri',
              fontSize: plateform.getRelativeWidth(18),
              color: 'black',
              textAlign: 'left',
            }}
          >
            {item}
          </Text>
        </View>

        <View
          style={{
            width: plateform.getRelativeWidth(40),
            height: plateform.getRelativeWidth(40),
            backgroundColor: plateform.brandPrimary,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../../../assets/icons/navigation/right.png')}
          />
        </View>
      </TouchableOpacity>
    );
  };

  randerTitle = (item) => (
    <View
      style={{
        marginTop: plateform.getRelativeHeight(22),

        width: plateform.getRelativeWidth(325),
        paddingLeft: plateform.getRelativeWidth(10),
      }}
    >
      <Text
        style={{
          fontFamily: 'CalibriBold',
          color: '#898989',
          fontSize: plateform.getRelativeWidth(15),
        }}
      >
        {item}
      </Text>
    </View>
  );
  render() {
    var { settings, listI18N, loading } = this.props;

    return (
      <Animated.View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          paddingTop: plateform.getResponsiveHeight(2),

          opacity: this.state.Tranformation.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: interpolate(this.state.Tranformation, {
                inputRange: [0, 100],
                outputRange: [plateform.getResponsiveHeight(25), 0],
              }),
            },
          ],
        }}
      >
        <Formik
          initialValues={{
            newMatches: settings.newMatches,
            messages: settings.messages,
            languagei18n: settings.languagei18n,
          }}
          onSubmit={(values) => this.handleSubmitRegister(values)}
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
              <View
                style={{
                  width: '100%',
                  paddingBottom: plateform.getResponsiveHeight(3),
                }}
              >
                {this.randerTitle('NOTIFICATION')}

                <ButtonItemSwitch
                  Title={i18n.t(
                    'user.candidat.menu.preferences.setting.notification.newMatches',
                  )}
                  value={values.newMatches}
                  handleChange={(data) => {
                    setFieldValue('newMatches', data);
                    this.handleUpdate('newMatches', data);
                  }}
                  style={{ marginTop: plateform.getRelativeHeight(6) }}
                  icon={() => <NewMatches />}
                />
                <ButtonItemSwitch
                  Title={i18n.t(
                    'user.candidat.menu.preferences.setting.notification.messages',
                  )}
                  value={values.messages}
                  handleChange={(data) => {
                    setFieldValue('messages', data);
                    this.handleUpdate('messages', data);
                  }}
                  style={{ marginTop: plateform.getRelativeHeight(6) }}
                  icon={() => <NotifMessage />}
                />

                {this.randerTitle('LEGAL & OPTIONS')}

                <ButtonIcon
                  Title="Legal"
                  IconLeft={() => <Legal />}
                  IconRight={true}
                  handleSubmit={() =>
                    NavigationService.navigate('PrivacyContainer')
                  }
                />
                <ButtonIcon
                  Title="Contact US"
                  IconLeft={() => <Stars />}
                  IconRight={true}
                />
                <SelectI18n
                  value={values.languagei18n}
                  listI18N={listI18N}
                  handleChange={(data) => {
                    setFieldValue('languagei18n', data);
                    this.handleUpdate('language_code', data.id);
                  }}
                  trigger={() => this.setState({ i18nTrigger: 1 })}
                />
                <ButtonIcon
                  Title={i18n.t('auth.editpassword.title')}
                  IconLeft={() => <PasswordSVG />}
                  handleSubmit={() => {
                    NavigationService.navigate('UpdatePasswordUser');
                  }}
                />

                <ButtonIcon
                  Title={i18n.t('auth.logout')}
                  IconLeft={() => <Logout />}
                  handleSubmit={() => {
                    this.Logout();
                  }}
                />

                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    style={{
                      width: plateform.getResponsiveWidth(15),
                      height: plateform.getResponsiveHeight(20),
                      resizeMode: 'contain',
                    }}
                    source={require('../../../../assets/Logo.png')}
                  />
                  <Text
                    style={{
                      fontFamily: 'Calibri',
                      fontSize: plateform.getRelativeWidth(18),
                    }}
                  >
                    Version 1.0
                  </Text>
                </View>
              </View>
            );
          }}
        </Formik>
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: selectors.selectSettings(state),
  listI18N: selectors.selectListI18n(state),
  loading: selectors.selectLoadingInit(state),
});

export default connect(mapStateToProps)(Settings);

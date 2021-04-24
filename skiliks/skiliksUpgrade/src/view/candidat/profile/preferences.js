import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  PixelRatio,
} from 'react-native';
import ViewMainStack from '../../shared/styles/ViewPreference';
import plateform from '../../../../native-base-theme/variables/platform';

import { connect } from 'react-redux';
import selectors from '../../../modules/auth/authSelectors';
import selectorsCandidat from '../../../modules/candidat/candidatSelectors';

import FileUpload from '../../../modules/shared/upload/upload.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import NavigationService from '../../../navigation/NavigationService.js';
import actions from '../../../modules/candidat/candidatActions';
import i18n from '../../../i18n/index';
import PincelSVG from 'assets/icons/popular/pincel.svg';
import ItemShowImage from '../../shared/items/ItemShowImage';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Easing, interpolate } from 'react-native-reanimated';
class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: '',
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
  Navigate = (action, flag) => {
    var { dispatch } = this.props;
    this.setState({ flag: flag });
    dispatch(action);
  };

  buttonItem = (item, image, actions, key) => {
    return (
      <View
        style={{
          paddingTop: plateform.getResponsiveHeight(1.5),
          paddingBottom: plateform.getResponsiveHeight(1.5),
        }}
      >
        <TouchableOpacity
          key={key}
          onPress={() => {
            !this.props.loading ? this.Navigate(actions, key) : null;
          }}
          style={[
            {
              width: plateform.getRelativeWidth(325),
              height: plateform.getRelativeHeight(51),
              backgroundColor: 'white',
              borderRadius: 30,
              paddingLeft: plateform.getRelativeWidth(20),
              paddingRight: plateform.getRelativeWidth(8),

              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
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

                elevation: 2,
              },
            }),
          ]}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: plateform.getResponsiveWidth(10),
                justifyContent: 'center',
              }}
            >
              <Image
                source={image}
                style={{
                  width: plateform.normalize(17),
                  height: plateform.normalize(17),
                  resizeMode: 'contain',
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: 'Calibri',
                fontSize: plateform.normalize(18),
                color: 'black',
                textAlign: 'left',
              }}
            >
              {item}
            </Text>
          </View>
          <LinearGradient
            colors={[plateform.brandPrimary, '#A573FF']}
            start={[0, 0.7]}
            end={[0, 0]}
            style={{
              width: plateform.getRelativeHeight(45),
              height: plateform.getRelativeHeight(45),
              backgroundColor: plateform.brandPrimary,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {this.props.loading && this.state.flag == key ? (
              <ActivityIndicator
                animating={true}
                size="large"
                color="rgba(228, 228, 228, 0.43)"
              />
            ) : (
              <Image
                source={require('../../../../assets/icons/navigation/right.png')}
              />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <Animated.View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
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
        {this.buttonItem(
          i18n.t('user.candidat.menu.preferences.skills.title'),
          require('../../../../assets/icons/popular/Sport.png'),
          actions.DoListSkillsCandidat(),
          1,
        )}
        {this.buttonItem(
          i18n.t('user.candidat.menu.preferences.searchLocations.title'),

          require('../../../../assets/icons/popular/location.png'),
          actions.DoListLocalizationsCandidat(),
          2,
        )}
        {this.buttonItem(
          i18n.t('user.candidat.menu.preferences.contractSalary.title'),
          require('../../../../assets/icons/popular/Experience.png'),
          actions.DoListContractTypesSalaryCandidat(),
          3,
        )}
        {this.buttonItem(
          i18n.t('user.candidat.menu.preferences.spokenLanguages.title'),
          require('../../../../assets/icons/popular/language.png'),
          actions.DoListLanguagesCandidat(),
          4,
        )}
        {/* {this.buttonItem(
            i18n.t("user.candidat.menu.preferences.contractSalary.title"),
            require("../../../../assets/icons/popular/salary.png"),
            actions.DoListSalaryCandidat(),
            5
          )} */}
        {this.buttonItem(
          i18n.t('user.candidat.menu.preferences.setting.title'),
          require('../../../../assets/icons/popular/more.png'),
          actions.DoListSettingsCandidat(),
          6,
        )}
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: selectors.selectCurrentUserAvatar(state),
  loading: selectorsCandidat.selectLoadingInit(state),
  currentUser: selectors.selectCurrentUser(state),
  first_name: selectors.selectCurrentUserfirst_name(state),
});

export default connect(mapStateToProps)(Preferences);

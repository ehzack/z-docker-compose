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
import selectorsRecruiter from '../../../modules/recruiter/recruiterSelectors';

import FileUpload from '../../../modules/shared/upload/upload.js';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import NavigationService from '../../../navigation/NavigationService.js';
import actions from '../../../modules/recruiter/recruiterActions';
import i18n from '../../../i18n/index';
import PincelSVG from 'assets/icons/popular/pincel.svg';
import ItemShowImage from '../../shared/items/ItemShowImage';
import { LinearGradient } from 'expo-linear-gradient';
import Preferences from './preferences';
import Settings from './settings';
import RecruiterServices from '../../../modules/recruiter/recruiterService.js';
class PreferencesMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: '',
      switchSetting: false,
      matches: null,
    };
  }

  componentDidMount() {
    RecruiterServices.MatchCount().then((e) => {
      this.setState({ matches: e });
    });
  }
  Navigate = (action, flag) => {
    var { dispatch } = this.props;
    this.setState({ flag: flag });
    dispatch(action);
  };
  profileCard = () => {
    var { avatar, first_name } = this.props;
    return (
      <View
        style={{
          paddingTop: plateform.getResponsiveHeight(5),
          paddingBottom: plateform.getResponsiveHeight(6),
        }}
      >
        <View
          style={[
            {
              width: plateform.getRelativeWidth(325),
              backgroundColor: 'white',
              borderRadius: 25,
              height: plateform.getResponsiveHeight(10),
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingLeft: plateform.getRelativeWidth(15),
              paddingRight: plateform.getRelativeWidth(15),
              paddingTop: plateform.getResponsiveHeight(1),
              paddingBottom: plateform.getRelativeHeight(5),
            },
            Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
              },
              android: {
                shadowColor: 'black',

                elevation: 8,
              },
            }),
          ]}
        >
          <View
            style={{
              width: '30%',
              position: 'absolute',
              left: '5%',
            }}
          >
            <Text
              style={{
                fontFamily: 'Calibri',
                fontSize: plateform.normalize(15),
              }}
            >
              {first_name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('MainProfile')}
            style={{
              position: 'absolute',
              top: plateform.getResponsiveHeight(3),
            }}
          >
            <ItemShowImage
              source={avatar}
              withIcon={<PincelSVG />}
              style={{
                width: plateform.normalize(75),
                height: plateform.normalize(75),
                borderRadius: 100,
                borderWidth: 3,
                borderColor: 'white',
              }}
              scroll={true}
            />
          </TouchableOpacity>

          <View
            style={{
              width: '30%',
              position: 'absolute',
              right: '5%',
            }}
          >
            <Text
              style={{
                fontFamily: 'Calibri',
                fontSize: plateform.normalize(10),
                textAlign: 'right',
                color: 'black',
                opacity: 0.5,
              }}
            >
              matches
            </Text>

            <Text
              style={{
                fontFamily: 'CalibriBold',
                fontSize: plateform.normalize(28),
                textAlign: 'right',
                color: plateform.brandPrimary,
              }}
            >
              {this.state.matches || 0}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  backNavigation() {
    var { dispatch, showSetting } = this.props;
    dispatch(actions.DoBackToPreference(showSetting));
  }

  render() {
    var { showSetting } = this.props;
    return (
      <ViewMainStack
        Title="Parametres"
        ProfileContainer={this.profileCard()}
        goBack={() => this.backNavigation()}
        disableBackIcon={!showSetting}
      >
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {this.profileCard()}
          {!showSetting && <Preferences />}
          {showSetting && <Settings />}
        </View>
      </ViewMainStack>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: selectors.selectCurrentUserAvatar(state),
  currentUser: selectors.selectCurrentUser(state),
  first_name: selectors.selectCurrentUserfirst_name(state),
  showSetting: selectorsRecruiter.selectRecruiterShwoSettings(state),
});

export default connect(mapStateToProps)(PreferencesMain);

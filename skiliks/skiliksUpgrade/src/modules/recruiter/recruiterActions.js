import { Alert } from 'react-native';
import service from './recruiterService';
import NavigationService from '../../navigation/NavigationService';
import i18n from '../../i18n/index';
import { getStore } from '../store';
import model from './recruiterModel';
import DictionaryService from '../dictionary/dictionaryService';
import authAction from '../auth/authActions';
import Upload from '../shared/upload/upload';
import serviceAuth from '../auth/authService';
import AuthAction from '../auth/authActions';
import Toast from 'react-native-toast-message';
import platform from '../../../native-base-theme/variables/platform';

const prefix = 'RECRUITER';

const { fields } = model;

var actions = {
  ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

  RECRUITER_INIT_START: `${prefix}_INIT_START`,

  RECRUITER_INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  RECRUITER_INIT_ERROR: `${prefix}_INIT_ERROR`,

  RECRUITER_CHANGE_ADS_START: `${prefix}_CHANGE_ADS_START`,

  RECRUITER_CHANGE_ADS_SUCCESS: `${prefix}_CHANGE_ADS_SUCCESS`,
  RECRUITER_CHANGE_ADS_ERROR: `${prefix}_CHANGE_ADS_ERROR`,

  LIST_SETTINGS_START: `${prefix}_LIST_SETTINGS_START`,
  LIST_SETTINGS_SUCCESS: `${prefix}_LIST_SETTINGS_SUCCESS`,
  LIST_SETTINGS_ERROR: `${prefix}_LIST_SETTINGS_ERROR`,
  BACK_TO_PREFERENCE: `${prefix}_BACK_TO_PREFERENCE`,

  LIST_PROFILE_START: `${prefix}_LIST_PROFILE_START`,
  LIST_PROFILE_SUCCESS: `${prefix}_LIST_PROFILE_SUCCESS`,
  LIST_PROFILE_ERROR: `${prefix}_LIST_PROFILE_ERROR`,

  UPDATE_PROFILE_START: `${prefix}_UPDATE_PROFILE_START`,
  UPDATE_PROFILE_SUCCESS: `${prefix}_UPDATE_PROFILE_SUCCESS`,
  UPDATE_PROFILE_ERROR: `${prefix}_UPDATE_PROFILE_ERROR`,

  doClearErrorMessage() {
    return {
      type: actions.ERROR_MESSAGE_CLEARED,
    };
  },

  DoListProfile: () => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages

      dispatch({
        type: actions.LIST_PROFILE_START,
      });
      var data = await service.listProfile();
      dispatch({
        type: actions.LIST_PROFILE_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.LIST_PROFILE_ERROR,
        msg: '',
      });
    }
  },

  DoUpdateProfile: (payload) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages

      dispatch({
        type: actions.UPDATE_PROFILE_START,
      });
      let FileUpload = null;
      if (payload.avatar_profile != null) {
        if (payload.avatar_profile.token) {
          FileUpload = payload.avatar_profile;
        } else {
          FileUpload = await Upload.uploadFromRequest(payload.avatar_profile);
        }
      }
      let user = {
        avatar_profile: FileUpload,
        first_name: payload.first_name,
        last_name: payload.last_name,
        gender: payload.gender,
      };

      let recruiter = {
        title: payload.title,
        company_name: payload.company_name,
      };

      let data = await service.updateProfile({ user, recruiter });

      var currentUser = await serviceAuth.fetchMe();
      // in background
      //service.reauthenticateWithStorageToken();

      dispatch({
        type: AuthAction.CURRENT_USER_REFRESH_SUCCESS,
        payload: {
          currentUser,
        },
      });

      dispatch({
        type: actions.UPDATE_PROFILE_SUCCESS,
      });

      Toast.show({
        type: 'success',
        text1: i18n.t('user.candidat.alert.profileSaved'),
        position: 'bottom',
        autoHide: true,
        topOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      NavigationService.goBack();
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.UPDATE_PROFILE_ERROR,
        msg: '',
      });
    }
  },

  DoBackToPreference: (flag) => async (dispatch) => {
    if (flag) {
      dispatch({
        type: actions.BACK_TO_PREFERENCE,
      });
    }
  },

  DoListAdsHome: (navigate = false) => async (dispatch) => {
    try {
      dispatch({
        type: actions.RECRUITER_INIT_START,
      });

      var listAds = await service.listAds();
      var currentAds = 0;
      var candidats_like_ad = [];

      if (listAds.length > 0) {
        currentAds = listAds[0].id;
        candidats_like_ad = await service.listCandidatLike(currentAds);
      }
      dispatch({
        type: actions.RECRUITER_INIT_SUCCESS,
        payload: {
          listAds: listAds,
          candidats_like_ad: candidats_like_ad,
          currentAds,
        },
      });
      if (navigate) {
        NavigationService.navigate('MainOffers');
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.RECRUITER_INIT_ERROR,
      });
    }
  },

  DoListAds: () => async (dispatch) => {
    NavigationService.navigate('MainOffers');
  },
  DoChangeAds: (ad_id) => async (dispatch) => {
    try {
      dispatch({
        type: actions.RECRUITER_CHANGE_ADS_START,
      });

      let candidats_like_ad = await service.listCandidatLike(ad_id);
      dispatch({
        type: actions.RECRUITER_CHANGE_ADS_SUCCESS,
        payload: {
          candidats_like_ad: candidats_like_ad,
          currentAds: ad_id,
        },
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.RECRUITER_CHANGE_ADS_ERROR,
      });
    }
  },

  DoListSettingsRecruiter: () => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages

      dispatch({
        type: actions.LIST_SETTINGS_START,
      });
      var data = await service.listSettings();
      var i18n = await DictionaryService.listI18n();
      dispatch({
        type: actions.LIST_SETTINGS_SUCCESS,
        payload: {
          settings: data,
          i18n: i18n,
        },
      });

      // NavigationService.NavigateToNested("CandidatStack", "Settings");
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.LIST_SETTINGS_ERROR,
        msg: '',
      });
    }
  },
};

export default actions;

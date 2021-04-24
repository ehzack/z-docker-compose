import { Alert } from 'react-native';
import service from './candidatService';
import NavigationService from '../../navigation/NavigationService';
import i18n from '../../i18n/index';
import { getStore } from '../store';
import model from './candidatModel';
import DictionaryService from '../dictionary/dictionaryService';
import authAction from '../auth/authActions';
import Upload from '../shared/upload/upload';
import serviceAuth from '../auth/authService';
import AuthAction from '../auth/authActions';
import Toast from 'react-native-toast-message';
import platform from '../../../native-base-theme/variables/platform';

const prefix = 'CANDIDAT';

const { fields } = model;

var actions = {
  ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

  CANDIDAT_INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  CANDIDAT_INIT_ERROR: `${prefix}_INIT_ERROR`,

  LIST_SKILLS_START: `${prefix}_LIST_SKILLS_START`,
  LIST_SKILLS_SUCCESS: `${prefix}_LIST_SKILLS_SUCCESS`,
  LIST_SKILLS_ERROR: `${prefix}_LIST_SKILLS_ERROR`,

  LIST_DIPLOMAT_START: `${prefix}_LIST_DIPLOMAT_START`,
  LIST_DIPLOMAT_SUCCESS: `${prefix}_LIST_DIPLOMAT_SUCCESS`,
  LIST_DIPLOMAT_ERROR: `${prefix}_LIST_DIPLOMAT_ERROR`,

  LIST_SALARY_START: `${prefix}_LIST_SALARY_START`,
  LIST_SALARY_SUCCESS: `${prefix}_LIST_SALARY_SUCCESS`,
  LIST_SALARY_ERROR: `${prefix}_LIST_SALARY_ERROR`,

  LIST_PROFILE_START: `${prefix}_LIST_PROFILE_START`,
  LIST_PROFILE_SUCCESS: `${prefix}_LIST_PROFILE_SUCCESS`,
  LIST_PROFILE_ERROR: `${prefix}_LIST_PROFILE_ERROR`,

  UPDATE_PROFILE_START: `${prefix}_UPDATE_PROFILE_START`,
  UPDATE_PROFILE_SUCCESS: `${prefix}_UPDATE_PROFILE_SUCCESS`,
  UPDATE_PROFILE_ERROR: `${prefix}_UPDATE_PROFILE_ERROR`,

  LIST_AVAILABILITY_START: `${prefix}_LIST_AVAILABILITY_START`,
  LIST_AVAILABILITY_SUCCESS: `${prefix}_LIST_AVAILABILITY_SUCCESS`,
  LIST_AVAILABILITY_ERROR: `${prefix}_LIST_AVAILABILITY_ERROR`,

  LIST_LOCALIZATIONS_START: `${prefix}_LIST_LOCALIZATIONS_START`,
  LIST_LOCALIZATIONS_SUCCESS: `${prefix}_LIST_LOCALIZATIONS_SUCCESS`,
  LIST_LOCALIZATIONS_ERROR: `${prefix}_LIST_LOCALIZATIONS_ERROR`,

  LIST_CONTRACT_TYPE_SALARY_START: `${prefix}LIST_CONTRACT_TYPE_SALARY_START`,
  LIST_CONTRACT_TYPE_SALARY_SUCCESS: `${prefix}LIST_CONTRACT_TYPE_SALARY_SUCCESS`,
  LIST_CONTRACT_TYPE_SALARY_ERROR: `${prefix}LIST_CONTRACT_TYPE_SALARY_ERROR`,

  LIST_LANGUAGES_START: `${prefix}_LIST_LANGUAGES_START`,
  LIST_LANGUAGES_SUCCESS: `${prefix}_LIST_LANGUAGES_SUCCESS`,
  LIST_LANGUAGES_ERROR: `${prefix}_LIST_LANGUAGES_ERROR`,

  LIST_SETTINGS_START: `${prefix}_LIST_SETTINGS_START`,
  LIST_SETTINGS_SUCCESS: `${prefix}_LIST_SETTINGS_SUCCESS`,
  LIST_SETTINGS_ERROR: `${prefix}_LIST_SETTINGS_ERROR`,

  LIST_ADS_CANDIDAT_START: `${prefix}_LIST_ADS_CANDIDAT_START`,
  LIST_ADS_CANDIDAT_SUCCESS: `${prefix}_LIST_ADS_CANDIDAT_SUCCESS`,
  LIST_ADS_CANDIDAT_ERROR: `${prefix}_LIST_ADS_CANDIDAT_ERROR`,

  UPDATE_SKILLS_START: `${prefix}_UPDATE_SKILLS_START`,
  UPDATE_SKILLS_SUCCESS: `${prefix}_UPDATE_SKILLS_SUCCESS`,
  UPDATE_SKILLS_ERROR: `${prefix}_UPDATE_SKILLS_ERROR`,

  UPDATE_DIPLOMAT_START: `${prefix}_UPDATE_DIPLOMAT_START`,
  UPDATE_DIPLOMAT_SUCCESS: `${prefix}_UPDATE_DIPLOMAT_SUCCESS`,
  UPDATE_DIPLOMAT_ERROR: `${prefix}_UPDATE_DIPLOMAT_ERROR`,

  UPDATE_AVAILABILITY_START: `${prefix}_UPDATE_AVAILABILITY_START`,
  UPDATE_AVAILABILITY_SUCCESS: `${prefix}_UPDATE_AVAILABILITY_SUCCESS`,
  UPDATE_AVAILABILITY_ERROR: `${prefix}_UPDATE_AVAILABILITY_ERROR`,

  UPDATE_LOCALIZATIONS_START: `${prefix}_UPDATE_LOCALIZATIONS_START`,
  UPDATE_LOCALIZATIONS_SUCCESS: `${prefix}_UPDATE_LOCALIZATIONS_SUCCESS`,
  UPDATE_LOCALIZATIONS_ERROR: `${prefix}_UPDATE_LOCALIZATIONS_ERROR`,

  UPDATE_SETTINGS_START: `${prefix}_UPDATE_SETTINGS_START`,
  UPDATE_SETTINGS_SUCCESS: `${prefix}_UPDATE_SETTINGS_SUCCESS`,
  UPDATE_SETTINGS_ERROR: `${prefix}_UPDATE_SETTINGS_ERROR`,

  UPDATE_CONTRACT_SALARY_TYPE_START: `${prefix}_UPDATE_CONTRACT_SALARY_TYPE_START`,
  UPDATE_CONTRACT_SALARY_TYPE_SUCCESS: `${prefix}_UPDATE_CONTRACT_SALARY_TYPE_SUCCESS`,
  UPDATE_CONTRACT_SALARY_TYPE_ERROR: `${prefix}_UPDATE_CONTRACT_SALARY_TYPE_ERROR`,

  UPDATE_LANGUAGES_START: `${prefix}_UPDATE_LANGUAGES_START`,
  UPDATE_LANGUAGES_SUCCESS: `${prefix}_UPDATE_LANGUAGES_SUCCESS`,
  UPDATE_LANGUAGES_ERROR: `${prefix}_UPDATE_LANGUAGES_ERROR`,

  UPDATE_SALARY_START: `${prefix}_UPDATE_SALARY_START`,
  UPDATE_SALARY_SUCCESS: `${prefix}_UPDATE_SALARY_SUCCESS`,
  UPDATE_SALARY_ERROR: `${prefix}_UPDATE_SALARY_ERROR`,
  BACK_TO_PREFERENCE: `${prefix}_BACK_TO_PREFERENCE`,
  doClearErrorMessage() {
    return {
      type: actions.ERROR_MESSAGE_CLEARED,
    };
  },

  DoBackToPreference: (flag) => async (dispatch) => {
    if (flag) {
      dispatch({
        type: actions.BACK_TO_PREFERENCE,
      });
    }
  },

  DoUpdateAvailabilityCandidat: (Navigation, Data) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages
      dispatch({
        type: actions.UPDATE_AVAILABILITY_START,
      });

      var res = await service.UpdatePreferences('availability', Data, 'Int');

      dispatch({
        type: actions.UPDATE_AVAILABILITY_SUCCESS,
        payload: {
          skills: res[0].availability,
        },
      });

      Navigation.goBack();
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.UPDATE_AVAILABILITY_ERROR,
        msg: '',
      });
    }
  },

  DoUpdateFieldsCandidat: (Navigation, Data) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations

      //ContractType
      //Languages

      dispatch({
        type: actions.CANDIDAT_INIT_SUCCESS,
      });

      if (Navigation.state.params == 'skills') {
        dispatch(actions.DoUpdateSkillsCandidat(Navigation, Data));
      }

      if (Navigation.state.params == 'localizations') {
        dispatch(actions.DoUpdateLocalizationsCandidat(Navigation, Data));
      }

      if (Navigation.state.params == 'languages') {
        dispatch(actions.DoUpdateLanguagesCandidat(Navigation, Data));
      }
      if (Navigation.state.params == 'contractType') {
        dispatch(actions.DoUpdateContractTypeCandidat(Navigation, Data));
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.CANDIDAT_INIT_ERROR,
        payload: '',
      });
    }
  },

  DoListSkillsCandidat: (navigationNext) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages
      var Field = [];

      dispatch({
        type: actions.LIST_SKILLS_START,
      });
      var data = await service.listCandidatProfile('skills');

      dispatch({
        type: actions.LIST_SKILLS_SUCCESS,
        payload: {
          skills: data.skills,
        },
      });

      NavigationService.NavigateToNested('CandidatStack', 'Skills');
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.LIST_SKILLS_ERROR,
        msg: '',
      });
    }
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
        last_name: payload.last_namegender,
        gender: payload.payloadgender,
      };
      let candidat = {
        bio: payload.bio,
        title: payload.title,
        study_level: payload.study_level.id,
        work_years_number: payload.work_years_number.id
          ? payload.work_years_number.id
          : payload.work_years_number,
      };

      let data = await service.updateProfile({ user, candidat });

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

  DoUpdateSkillsCandidat: (Data) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages
      dispatch({
        type: actions.UPDATE_SKILLS_START,
      });

      var res = await service.UpdateCandidatProfile('skills', Data);
      dispatch({
        type: actions.UPDATE_SKILLS_SUCCESS,
        payload: {
          skills: res[0].skills,
        },
      });
      Toast.show({
        type: 'success',
        text1: i18n.t('user.candidat.messages.skills.success'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      NavigationService.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: i18n.t('user.candidat.messages.skills.error'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      console.log(error);

      dispatch({
        type: actions.UPDATE_DIPLOMAT_ERROR,
        msg: '',
      });
    }
  },

  DoUpdateLocalizationsCandidat: (data) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages
      dispatch({
        type: actions.UPDATE_LOCALIZATIONS_START,
      });

      var res = await service.UpdatePreferences('localizations', data);

      dispatch({
        type: actions.UPDATE_LOCALIZATIONS_SUCCESS,
        payload: {
          localizations: res[0].localizations,
        },
      });
      Toast.show({
        type: 'success',
        text1: i18n.t('user.candidat.messages.locations.success'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      NavigationService.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: i18n.t('user.candidat.messages.locations.error'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      dispatch({
        type: actions.UPDATE_LOCALIZATIONS_ERROR,
        msg: '',
      });
    }
  },
  DoUpdateLanguagesCandidat: (Data) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages
      dispatch({
        type: actions.UPDATE_LANGUAGES_START,
      });

      var res = await service.UpdatePreferences('languages', Data);
      dispatch({
        type: actions.UPDATE_LANGUAGES_SUCCESS,
        payload: {
          languages: res[0].languages,
        },
      });
      Toast.show({
        type: 'success',
        text1: i18n.t('user.candidat.messages.languages.success'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      NavigationService.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: i18n.t('user.candidat.messages.languages.error'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });

      dispatch({
        type: actions.UPDATE_LANGUAGES_ERROR,
        msg: '',
      });
    }
  },

  DoUpdateContractTypeSalaryCandidat: (Data) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages
      dispatch({
        type: actions.UPDATE_CONTRACT_SALARY_TYPE_START,
      });

      var res = await service.UpdatePreferences(
        'contract_types',
        Data.contractType,
      );
      res = await service.UpdatePreferences('salary', Data.salary);

      dispatch({
        type: actions.UPDATE_CONTRACT_SALARY_TYPE_SUCCESS,
      });
      Toast.show({
        type: 'success',
        text1: i18n.t('user.candidat.messages.contractTypeSalary.success'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      NavigationService.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: i18n.t('user.candidat.messages.contractTypeSalary.error'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      dispatch({
        type: actions.UPDATE_CONTRACT_SALARY_TYPE_ERROR,
        msg: '',
      });
    }
  },

  DoListLocalizationsCandidat: (navigationNext) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages
      var Field = [];

      dispatch({
        type: actions.LIST_LOCALIZATIONS_START,
      });
      var data = await service.listPreferences('localizations');
      await dispatch({
        type: actions.LIST_LOCALIZATIONS_SUCCESS,
        payload: {
          localizations: data.localizations,
        },
      });

      NavigationService.NavigateToNested('CandidatStack', 'Locations');
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.LIST_LOCALIZATIONS_ERROR,
        msg: '',
      });
    }
  },

  DoListContractTypesSalaryCandidat: () => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages
      var Field = [];

      dispatch({
        type: actions.LIST_CONTRACT_TYPE_SALARY_START,
      });
      var data = await service.listPreferences('contract_types');
      var listContractType = await DictionaryService.listDictionary('CTR');
      var salary = await service.listPreferences('salary');
      console.log({
        contractType: data.contract_types,
        listContractType: listContractType,
        salary: salary.salary,
      });
      dispatch({
        type: actions.LIST_CONTRACT_TYPE_SALARY_SUCCESS,
        payload: {
          contractType: data.contract_types,
          listContractType: listContractType,
          salary: salary.salary,
        },
      });

      NavigationService.NavigateToNested('CandidatStack', 'ContractTypeSalary');
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.LIST_CONTRACT_TYPE_SALARY_ERROR,
        msg: '',
      });
    }
  },

  DoListLanguagesCandidat: (navigationNext) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages

      dispatch({
        type: actions.LIST_LANGUAGES_START,
      });
      var data = await service.listPreferences('languages');
      var listLanguages = await DictionaryService.listDictionary('LANG');
      dispatch({
        type: actions.LIST_LANGUAGES_SUCCESS,
        payload: {
          languages: data.languages,
          listLanguages: listLanguages,
        },
      });

      NavigationService.NavigateToNested('CandidatStack', 'Languages');
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.LIST_LANGUAGES_ERROR,
        msg: '',
      });
    }
  },

  DoListSalaryCandidat: () => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages

      dispatch({
        type: actions.LIST_SALARY_START,
      });
      var data = await service.listPreferences('salary');
      var listCurrency = await DictionaryService.lisCrrency();
      dispatch({
        type: actions.LIST_SALARY_SUCCESS,
        payload: {
          salary: data.salary,
          listCurrency: listCurrency,
        },
      });

      NavigationService.NavigateToNested('CandidatStack', 'Salary');
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.LIST_SALARY_ERROR,
        msg: '',
      });
    }
  },

  DoListSettingsCandidat: () => async (dispatch) => {
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

  DoUpdateSettingsCandidat: (fields, Data) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages
      dispatch({
        type: actions.UPDATE_SETTINGS_START,
      });

      var res = await service.UpdateSettings(fields, Data);
      dispatch({
        type: actions.UPDATE_SETTINGS_SUCCESS,
        payload: {
          settings: res,
        },
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.UPDATE_SETTINGS_ERROR,
        msg: '',
      });
    }
  },

  DoUpdateSalaryCandidat: (Data) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages
      dispatch({
        type: actions.UPDATE_SALARY_START,
      });

      var res = await service.UpdatePreferences('salary', Data);
      dispatch({
        type: actions.UPDATE_SALARY_SUCCESS,
        payload: {
          salary: res.salary,
        },
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.UPDATE_SALARY_ERROR,
        msg: '',
      });
    }
  },

  DoListAvailabilityCandidat: (navigationNext) => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages

      dispatch({
        type: actions.LIST_AVAILABILITY_START,
      });
      var data = await service.listPreferences('availability');

      dispatch({
        type: actions.LIST_AVAILABILITY_SUCCESS,
        payload: {
          availability: data.availability,
        },
      });

      NavigationService.navigate(navigationNext);
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.LIST_AVAILABILITY_ERROR,
        msg: '',
      });
    }
  },

  DoListFeedsCandidat: () => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages

      dispatch({
        type: actions.LIST_ADS_CANDIDAT_START,
      });

      let data = await service.listfeeds_candidatId();
      let listFeeds = data.feed;
      let candidat_id = data.candidat_profile[0];
      let like_count = data.feed_aggregate.aggregate.count;
      dispatch({
        type: actions.LIST_ADS_CANDIDAT_SUCCESS,
        payload: {
          feeds: listFeeds || [],
          candidat_id: candidat_id,
          like_count: like_count,
        },
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.LIST_ADS_CANDIDAT_ERROR,
      });
    }
  },
};

export default actions;

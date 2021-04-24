import { combineReducers } from 'redux';
import SetupProfileReducer from './setupProfile/setupProfileReducers';
import actions from './candidatActions';
const initialData = {
  skills: [],
  diplomat: null,
  availability: null,
  localizations: [],
  contractType: null,
  languages: null,
  listContractType: [],
  listLanguages: [],
  salary: {},
  listCurrency: [],
  loading: false,
  errorMessage: null,
  loadingInit: false,
  settings: [],
  i18n: [],
  bio: '',
  work_years_number: null,
  title: '',
  study_level: null,
  ads: [],
  feeds: [],
  candidat_id: null,
  like_count: 0,
  showSettings: false,
};

const candidat = (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.CANDIDAT_INIT_SUCCESS) {
    return {
      ...state,
      errorMessage: null,
    };
  }
  if (type === actions.CANDIDAT_INIT_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
    };
  }

  if (type === actions.CANDIDAT_INIT_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
    };
  }
  if (type === actions.LIST_SKILLS_START) {
    return {
      ...state,
      loadingInit: true,
    };
  }
  if (type === actions.LIST_SKILLS_SUCCESS) {
    return {
      ...state,
      skills: payload.skills || [],
      loadingInit: false,
    };
  }

  if (type === actions.LIST_SKILLS_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
      loadingInit: false,
    };
  }

  if (type === actions.LIST_AVAILABILITY_START) {
    return {
      ...state,
      loadingInit: true,
    };
  }

  if (type === actions.LIST_AVAILABILITY_SUCCESS) {
    return {
      ...state,
      availability: payload.availability || 0,
      loadingInit: false,
    };
  }

  if (type === actions.LIST_AVAILABILITY_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
      loadingInit: false,
    };
  }

  if (type === actions.LIST_PROFILE_START) {
    return {
      ...state,
      loadingInit: true,
    };
  }

  if (type === actions.LIST_PROFILE_SUCCESS) {
    return {
      ...state,
      ...payload.data,
      loadingInit: false,
    };
  }

  if (type === actions.LIST_PROFILE_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
      loadingInit: false,
    };
  }
  if (type === actions.LIST_CONTRACT_TYPE_SALARY_START) {
    return {
      ...state,
      loadingInit: true,
    };
  }
  if (type === actions.LIST_CONTRACT_TYPE_SALARY_SUCCESS) {
    return {
      ...state,
      contractType: payload.contractType || [],
      listContractType: payload.listContractType || [],
      salary: payload.salary || null,
      loadingInit: false,
    };
  }

  if (type === actions.LIST_CONTRACT_TYPE_SALARY_ERROR) {
    return {
      ...state,
      errorMessage: payload.contractType || null,
      loadingInit: false,
    };
  }

  if (type === actions.LIST_SALARY_START) {
    return {
      ...state,
      loadingInit: true,
    };
  }
  if (type === actions.LIST_SALARY_SUCCESS) {
    return {
      ...state,

      salary: payload.salary || [],
      listCurrency: payload.listCurrency || [],
      loadingInit: false,
    };
  }

  if (type === actions.LIST_SALARY_ERROR) {
    return {
      ...state,
      errorMessage: payload.contractType || null,
      loadingInit: false,
    };
  }

  if (type === actions.LIST_LOCALIZATIONS_START) {
    return {
      ...state,
      loadingInit: true,
    };
  }
  if (type === actions.LIST_LOCALIZATIONS_SUCCESS) {
    return {
      ...state,
      localizations: payload.localizations || [],
      loadingInit: false,
    };
  }

  if (type === actions.LIST_LOCALIZATIONS_ERROR) {
    return {
      ...state,
      errorMessage: payload.msg || null,
      loadingInit: false,
    };
  }

  if (type === actions.LIST_LANGUAGES_START) {
    return {
      ...state,
      loadingInit: true,
    };
  }
  if (type === actions.LIST_LANGUAGES_SUCCESS) {
    return {
      ...state,
      languages: payload.languages || [],
      listLanguages: payload.listLanguages || [],
      loadingInit: false,
    };
  }

  if (type === actions.LIST_LANGUAGES_ERROR) {
    return {
      ...state,
      errorMessage: payload.msg || null,
      loadingInit: false,
    };
  }
  if (type === actions.LIST_SETTINGS_START) {
    return {
      ...state,
      loadingInit: true,
    };
  }

  if (type === actions.LIST_SETTINGS_SUCCESS) {
    return {
      ...state,
      settings: payload.settings || [],
      i18n: payload.i18n,
      loadingInit: false,
      showSettings: true,
    };
  }

  if (type === actions.LIST_SETTINGS_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
      loadingInit: false,
    };
  }

  if (type === actions.CANDIDAT_INIT_SUCCESS) {
    return {
      ...state,
      errorMessage: null,
    };
  }
  if (type === actions.CANDIDAT_INIT_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
    };
  }

  if (type === actions.CANDIDAT_INIT_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
    };
  }
  if (type === actions.UPDATE_SKILLS_START) {
    return {
      ...state,
      loading: true,
    };
  }
  if (type === actions.UPDATE_SKILLS_SUCCESS) {
    return {
      ...state,
      skills: payload.skills || [],
      loading: false,
    };
  }

  if (type === actions.UPDATE_SKILLS_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
      loading: false,
    };
  }
  if (type === actions.UPDATE_SALARY_START) {
    return {
      ...state,
    };
  }
  if (type === actions.UPDATE_SETTINGS_SUCCESS) {
    return {
      ...state,
      settings: payload.settings || [],
    };
  }

  if (type === actions.UPDATE_SETTINGS_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
    };
  }

  if (type === actions.UPDATE_AVAILABILITY_START) {
    return {
      ...state,
    };
  }
  if (type === actions.UPDATE_AVAILABILITY_SUCCESS) {
    return {
      ...state,
      availability: payload.availability || 0,
    };
  }

  if (type === actions.UPDATE_AVAILABILITY_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
    };
  }

  if (type === actions.UPDATE_PROFILE_START) {
    return {
      ...state,
      loading: true,
    };
  }
  if (type === actions.UPDATE_PROFILE_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
      loading: false,
    };
  }

  if (type === actions.UPDATE_CONTRACT_SALARY_TYPE_START) {
    return {
      ...state,
      loading: true,
    };
  }
  if (type === actions.UPDATE_CONTRACT_SALARY_TYPE_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.UPDATE_CONTRACT_SALARY_TYPE_ERROR) {
    return {
      ...state,
      errorMessage: payload.contractType || null,
      loading: false,
    };
  }

  if (type === actions.UPDATE_LOCALIZATIONS_START) {
    return {
      ...state,
      loading: true,
    };
  }
  if (type === actions.UPDATE_LOCALIZATIONS_SUCCESS) {
    return {
      ...state,
      localizations: payload.localizations || [],
      loading: false,
    };
  }

  if (type === actions.UPDATE_LOCALIZATIONS_ERROR) {
    return {
      ...state,
      errorMessage: payload.msg || null,
      loading: false,
    };
  }

  if (type === actions.UPDATE_LANGUAGES_START) {
    return {
      ...state,
      loading: true,
    };
  }
  if (type === actions.UPDATE_LANGUAGES_SUCCESS) {
    return {
      ...state,
      languages: payload.languages || [],
      loading: false,
    };
  }

  if (type === actions.UPDATE_LANGUAGES_ERROR) {
    return {
      ...state,
      errorMessage: payload.msg || null,
      loading: false,
    };
  }

  if (type === actions.LIST_ADS_CANDIDAT_START) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.LIST_ADS_CANDIDAT_SUCCESS) {
    return {
      ...state,
      ads: payload.ads || null,
      feeds: payload.feeds || [],
      candidat_id: payload.candidat_id,
      like_count: payload.like_count,
      loading: false,
    };
  }

  if (type === actions.LIST_ADS_CANDIDAT_ERROR) {
    return {
      ...state,
      errorMessage: payload.msg || null,
      loading: false,
    };
  }

  if (type === actions.UPDATE_SALARY_START) {
    return {
      ...state,
    };
  }
  if (type === actions.UPDATE_SALARY_SUCCESS) {
    return {
      ...state,
      salary: payload.salary || [],
    };
  }

  if (type === actions.UPDATE_SALARY_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
    };
  }
  if (type === actions.BACK_TO_PREFERENCE) {
    return {
      ...state,
      showSettings: false,
    };
  }

  return state;
};

const candidatReducer = combineReducers({
  candidat: candidat,
  candidatSetup: combineReducers({
    setupProfile: SetupProfileReducer,
  }),
});
export default candidatReducer;

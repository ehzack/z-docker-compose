import { combineReducers } from 'redux';
import SetupProfileReducer from './setupProfile/setupProfileReducers';
import offerReducers from './offer/offerReducers';

import actions from './recruiterActions';
const initialData = {
  skills: [],
  loadingInit: false,
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
  settings: [],
  i18n: [],
  bio: '',
  work_years_number: null,
  title: '',
  study_level: null,
  listAds: [],
  candidats_like_ad: [],
  currentAds: 0,
  showSettings: false,
  company_name: '',
};

const Recruiter = (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.RECRUITER_INIT_START) {
    return {
      ...state,
      loadingInit: true,
      errorMessage: null,
    };
  }
  if (type === actions.RECRUITER_INIT_SUCCESS) {
    return {
      ...state,
      listAds: payload.listAds || [],
      candidats_like_ad: payload.candidats_like_ad || [],
      currentAds: payload.currentAds || null,
      errorMessage: null,
      loadingInit: false,
      loading: false,
    };
  }
  if (type === actions.RECRUITER_INIT_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
      loadingInit: false,
    };
  }

  if (type === actions.RECRUITER_CHANGE_ADS_START) {
    return {
      ...state,
      loading: true,
      errorMessage: null,
    };
  }
  if (type === actions.RECRUITER_CHANGE_ADS_SUCCESS) {
    return {
      ...state,
      candidats_like_ad: payload.candidats_like_ad,
      currentAds: payload.currentAds,
      errorMessage: null,
      loading: false,
    };
  }
  if (type === actions.RECRUITER_CHANGE_ADS_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
      loading: false,
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
  if (type === actions.BACK_TO_PREFERENCE) {
    return {
      ...state,
      showSettings: false,
    };
  }

  if (type === actions.LIST_SETTINGS_ERROR) {
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

  return state;
};

const recruiterReducer = combineReducers({
  recruiter: Recruiter,
  offer: offerReducers,
  recruiterSetup: combineReducers({
    setupProfile: SetupProfileReducer,
  }),
});
export default recruiterReducer;

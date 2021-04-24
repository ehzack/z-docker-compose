import { combineReducers } from 'redux';
const initialData = {
  authenticationUser: null,
  currentUser: null,
  loadingInit: true,
  showModalActivateAccount: false,

  loadingEmailConfirmation: false,
  loadingPasswordReset: false,
  loadingUpdateProfile: false,
  loading: false,
  errorMessage: null,
  actor: null,
  refresh_token: null,
  jwt_token: null,
  jwt_expired: null,
  socket: null,
};
const prefix = 'AUTH';

const actions = {
  ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

  AUTH_INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  AUTH_INIT_ERROR: `${prefix}_INIT_ERROR`,
  INVALIDE_MAIL: `${prefix}_INVALIDE_MAIL`,
  SAVE_TOKEN: `${prefix}_SAVE_TOKEN`,

  AUTH_START: `${prefix}_LOGIN_START`,
  AUTH_SUCCESS: `${prefix}_LOGIN_SUCCESS`,
  AUTH_ERROR: `${prefix}_LOGIN_ERROR`,

  AUTH_ACTIVATE_START: `${prefix}_ACTIVATE_START`,
  AUTH_ACTIVATE_SUCCESS: `${prefix}_ACTIVATE_SUCCESS`,
  AUTH_ACTIVATE_ERROR: `${prefix}_ACTIVATE_ERROR`,

  REGISTER_START: `${prefix}_REGISTER_START`,
  REGISTER_SUCCESS: `${prefix}_REGISTER_SUCCESS`,
  REGISTER_ERROR: `${prefix}_REGISTER_ERROR`,

  UPDATE_PROFILE_START: `${prefix}_UPDATE_PROFILE_START`,
  UPDATE_PROFILE_SUCCESS: `${prefix}_UPDATE_PROFILE_SUCCESS`,
  UPDATE_PROFILE_ERROR: `${prefix}_UPDATE_PROFILE_ERROR`,

  CURRENT_USER_REFRESH_START: `${prefix}_CURRENT_USER_REFRESH_START`,
  CURRENT_USER_REFRESH_SUCCESS: `${prefix}_CURRENT_USER_REFRESH_SUCCESS`,
  CURRENT_USER_REFRESH_ERROR: `${prefix}_CURRENT_USER_REFRESH_ERROR`,

  PASSWORD_RESET_START: `${prefix}_PASSWORD_RESET_START`,
  PASSWORD_RESET_SUCCESS: `${prefix}_PASSWORD_RESET_SUCCESS`,
  PASSWORD_RESET_ERROR: `${prefix}_PASSWORD_RESET_ERROR`,

  EMAIL_CONFIRMATION_START: `${prefix}_EMAIL_CONFIRMATION_START`,
  EMAIL_CONFIRMATION_SUCCESS: `${prefix}_EMAIL_CONFIRMATION_SUCCESS`,
  EMAIL_CONFIRMATION_ERROR: `${prefix}_EMAIL_CONFIRMATION_ERROR`,
  CLEAR_STORE: `${prefix}_CLEAR_STORE`,
};

const AUTH = (state = initialData, { type, payload }) => {
  if (type === actions.CLEAR_STORE) {
    return {
      ...state,
      errorMessage: null,
      showModalActivateAccount: false,
      loading: false,
      refresh_token: null,
      jwt_token: null,
      jwt_expired: null,
      currentUser: null,
      authenticationUser: null,
    };
  }
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
      showModalActivateAccount: false,
      loading: false,
    };
  }

  if (type === actions.CURRENT_USER_REFRESH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      errorMessage: null,
    };
  }

  if (type === actions.SAVE_TOKEN) {
    return {
      ...state,
      refresh_token: payload.refresh_token || null,
      jwt_token: payload.jwt_token || null,
      jwt_expired: payload.jwt_expired || null,
    };
  }

  if (type === actions.REGISTER_START) {
    return {
      ...state,
      errorMessage: null,
      loading: true,
    };
  }

  if (type === actions.REGISTER_SUCCESS) {
    return {
      ...state,
      authenticationUser: payload.authenticationUser || null,
      currentUser: payload.currentUser || null,
      errorMessage: null,
      loading: false,
    };
  }

  if (type === actions.REGISTER_ERROR) {
    return {
      ...state,
      authenticationUser: null,
      currentUser: null,
      errorMessage: payload || null,
      loading: false,
    };
  }

  if (type === actions.AUTH_ACTIVATE_START) {
    return {
      ...state,
      errorMessage: null,
      loading: true,
    };
  }

  if (type === actions.AUTH_ACTIVATE_SUCCESS) {
    return {
      ...state,
      errorMessage: null,
      loading: false,
      showModalActivateAccount: false,
    };
  }

  if (type === actions.AUTH_ACTIVATE_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
      loading: false,
    };
  }

  if (type === actions.AUTH_START) {
    return {
      ...state,
      errorMessage: null,
      loading: true,
    };
  }

  if (type === actions.AUTH_SUCCESS) {
    return {
      ...state,
      authenticationUser: payload.authenticationUser || null,
      currentUser: payload.currentUser || null,
      socket: payload.socket || null,
      errorMessage: null,
      loading: false,
    };
  }

  if (type === actions.AUTH_ERROR) {
    return {
      ...state,
      authenticationUser: payload.authenticationUser || null,
      currentUser: payload.currentUser || null,
      errorMessage: payload.errorMessage || null,
      socket: null,
      loading: false,
      showModalActivateAccount: payload.showModalActivateAccount || false,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_START) {
    return {
      ...state,
      loadingEmailConfirmation: true,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_SUCCESS) {
    return {
      ...state,
      loadingEmailConfirmation: false,
      errorMessage: null,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_ERROR) {
    return {
      ...state,
      loadingEmailConfirmation: false,
    };
  }

  if (type === actions.PASSWORD_RESET_START) {
    return {
      ...state,
      loadingPasswordReset: true,
    };
  }

  if (type === actions.PASSWORD_RESET_SUCCESS) {
    return {
      ...state,
      authenticationUser: payload.authenticationUser || null,
      currentUser: payload.currentUser || null,
      refresh_token: payload.refreshToken || null,

      loadingPasswordReset: false,
      errorMessage: null,
    };
  }

  if (type === actions.PASSWORD_RESET_ERROR) {
    return {
      ...state,
      loading: false,

      loadingPasswordReset: false,
      errorMessage: payload || null,
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
      errorMessage: null,
    };
  }

  if (type === actions.UPDATE_PROFILE_ERROR) {
    return {
      ...state,
      loading: false,
      errorMessage: payload || null,
    };
  }

  if (type === actions.AUTH_INIT_SUCCESS) {
    return {
      ...state,
      authenticationUser: payload.authenticationUser || null,
      currentUser: payload.currentUser || null,
      loading: false,
      errorMessage: null,
    };
  }

  if (type === actions.AUTH_INIT_ERROR) {
    return {
      ...state,
      authenticationUser: null,
      currentUser: null,
      loading: false,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};

export default AUTH;

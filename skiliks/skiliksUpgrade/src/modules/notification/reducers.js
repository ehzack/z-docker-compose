import { combineReducers } from 'redux';
import actions from './notificationActions';
const initialData = {
  notification: [],

  loading: true,
  errorMessage: null,
  loadingInit: false,
};

const notifications = (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.LIST_NOTIFICATION_START) {
    return {
      ...state,
      loading: true,
    };
  }
  if (type === actions.LIST_NOTIFICATION_SUCCESS) {
    return {
      ...state,
      notification: payload.notification || [],
      loading: false,
    };
  }

  if (type === actions.LIST_NOTIFICATION_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
      loading: false,
    };
  }

  return state;
};

export default notifications;

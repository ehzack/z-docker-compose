import { Alert } from 'react-native';
import service from './notificationService';
import NavigationService from '../../navigation/NavigationService';
import i18n from '../../i18n/index';
import { getStore } from '../store';

const prefix = 'NOTIFICATION';

var actions = {
  ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

  LIST_NOTIFICATION_START: `${prefix}_LIST_NOTIFICATION_START`,
  LIST_NOTIFICATION_SUCCESS: `${prefix}_LIST_NOTIFICATION_SUCCESS`,
  LIST_NOTIFICATION_ERROR: `${prefix}_LIST_NOTIFICATION_ERROR`,

  doClearErrorMessage() {
    return {
      type: actions.ERROR_MESSAGE_CLEARED,
    };
  },

  DoListNotifications: () => async (dispatch) => {
    try {
      //Skills
      //Availability
      //localizations
      //ContractType
      //Languages

      dispatch({
        type: actions.LIST_NOTIFICATION_START,
      });

      let notification = await service.listNotification();

      dispatch({
        type: actions.LIST_NOTIFICATION_SUCCESS,
        payload: {
          notification: notification,
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

import { Alert } from 'react-native';
import service from './chatsService';
import NavigationService from '../../navigation/NavigationService';
import i18n from '../../i18n/index';
import { getStore } from '../store';
import selectors from '../auth/authSelectors';

const prefix = 'CHATS';

var actions = {
  ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

  LIST_CHATS_START: `${prefix}_LIST_CHATS_START`,
  LIST_CHATS_SUCCESS: `${prefix}_LIST_CHATS_SUCCESS`,
  LIST_CHATS_ERROR: `${prefix}_LIST_CHATS_ERROR`,

  LIST_MESSAGES_START: `${prefix}_LIST_MESSAGES_START`,
  LIST_MESSAGES_SUCCESS: `${prefix}_LIST_MESSAGES_SUCCESS`,
  LIST_MESSAGES_ERROR: `${prefix}_LIST_MESSAGES_ERROR`,
  ADD_MESSAGES_START: `${prefix}_ADD_MESSAGES_START`,
  ADD_MESSAGES_SUCCESS: `${prefix}_ADD_MESSAGES_SUCCESS`,
  ADD_MESSAGES_ERROR: `${prefix}_ADD_MESSAGES_ERROR`,
  doClearErrorMessage() {
    return {
      type: actions.ERROR_MESSAGE_CLEARED,
    };
  },

  DoListChats: (naviagate) => async (dispatch) => {
    dispatch({
      type: actions.LIST_CHATS_START,
    });
    try {
      dispatch({
        type: actions.LIST_CHATS_SUCCESS,
        payload: {
          chats: [],
        },
      });
      if (naviagate) {
        NavigationService.navigate('Chat');
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.LIST_CHATS_ERROR,
        msg: '',
      });
    }
  },
  DoListMessages: (item) => async (dispatch, getState) => {
    dispatch({
      type: actions.LIST_MESSAGES_START,
    });

    try {
      // var idUser = getStore().getState().auth.currentUser.id;
      dispatch({
        type: actions.LIST_MESSAGES_SUCCESS,
        payload: {
          messages: [],
          discussion: item,
        },
      });

      if (selectors.isCandidat(getState())) {
        NavigationService.NavigateToNested('CandidatStack', 'Discussion');
      } else {
        NavigationService.NavigateToNested('RecruiterStack', 'Discussion');
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.LIST_MESSAGES_SUCCESS,
        msg: '',
      });
    }
  },

  DoGetChat: () => async (dispatch, getState) => {
    dispatch({
      type: actions.LIST_MESSAGES_START,
    });

    try {
      let item = await service.getLastChat();
      if (item.length == 0) {
        throw '';
      }
      dispatch({
        type: actions.LIST_MESSAGES_SUCCESS,
        payload: {
          messages: [],
          discussion: item,
        },
      });
      console.log('************************** CHat ******************');
      console.log(item);
      if (selectors.isCandidat(getState())) {
        NavigationService.NavigateToNested('CandidatStack', 'Discussion');
      } else {
        NavigationService.NavigateToNested('RecruiterStack', 'Discussion');
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: actions.LIST_MESSAGES_SUCCESS,
        msg: '',
      });
    }
  },
};

export default actions;

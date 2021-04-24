const initialData = {
  chats: [],
  messages: [],
  loading: false,
  errorMessage: null,
  loadingInit: true,
  discussion: null,
};
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
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.LIST_CHATS_START) {
    return {
      ...state,
    };
  }
  if (type === actions.LIST_CHATS_SUCCESS) {
    return {
      ...state,
      chats: payload.chats || [],
    };
  }

  if (type === actions.LIST_CHATS_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
    };
  }

  if (type === actions.LIST_MESSAGE_START) {
    return {
      ...state,
    };
  }
  if (type === actions.LIST_MESSAGES_SUCCESS) {
    return {
      ...state,
      messages: payload.messages || [],
      discussion: payload.discussion,
    };
  }

  if (type === actions.LIST_MESSAGES_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
    };
  }

  if (type === actions.ADD_MESSAGE_START) {
    return {
      ...state,
    };
  }
  if (type === actions.ADD_MESSAGES_SUCCESS) {
    return {
      ...state,
      messages: payload.messages || [],
    };
  }

  if (type === actions.ADD_MESSAGES_ERROR) {
    return {
      ...state,
      errorMessage: payload.errorMessage || null,
    };
  }

  return state;
};

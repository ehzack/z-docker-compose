import actions from './offerActions.js';

const initialData = {
  loading: false,
  error: '',
  isEditing: false,
  item_to_edit: {},
  candidat_like_ad: [],
  uploadPhoto: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
      item_to_edit: {},
      isEditing: false,
    };
  }

  if (type === actions.UPLOAD_PHOTO_START) {
    return {
      ...state,
      uploadPhoto: true,
    };
  }

  if (type === actions.UPLOAD_PHOTO_SUCCESS) {
    return {
      ...state,
      uploadPhoto: false,
    };
  }

  if (type === actions.UPLOAD_PHOTO_ERROR) {
    return {
      ...state,
      uploadPhoto: false,
      error: '',
    };
  }

  if (type === actions.CREATE_OFFER_START) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.CREATE_OFFER_SUCCESS) {
    return {
      ...state,
      loading: false,
      uploadPhoto: false,
    };
  }

  if (type === actions.CREATE_OFFER_ERROR) {
    return {
      ...state,
      loading: false,
      error: '',
    };
  }

  if (type === actions.UPDATE_OFFER_START) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.UPDATE_OFFER_SUCCESS) {
    return {
      ...state,
      loading: false,
      isEditing: false,
      uploadPhoto: false,
    };
  }

  if (type === actions.UPDATE_OFFER_ERROR) {
    return {
      ...state,
      loading: false,

      error: '',
      uploadPhoto: false,
    };
  }

  if (type === actions.FIND_OFFER_START) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FIND_OFFER_SUCCESS) {
    return {
      ...state,
      loading: false,
      item_to_edit: payload.item,
      candidat_like_ad: payload.candidat,
      uploadPhoto: false,

      isEditing: payload.isEditing || false,
    };
  }

  if (type === actions.FIND_OFFER_ERROR) {
    return {
      ...state,
      loading: false,
      error: '',
      candidat_like_ad: [],
      isEditing: false,
      item_to_edit: null,
      uploadPhoto: false,
    };
  }

  return state;
};

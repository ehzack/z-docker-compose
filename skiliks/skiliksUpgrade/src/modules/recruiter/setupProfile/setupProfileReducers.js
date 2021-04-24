import actions from "./setupProfileActions";

const initialData = {
  loading: false,
  avatar_profile: null,
  first_name: null,
  last_name: null,
  title: null,
  company_name: null,
  expertises: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.STEP1) {
    return {
      ...state,
      first_name: payload.first_name || null,
      last_name: payload.last_name || null,
      title: payload.title || null,
      company_name: payload.company_name || null,
      avatar_profile: payload.avatar_profile || null,

    };
  }
  if (type === actions.STEP2) {
    return {
      ...state,
      company_size: payload.company_size || null,
      localization: payload.localization || null,
      bio: payload.bio || null,
    };
  }
  if (type === actions.STEP3) {
    return {
      ...state,

      expertises: payload.expertises || null,
    };
  }

  if (type === actions.SAVE_INIT) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.SAVE_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.SAVE_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};

import actions from './setupProfileActions';

const initialData = {
  loading: false,
  avatar_profile: null,
  first_name: null,
  last_name: null,
  gender: null,
  title: null,
  work_years_number: null,
  study_level: null,
  bio: null,
  skills: [],
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
      avatar_profile: payload.avatar_profile || null,
      first_name: payload.first_name || null,
      last_name: payload.last_name || null,
      gender: payload.gender || null,
      title: payload.title || null,
      work_years_number: payload.work_years_number || null,
      study_level: payload.study_level || null,
      bio: payload.bio || null,
    };
  }
  if (type === actions.STEP2) {
    return {
      ...state,
    };
  }
  if (type === actions.STEP3) {
    return {
      ...state,

      skills: payload.skills || null,
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

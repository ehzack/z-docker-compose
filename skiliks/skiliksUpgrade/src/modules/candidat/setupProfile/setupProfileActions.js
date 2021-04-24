import NavigationService from '../../../navigation/NavigationService';
import Upload from '../../shared/upload/upload';
import service from '../candidatService';
import dictionaryService from '../../dictionary/dictionaryService';
import authAction from '../../auth/authActions';
import * as Localization from 'expo-localization';

const prefix = 'SETUP';

const actions = {
  ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

  STEP1: `${prefix}_STEP1`,
  STEP2: `${prefix}_STEP2`,
  STEP3: `${prefix}_STEP3`,
  SAVE_INIT: `${prefix}_SAVE_INIT`,
  SAVE_SUCCESS: `${prefix}_SAVE_SUCCESS`,
  SAVE_ERROR: `${prefix}_SAVE_ERROR`,

  doClearErrorMessage() {
    return {
      type: actions.ERROR_MESSAGE_CLEARED,
    };
  },

  Step1Action: (payload) => async (dispatch, getState) => {
    dispatch({
      type: actions.STEP1,

      payload: payload,
    });
    NavigationService.navigate('SetupProfile2');
  },

  Step2Action: (payload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actions.SAVE_INIT,
      });

      let state = getState().candidat.candidatSetup.setupProfile;
      console.log(state);
      var FileUpload = '';
      if (state.avatar_profile != null) {
        FileUpload = await Upload.uploadFromRequest(state.avatar_profile);
      }
      await service.InsertCandidatRole({
        user: {
          avatar_profile: FileUpload,
          first_name: state.first_name,
          last_name: state.last_name,
          gender: state.gender,
          display_name: `${state.first_name} ${state.last_name}`,
        },
      });

      await dispatch(authAction.doRefreshCurrentUser());

      console.log(Localization.timezone);
      let resLocalization = await dictionaryService.SaveGeo(
        Localization.timezone,
      );
      console.log('GET ID LOCALIZATION : ', resLocalization);
      if (resLocalization.id != -1) {
        resLocalization.label = Localization.timezone;
      } else {
        resLocalization = [];
      }

      console.log(resLocalization);
      await service.InsertCandidat({
        data: {
          work_years_number: state.work_years_number.id,
          title: state.title,
          study_level: state.study_level.id,
          skills: payload.skills,
          bio: state.bio,
        },
        preference: {
          localizations: [resLocalization],
          languages: [],
          contract_types: [],
        },
      });

      dispatch({
        type: actions.SAVE_SUCCESS,
      });
      NavigationService.Reset('CandidatStack', 'MainStack');
    } catch (e) {
      console.log(e);
      dispatch({
        type: actions.SAVE_ERROR,
      });
    }
  },
};

export default actions;

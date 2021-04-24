import NavigationService from "../../../navigation/NavigationService";
import Upload from "../../shared/upload/upload";
import service from "../recruiterService";
import dictionaryService from "../../dictionary/dictionaryService";
import authAction from "../../auth/authActions";
import * as Localization from "expo-localization";

const prefix = "SETUP";

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
    try {
      dispatch({
        type: actions.SAVE_INIT,
      });
      var FileUpload = "";
      if (payload.avatar_profile != null) {
        FileUpload = await Upload.uploadFromRequest(payload.avatar_profile);
      }
      await service.InsertRecruiterRole({
        user: {
          avatar_profile: FileUpload,
          first_name: payload.first_name,
          last_name: payload.last_name,
        },
      });

      await dispatch(authAction.doRefreshCurrentUser());

      await service.InsertRecruiter({
        data: {
          company_name: payload.company_name,
          title: payload.title,
        },
      });

      dispatch({
        type: actions.SAVE_SUCCESS,
      });
      // dispatch({
      //   type: actions.STEP1,

      //   payload: payload,
      // });
      // NavigationService.navigate("SetupProfile3");

      NavigationService.Reset("RecruiterStack", "MainStack");
    } catch (e) {
      console.log(e);
      dispatch({
        type: actions.SAVE_ERROR,
      });
    }
  },

  // Step3Action: (payload) => async (dispatch, getState) => {
  //   try {
  //     dispatch({
  //       type: actions.SAVE_INIT,
  //     });

  //     let state = getState().recruiter.recruiterSetup.setupProfile;
  //     // Object {
  //     //   "activity_area": Object {
  //     //     "code": "INF/TÉL",
  //     //     "id": 2321,
  //     //     "name": " Informatique / Télécoms",
  //     //   },
  //     //   "avatar_profile": null,
  //     //   "bio": "Jdjdkdkxkxkxlxlxlxlxllglglglxllclglxlxlx",
  //     //   "company_name": "Jdjd",
  //     //   "company_size": "50",
  //     //   "company_type": Object {
  //     //     "code": "GROD’IÉCO",
  //     //     "id": 2334,
  //     //     "name": "groupement d’intérêt économique",
  //     //   },
  //     //   "expertises": null,
  //     //   "loading": true,
  //     //   "localization": Object {
  //     //     "label": "Safi,Maroc",
  //     //   },
  //     //   "website": "Jxjwjx",
  //     // }

  //     var FileUpload = "";
  //     if (state.avatar_profile != null) {
  //       FileUpload = await Upload.uploadFromRequest(state.avatar_profile);
  //     }
  //     await service.InsertRecruiterRole({
  //       user: {
  //         avatar_profile: FileUpload,
  //         first_name: state.first_name,
  //         last_name: state.last_name,
  //       },
  //     });

  //     await dispatch(authAction.doRefreshCurrentUser());

  //     await service.InsertRecruiter({
  //       data: {
  //         company_name: state.company_name,
  //         title: state.title,
  //         expertises: payload.expertises,
  //       },
  //     });

  //     dispatch({
  //       type: actions.SAVE_SUCCESS,
  //     });
  //     NavigationService.Reset("RecruiterStack", "MainStack");
  //   } catch (e) {
  //     console.log(e);
  //     dispatch({
  //       type: actions.SAVE_ERROR,
  //     });
  //   }
  // },
};

export default actions;

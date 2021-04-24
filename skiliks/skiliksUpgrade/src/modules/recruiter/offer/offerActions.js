import NavigationService from '../../../navigation/NavigationService';
import Upload from '../../shared/upload/upload';
import service from './offerServices';
import dictionaryService from '../../dictionary/dictionaryService';
import authAction from '../../auth/authActions';
import * as Localization from 'expo-localization';
import Toast from 'react-native-toast-message';
import i18n from '../../../i18n/index';
import platform from '../../../../native-base-theme/variables/platform';
const prefix = 'OFFER';

const actions = {
  ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

  CREATE_OFFER_START: `${prefix}_CREATE_OFFER_START`,
  CREATE_OFFER_SUCCESS: `${prefix}_CREATE_OFFER_SUCCESS`,

  CREATE_OFFER_ERROR: `${prefix}_CREATE_OFFER_ERROR`,
  NAVIGATE_UPDATE: `${prefix}_NAVIGATE_UPDATE`,

  UPDATE_OFFER_START: `${prefix}_UPDATE_OFFER_START`,
  UPDATE_OFFER_SUCCESS: `${prefix}_UPDATE_OFFER_SUCCESS`,

  UPDATE_OFFER_ERROR: `${prefix}_UPDATE_OFFER_ERROR`,

  FIND_OFFER_START: `${prefix}_FIND_OFFER_START`,
  FIND_OFFER_SUCCESS: `${prefix}_FIND_OFFER_SUCCESS`,

  FIND_OFFER_ERROR: `${prefix}_FINDTE_OFFER_ERROR`,

  UPLOAD_PHOTO_START: `${prefix}_UPLOAD_PHOTO_START`,
  UPLOAD_PHOTO_SUCCESS: `${prefix}_UPLOAD_PHOTO_SUCCESS`,
  UPLOAD_PHOTO_ERROR: `${prefix}_UPLOAD_PHOTO_ERROR`,

  doClearErrorMessage() {
    return {
      type: actions.ERROR_MESSAGE_CLEARED,
    };
  },

  navigateToUpdate: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actions.FIND_OFFER_START,
      });
      let item = await service.findOffer(id);

      dispatch({
        type: actions.FIND_OFFER_SUCCESS,
        payload: { item: item[0], isEditing: true },
      });
      console.log(item);
      NavigationService.navigate('FormOffer');
    } catch (e) {
      console.log(e);
      dispatch({
        type: actions.FIND_OFFER_ERROR,
      });
    }
  },

  navigateToDetail: (item, flag = true) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actions.FIND_OFFER_START,
      });

      let candidat = await service.candidat_like_ad(item.id, 5);
      dispatch({
        type: actions.FIND_OFFER_SUCCESS,
        payload: { item: item, candidat },
      });
      if (flag) {
        NavigationService.navigate('DetailOffer');
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actions.FIND_OFFER_ERROR,
      });
    }
  },

  navigateToSetting: (item) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actions.FIND_OFFER_START,
      });

      let candidat = await service.candidat_like_ad(item.id);

      dispatch({
        type: actions.FIND_OFFER_SUCCESS,
        payload: { item: item, candidat },
      });
      NavigationService.navigate('SettingOffer');
    } catch (e) {
      console.log(e);
      dispatch({
        type: actions.FIND_OFFER_ERROR,
      });
    }
  },
  createOffer: (payload, status) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actions.CREATE_OFFER_START,
      });

      var FileUpload = null;

      if (payload.company_logo != null) {
        dispatch({
          type: actions.UPLOAD_PHOTO_START,
        });

        FileUpload = await Upload.uploadFromRequest(payload.company_logo);
        dispatch({
          type: actions.UPLOAD_PHOTO_SUCCESS,
        });
      }

      let result = await service.createOffer({
        title: payload.title,
        description: payload.description,
        study_level: payload.study_level ? payload.study_level.id : null,
        work_years_experience: payload.work_years_experience
          ? payload.work_years_experience.id
          : null,
        required_skills: payload.required_skills,
        preferred_skills: payload.preferred_skills,
        availability: payload.availability,
        localizations: payload.localizations,
        languages: payload.languages,
        gender: payload.gender,
        contract_types: payload.contract_types,
        company_name: payload.company_name,
        company_logo: FileUpload,
      });

      if (status == 'PUB') {
        await service.change_status_ads(result[0].id, 'PUB');
      }
      dispatch({
        type: actions.CREATE_OFFER_SUCCESS,
      });

      Toast.show({
        type: 'success',
        text1: i18n.t('user.recruiter.offer.common.addOffer'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      NavigationService.Reset('RecruiterStack', 'MainStack');
    } catch (e) {
      console.log(e);
      dispatch({
        type: actions.CREATE_OFFER_ERROR,
      });

      Toast.show({
        type: 'error',
        text1: 'erreur',
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
    }
  },

  duplicateOffer: (payload, status) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actions.CREATE_OFFER_START,
      });

      //  {
      //   "availability":  {
      //     "code": "ENT1ET3",
      //     "id": 61,
      //     "name": "Entre 1 et 3 Mois",
      //   },
      //   "company_logo": undefined,
      //   "company_name": "Ocp",
      //   "contract_types":  [
      //     Object {
      //       "id": 56,
      //       "label": "CDI",
      //     },
      //     Object {
      //       "id": 57,
      //       "label": "CDD",
      //     },
      //   ],
      //   "description": "Testest",
      //   "gender":  {
      //     "code": "MAL",
      //     "id": 75,
      //     "name": "Male",
      //   },
      //   "id": undefined,
      //   "languages":  [
      //     Object {
      //       "id": 124,
      //       "label": "French",
      //     },
      //     Object {
      //       "id": 117,
      //       "label": "English",
      //     },
      //   ],
      //   "localizations":  [
      //     Object {
      //       "id": 19,
      //       "label": "Agadir,Maroc",
      //     },
      //   ],
      //   "preferred_skills":  [
      //     Object {
      //       "id": 10,
      //       "label": "CSS3",
      //     },
      //   ],
      //   "required_skills":  [
      //     Object {
      //       "id": 11,
      //       "label": "JavaScript",
      //     },
      //   ],
      //   "study_level":  {
      //     "code": "BAC+2",
      //     "id": 43,
      //     "name": "Bac + 2",
      //   },
      //   "title": "Devlopper",
      //   "work_years_experience":  {
      //     "id": 2,
      //     "name": "2",
      //   },
      // }

      let result = await service.createOffer({
        title: payload.title,
        description: payload.description,
        study_level: payload.study_level ? payload.study_level.id : null,
        work_years_experience: payload.work_years_experience
          ? payload.work_years_experience.id
          : null,
        required_skills: payload.required_skills,
        preferred_skills: payload.preferred_skills,
        availability: payload.availability,
        localizations: payload.localizations,
        languages: payload.languages,
        gender: payload.gender,
        contract_types: payload.contract_types,
        company_name: payload.company_name,
        company_logo: payload.company_logo,
      });

      await service.change_status_ads(result[0].id, status);

      dispatch({
        type: actions.CREATE_OFFER_SUCCESS,
      });

      Toast.show({
        type: 'success',
        text1: i18n.t('user.recruiter.offer.common.duplicateOffer'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: actions.CREATE_OFFER_ERROR,
      });

      Toast.show({
        type: 'error',
        text1: 'erreur',
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
    }
  },

  updateoffer: (payload, flag = false) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actions.UPDATE_OFFER_START,
      });

      var FileUpload = null;
      if (payload.company_logo && payload.company_logo.token) {
        FileUpload = payload.company_logo;
      } else if (payload.company_logo != null) {
        dispatch({
          type: actions.UPLOAD_PHOTO_START,
        });
        FileUpload = await Upload.uploadFromRequest(payload.company_logo);
      }
      let result = await service.updateOffer(payload.id, {
        title: payload.title,
        description: payload.description,
        study_level: payload.study_level.id,
        work_years_experience: payload.work_years_experience.id,
        required_skills: payload.required_skills,
        preferred_skills: payload.preferred_skills,
        availability: payload.availability,
        localizations: payload.localizations,
        languages: payload.languages,
        gender: payload.gender,
        contract_types: payload.contract_types,
        company_name: payload.company_name,
        company_logo: FileUpload,
      });

      let newData = await service.findOffer(payload.id);
      await actions.navigateToDetail(newData[0], false);

      NavigationService.goBack();

      dispatch({
        type: actions.UPDATE_OFFER_SUCCESS,
      });

      Toast.show({
        type: 'success',
        text1: i18n.t('user.recruiter.offer.common.editOffer'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'erreur',
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      dispatch({
        type: actions.UPDATE_OFFER_ERROR,
      });
    }
  },
};

export default actions;

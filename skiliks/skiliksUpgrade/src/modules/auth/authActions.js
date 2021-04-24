import { Alert } from 'react-native';
import service from './authService';
import NavigationService from '../../navigation/NavigationService';
import i18n, { setLanguageCode, getLanguageCode } from '../../i18n/index';
import * as Localization from 'expo-localization';
import { ToastAndroid, Platform, AlertIOS } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import * as RNLocalize from "react-native-localize";
import { getStore } from '../store';
import config from '../../config/index';
import Roles from '../../sercurity/roles';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { ref } from 'yup';
import Toast from 'react-native-toast-message';
import platform from '../../../native-base-theme/variables/platform';
import io from 'socket.io-client';
import * as Network from 'expo-network';
import * as Application from 'expo-application';

const prefix = 'AUTH';

const actions = {
  ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

  AUTH_INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  AUTH_INIT_ERROR: `${prefix}_INIT_ERROR`,
  INVALIDE_MAIL: `${prefix}_INVALIDE_MAIL`,
  SAVE_TOKEN: `${prefix}_SAVE_TOKEN`,

  AUTH_START: `${prefix}_LOGIN_START`,
  AUTH_SUCCESS: `${prefix}_LOGIN_SUCCESS`,
  AUTH_ERROR: `${prefix}_LOGIN_ERROR`,

  AUTH_ACTIVATE_START: `${prefix}_ACTIVATE_START`,
  AUTH_ACTIVATE_SUCCESS: `${prefix}_ACTIVATE_SUCCESS`,
  AUTH_ACTIVATE_ERROR: `${prefix}_ACTIVATE_ERROR`,

  REGISTER_START: `${prefix}_REGISTER_START`,
  REGISTER_SUCCESS: `${prefix}_REGISTER_SUCCESS`,
  REGISTER_ERROR: `${prefix}_REGISTER_ERROR`,

  UPDATE_PROFILE_START: `${prefix}_UPDATE_PROFILE_START`,
  UPDATE_PROFILE_SUCCESS: `${prefix}_UPDATE_PROFILE_SUCCESS`,
  UPDATE_PROFILE_ERROR: `${prefix}_UPDATE_PROFILE_ERROR`,

  CURRENT_USER_REFRESH_START: `${prefix}_CURRENT_USER_REFRESH_START`,
  CURRENT_USER_REFRESH_SUCCESS: `${prefix}_CURRENT_USER_REFRESH_SUCCESS`,
  CURRENT_USER_REFRESH_ERROR: `${prefix}_CURRENT_USER_REFRESH_ERROR`,

  PASSWORD_RESET_START: `${prefix}_PASSWORD_RESET_START`,
  PASSWORD_RESET_SUCCESS: `${prefix}_PASSWORD_RESET_SUCCESS`,
  PASSWORD_RESET_ERROR: `${prefix}_PASSWORD_RESET_ERROR`,

  EMAIL_CONFIRMATION_START: `${prefix}_EMAIL_CONFIRMATION_START`,
  EMAIL_CONFIRMATION_SUCCESS: `${prefix}_EMAIL_CONFIRMATION_SUCCESS`,
  EMAIL_CONFIRMATION_ERROR: `${prefix}_EMAIL_CONFIRMATION_ERROR`,
  CLEAR_STORE: `${prefix}_CLEAR_STORE`,
  notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  },
  doClearErrorMessage() {
    return {
      type: actions.ERROR_MESSAGE_CLEARED,
    };
  },

  doInitAuth: (flag) => async (dispatch, getState) => {
    dispatch({
      type: actions.ERROR_MESSAGE_CLEARED,
    });
    if (flag) {
      NavigationService.Reset('AuthStack', 'SigninPage');
    }
  },

  doSendEmailConfirmation: (email) => async (dispatch, getState) => {
    try {
      dispatch({ type: actions.EMAIL_CONFIRMATION_START });
      let res = await service.sendEmailVerification(email);

      if (res == 1) {
        NavigationService.navigate('Login');

        dispatch({
          type: actions.EMAIL_CONFIRMATION_SUCCESS,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response && error.response.data);
      }
      dispatch({ type: actions.EMAIL_CONFIRMATION_ERROR });
    }
  },

  doActivateAccount: (email, code) => async (dispatch, getState) => {
    try {
      dispatch({ type: actions.AUTH_ACTIVATE_START });
      let res = await service.validateAccount(email, code);

      if (res == 1) {
        dispatch({
          type: actions.AUTH_ACTIVATE_SUCCESS,
        });

        let currentUser = getState().auth.currentUser;
        dispatch(
          actions.doSigninWithEmailAndPassword(
            currentUser.email,
            currentUser.password,
          ),
        );
      } else {
        Toast.show({
          type: 'error',
          text1: i18n.t('auth.passwordReset.errorCode'),
          position: 'top',
          autoHide: true,
          topOffset: platform.getRelativeHeight(70),
          visibilityTime: 1800,
        });
        dispatch({
          type: actions.AUTH_ACTIVATE_ERROR,
          payload: {
            errorMessage: 'already active',
          },
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        console.log(error.response && error.response.data);
      }
      Toast.show({
        type: 'error',
        text1: i18n.t('auth.passwordReset.errorCode'),
        position: 'top',
        autoHide: true,
        topOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      dispatch({
        type: actions.AUTH_ACTIVATE_ERROR,
        payload: {
          errorMessage: 'erreur',
        },
      });
    }
  },

  doSendPasswordResetEmail: (email) => async (dispatch) => {
    try {
      dispatch({ type: actions.PASSWORD_RESET_START });
      let result = await service.sendPasswordResetEmail(email);
      if (result == 1) {
        //Message.success(i18n('auth.passwordResetSuccess'));

        var currentUser = {
          email: email,
        };
        var authenticationUser = currentUser;

        dispatch({
          type: actions.PASSWORD_RESET_SUCCESS,
          payload: {
            currentUser,
            authenticationUser,
          },
        });
        Toast.show({
          type: 'success',
          text1: i18n.t('auth.passwordReset.passwordResetSuccess'),
          position: 'bottom',
          autoHide: true,
          bottomOffset: platform.getRelativeHeight(70),
          visibilityTime: 1800,
        });

        NavigationService.navigate('SetMailCode');
      } else {
        //Message.error(i18n('auth.emailAddressVerificationEmail.error'));
        Toast.show({
          type: 'error',
          text1: i18n.t('auth.emailAddressVerificationEmail.error'),
          position: 'bottom',
          autoHide: true,
          bottomOffset: platform.getRelativeHeight(70),
          visibilityTime: 1800,
        });
        dispatch({
          type: actions.PASSWORD_RESET_ERROR,
          payload: i18n.t('auth.emailAddressVerificationEmail.error'),
        });
      }
    } catch (error) {
      console.log(error);

      Toast.show({
        type: 'error',
        text1: i18n.t('auth.error.none'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      dispatch({
        type: actions.PASSWORD_RESET_ERROR,
        payload: i18n.t('auth.emailAddressVerificationEmail.error'),
      });
    }
  },
  doSendCodeResetEmail: (email, code) => async (dispatch) => {
    try {
      dispatch({ type: actions.PASSWORD_RESET_START });

      let result = await service.sendCodeResetEmail(email, code);
      if (result.status == 1) {
        var currentUser = {
          email: email,
          refresh_token: result.secret_token,
        };
        var authenticationUser = currentUser;

        dispatch({
          type: actions.PASSWORD_RESET_SUCCESS,
          payload: {
            currentUser,
            authenticationUser,
          },
        });
        NavigationService.navigate('UpdatePassword');
      } else {
        Toast.show({
          type: 'error',
          text1: i18n.t('auth.passwordReset.errorCode'),
          position: 'bottom',
          autoHide: true,
          bottomOffset: platform.getRelativeHeight(70),
          visibilityTime: 1800,
        });
        dispatch({
          type: actions.PASSWORD_RESET_ERROR,
          payload: i18n.t('auth.passwordReset.errorCode'),
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: i18n.t('auth.passwordReset.errorCode'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      dispatch({
        type: actions.PASSWORD_RESET_ERROR,
        payload: i18n.t('auth.passwordReset.errorCode'),
      });
    }
  },

  resetEmailUpdatePassword: (password, secret_token, email) => async (
    dispatch,
  ) => {
    try {
      dispatch({ type: actions.PASSWORD_RESET_START });
      let res = await service.resetPassword(password, secret_token);

      var currentUser = '';
      var authenticationUser = '';

      dispatch({
        type: actions.PASSWORD_RESET_SUCCESS,
        payload: {
          currentUser,
          authenticationUser,
        },
      });
      Toast.show({
        type: 'success',
        text1: i18n.t('auth.passwordReset.passwordResetSuccess'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      dispatch(actions.doSigninWithEmailAndPassword(email, password));

      //NavigationService.Reset("AuthStack", "SigninPage");
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.PASSWORD_RESET_ERROR,
        payload: 'Erreur',
      });
      // Message.error(i18n('auth.passwordReset.error'));
      // Errors.handle(error);
    }
  },

  doSigninSocial: (provider, rememberMe) => async (dispatch) => {
    try {
      var currentUser = null;
      var authenticationUser = null;
      dispatch({ type: actions.AUTH_START });
      let red = Linking.makeUrl();
      WebBrowser.openBrowserAsync(`${config.authApi}/google`);

      Linking.addEventListener('url', async (event, params) => {
        let data = Linking.parse(event.url);
        let { path, queryParams } = data;

        let credentials = await service.refreshToken(queryParams.refresh_token);
        await dispatch({
          type: actions.SAVE_TOKEN,
          payload: {
            refresh_token: credentials.refresh_token,
            jwt_token: credentials.jwt_token,
            jwt_expired: credentials.jwt_token_expires,
          },
        });

        console.log('credentials   ', credentials);
        await AsyncStorage.setItem(
          '@RefreshToken:key',
          credentials.refresh_token,
        );
        currentUser = await service.fetchMe();

        authenticationUser = currentUser;

        let mac_address =
          Platform.OS === 'ios'
            ? await Application.getIosIdForVendorAsync()
            : Application.androidId;

        var socket = io.connect(
          `${config.socketApi}?user_id=${currentUser.id}&mac_address=${mac_address}`,
        );
        await service.AfterLogin();

        await dispatch({
          type: actions.AUTH_SUCCESS,
          payload: {
            currentUser,
            authenticationUser,
            socket,
          },
        });
        dispatch(actions.navigationAdmin());
      });
      dispatch({
        type: actions.AUTH_ERROR,
        payload: 'erreur',
      });
    } catch (error) {
      dispatch({
        type: actions.AUTH_ERROR,
        payload: 'erreur',
      });
    }
  },

  doRegisterEmailAndPassword: (email, password) => async (dispatch) => {
    try {
      var timeZone = Localization.timezone;
      var language = Localization.locale;

      dispatch({ type: actions.REGISTER_START });
      const SignupauthenticationUser = await service.registerWithEmailAndPassword(
        email,
        password,
        timeZone,
        language,
      );

      var currentUser = {
        email: email,
        password: password,
      };
      var authenticationUser = currentUser;

      dispatch({
        type: actions.REGISTER_SUCCESS,
        payload: {
          currentUser,
          authenticationUser,
        },
      });

      dispatch(actions.doSigninWithEmailAndPassword(email, password));
    } catch (error) {
      //await service.signout();
      console.log(error);

      if (error.response.data.statusCode == 500) {
        dispatch({
          type: actions.REGISTER_ERROR,
          payload: i18n.t('auth.alreadyUsed'),
        });
        Toast.show({
          type: 'error',
          text1: i18n.t('auth.error.alreadyUsed'),
          position: 'bottom',
          autoHide: true,
          bottomOffset: platform.getRelativeHeight(70),
          visibilityTime: 1800,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: i18n.t('auth.error.none'),
          position: 'bottom',
          autoHide: true,
          bottomOffset: platform.getRelativeHeight(70),
          visibilityTime: 1800,
        });
        dispatch({
          type: actions.REGISTER_ERROR,
          payload: 'error',
        });
      }
    }
  },

  doSigninWithEmailAndPassword: (email, password) => async (dispatch) => {
    let authenticationUser = null;
    let currentUser = null;

    try {
      dispatch({ type: actions.AUTH_START });

      const credentials = await service.signinWithEmailAndPassword(
        email,
        password,
      );
      console.log('WA DATA : ', credentials);
      await AsyncStorage.setItem(
        '@RefreshToken:key',
        credentials.refresh_token,
      );

      dispatch({
        type: actions.SAVE_TOKEN,
        payload: {
          refresh_token: credentials.refresh_token,
          jwt_token: credentials.jwt_token,
          jwt_expired: credentials.jwt_token_expires,
        },
      });

      currentUser = await service.fetchMe();
      authenticationUser = currentUser;
      let mac_address =
        Platform.OS === 'ios'
          ? await Application.getIosIdForVendorAsync()
          : Application.androidId;
      var socket = io.connect(
        `${config.socketApi}?user_id=${currentUser.id}&mac_address=${mac_address}`,
      );

      dispatch({
        type: actions.AUTH_SUCCESS,
        payload: {
          currentUser,
          authenticationUser,
          socket,
        },
      });
      service.AfterLogin();

      dispatch(actions.navigationAdmin());
    } catch (error) {
      console.log(error);
      let msgError = 'Server Error';
      let currentUser = {
        email: email,
      };
      let authenticationUser = currentUser;
      if (
        error.response &&
        error.response.data &&
        error.response.data.message.includes('User not activated')
      ) {
        service.sendEmailVerification(email);
        currentUser = {
          email: email,
          password: password,
        };
        authenticationUser = currentUser;
        dispatch({
          type: actions.AUTH_ERROR,
          payload: {
            currentUser,
            authenticationUser,
            showModalActivateAccount: true,
            errorMessage: 'erreur',
          },
        });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message.includes('Invalid')
      ) {
        msgError = i18n.t('auth.error.invalideUser');

        Toast.show({
          type: 'error',
          text1: msgError,
          position: 'bottom',
          autoHide: true,
          bottomOffset: platform.getRelativeHeight(70),
          visibilityTime: 1800,
        });

        dispatch({
          type: actions.AUTH_ERROR,
          payload: { errorMessage: msgError },
        });
      } else {
        Toast.show({
          type: 'error',
          text1: msgError,
          position: 'bottom',
          autoHide: true,
          bottomOffset: platform.getRelativeHeight(70),
          visibilityTime: 1800,
        });
        dispatch({
          type: actions.AUTH_ERROR,
          payload: 'erreur',
        });
      }
    }
  },

  doSignout: () => async (dispatch, getState) => {
    try {
      dispatch({ type: actions.AUTH_START });

      var refresh_token = getState().auth.refresh_token;

      var socket = getState().auth.socket;
      socket.off();

      socket.disconnect();
      await service.signout(refresh_token);
      await AsyncStorage.clear();

      dispatch({
        type: actions.CLEAR_STORE,
      });

      NavigationService.Reset('AuthStack', 'Signup');
    } catch (error) {
      console.log(error);
      // Errors.handle(error);

      dispatch({
        type: actions.AUTH_ERROR,
      });
    }
  },

  doSigninFromAuthChange: () => async (dispatch) => {
    dispatch({
      type: actions.CLEAR_STORE,
    });

    const refreshToken = await AsyncStorage.getItem('@RefreshToken:key');

    try {
      if (refreshToken != null) {
        var authenticationUser = await service.refreshToken(refreshToken);
        console.log(authenticationUser);
        await AsyncStorage.setItem(
          '@RefreshToken:key',
          authenticationUser.refresh_token,
        );

        dispatch({
          type: actions.SAVE_TOKEN,
          payload: {
            refresh_token: authenticationUser.refresh_token,
            jwt_token: authenticationUser.jwt_token,
            jwt_expired: authenticationUser.jwt_token_expires,
          },
        });
        var currentUser = await service.fetchMe();

        // let lang = currentUser.account_setting.languagei18n.label.split("-")[0];

        // setLanguageCode(lang);
        authenticationUser = currentUser;
        /* if (
            getLanguageCode() !=
            currentUser.account_setting.languagei18n.label
          ) {
            I18nAction.default.doChangeLanguage(
              currentUser.account_setting.languagei18n.label,
            );
          }*/

        let mac_address =
          Platform.OS === 'ios'
            ? await Application.getIosIdForVendorAsync()
            : Application.androidId;

        var socket = io.connect(
          `${config.socketApi}?user_id=${currentUser.id}&mac_address=${mac_address}`,
        );

        dispatch({
          type: actions.AUTH_SUCCESS,
          payload: {
            currentUser,
            authenticationUser,
            socket,
          },
        });
        service.AfterLogin();

        console.log('To NavigateAdmin');
        dispatch(actions.navigationAdmin());
      } else {
        NavigationService.Reset('AuthStack', 'SigninPage');

        await AsyncStorage.clear();

        dispatch({
          type: actions.SAVE_TOKEN,
          payload: {
            refresh_token: null,
            jwt_token: null,
            jwt_expired: null,
          },
        });
      }
    } catch (error) {
      console.log('Auto Auth', error);
      await service.signout(refreshToken);
      await AsyncStorage.clear();

      dispatch({
        type: actions.SAVE_TOKEN,
        payload: {
          refresh_token: null,
          jwt_token: null,
          jwt_expired: null,
        },
      });

      dispatch({
        type: actions.AUTH_SUCCESS,
        payload: {
          authenticationUser: null,
          currentUser: null,
        },
      });
      dispatch({
        type: actions.AUTH_INIT_ERROR,
        payload: error,
      });
      NavigationService.Reset('AuthStack', 'SigninPage');
    }
  },

  navigationAdmin: () => async (dispatch, getState) => {
    let currentUser = getState().auth.currentUser;
    if (currentUser.user_roles.length > 0) {
      if (currentUser.user_roles.some((e) => e.role == Roles.values.candidat)) {
        NavigationService.Reset('CandidatStack', 'MainStack');
      } else if (
        currentUser.user_roles.some((e) => e.role == Roles.values.recruiter)
      ) {
        NavigationService.Reset('RecruiterStack', 'MainStack');
      } else {
        NavigationService.Reset('AuthStack', 'FirstAuth');
      }
    } else {
      NavigationService.Reset('AuthStack', 'FirstAuth');
    }
  },

  doRefreshCurrentUser: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: actions.CURRENT_USER_REFRESH_START,
      });
      var refresh_token = getStore().getState().auth.refresh_token;
      let credentials = await service.refreshToken(refresh_token);

      await AsyncStorage.setItem(
        '@RefreshToken:key',
        credentials.refresh_token,
      );

      dispatch({
        type: actions.SAVE_TOKEN,
        payload: {
          refresh_token: credentials.refresh_token,
          jwt_token: credentials.jwt_token,
          jwt_expired: credentials.jwt_token_expires,
        },
      });
      var currentUser = await service.fetchMe();
      // in background
      //service.reauthenticateWithStorageToken();

      dispatch({
        type: actions.CURRENT_USER_REFRESH_SUCCESS,
        payload: {
          currentUser,
        },
      });
    } catch (error) {
      console.log(error);
      service.signout();

      dispatch({
        type: actions.CURRENT_USER_REFRESH_ERROR,
        payload: error,
      });
    }
  },

  doUpdateProfile: (first_name, last_name, phoneNumber) => async (dispatch) => {
    try {
      dispatch({
        type: actions.UPDATE_PROFILE_START,
      });

      await service.updateProfile(first_name, last_name, phoneNumber);

      dispatch({
        type: actions.UPDATE_PROFILE_SUCCESS,
      });
      dispatch(actions.doRefreshCurrentUser());

      NavigationService.Reset('HomeStack', 'ProfileSetting');
    } catch (error) {
      dispatch({
        type: actions.UPDATE_PROFILE_ERROR,
      });
    }
  },

  doUpdateImageProfile: (Image, navigation) => async (dispatch) => {
    try {
      dispatch({
        type: actions.UPDATE_PROFILE_START,
      });

      await service.updateImageProfile(Image);

      dispatch(actions.doRefreshCurrentUser());

      dispatch({
        type: actions.UPDATE_PROFILE_SUCCESS,
      });

      navigation.goBack();
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.UPDATE_PROFILE_ERROR,
      });
    }
  },

  doUpdateAccountSetting: (language, timezone) => async (dispatch) => {
    try {
      dispatch({
        type: actions.UPDATE_PROFILE_START,
      });

      await service.updateSettingProfile(language, timezone);

      dispatch({
        type: actions.UPDATE_PROFILE_SUCCESS,
      });
      dispatch(actions.doRefreshCurrentUser());

      Message.success(i18n('auth.profile.success'));
    } catch (error) {
      dispatch({
        type: actions.UPDATE_PROFILE_ERROR,
      });
    }
  },

  doUpdatePassword: (email, currentPassword, newpassword) => async (
    dispatch,
  ) => {
    try {
      dispatch({
        type: actions.UPDATE_PROFILE_START,
      });

      await service.signinWithEmailAndPassword(email, currentPassword);

      await service.updatePassword(email, newpassword);

      dispatch({
        type: actions.UPDATE_PROFILE_SUCCESS,
      });
      dispatch(actions.doRefreshCurrentUser());
      Toast.show({
        type: 'success',
        text1: i18n.t('auth.editpassword.success'),
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      NavigationService.goBack();
    } catch (error) {
      console.log('erooor zack **********************');

      console.log(error);

      let msg = i18n.t('auth.editpassword.error');

      Toast.show({
        type: 'error',
        text1: msg,
        position: 'bottom',
        autoHide: true,
        bottomOffset: platform.getRelativeHeight(70),
        visibilityTime: 1800,
      });
      dispatch({
        type: actions.UPDATE_PROFILE_ERROR,
        payload: msg,
      });
    }
  },
};

export default actions;

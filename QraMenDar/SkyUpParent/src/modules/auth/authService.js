import gql from 'graphql-tag';
import graphqlClientConfig from '../shared/graphql/graphqlClient';
import axios from 'axios';
import moment from 'moment';
import * as Permissions from 'expo-permissions';
import { Vibration, Platform } from 'react-native';
import i18n, { setLanguageCode, getCurrentLanguage } from '../../i18n/index';
import * as Network from 'expo-network';
import config from '../../config/index';
import Constants from 'expo-constants';
import messaging from '@react-native-firebase/messaging';

export default class AuthService {
  static async onAuthStateChanged(callbackSuccess, callbackError) {
    try {
      var user = null;
      let refresh_token = localStorage.getItem('refresh_token');
      if (refresh_token != null) {
        let data = await this.refreshToken(refresh_token);
        user = data;
      }
      callbackSuccess(user);
    } catch (error) {
      callbackError(error);
    }
  }

  static async valideToken(token) {
    var data = await axios.post(`${config.authApi}/test_token`, {
      token: token,
    });

    return data.data.status;
  }

  static async validateAccount(email, token) {
    var data = await axios.post(`${config.authApi}/validateAccount`, {
      email: email,
      token: token,
    });

    return data.data.status;
  }

  static async refreshToken(refreshtoken) {
    var data = await axios.post(`${config.authApi}/refresh-token`, {
      refresh_token: refreshtoken,
    });
    return data.data;
  }

  static async sendEmailVerification(email) {
    var language = await getCurrentLanguage();

    var data = await axios.post(`${config.authApi}/init-activate-account`, {
      email: email,
      language: language,
    });
    return data.data.status;
  }

  static async sendEmailVerificationFromBackend(authenticationUser) {
    return null;
  }

  static async sendEmailVerificationFromClient(authenticationUser) {
    return [];
  }

  static async sendPasswordResetEmail(email) {
    var language = await getCurrentLanguage();
    console.log(language);
    var data = await axios.post(`${config.authApi}/forgot-password`, {
      email: email,
      language: language,
    });

    return data.data.status;
  }

  static async sendCodeResetEmail(email, code) {
    var data = await axios.post(`${config.authApi}/reset-password`, {
      email: email,
      token: code,
    });
    return data.data;
  }
  static async sendPasswordResetEmailFromBackend(email) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation AUTH_SEND_PASSWORD_RESET_EMAIL($email: String!) {
          authSendPasswordResetEmail(email: $email)
        }
      `,
      variables: {
        email,
      },
    });

    return response.data.authSendPasswordResetEmail;
  }

  static async sendPasswordResetEmailFromClient(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  static async registerWithEmailAndPassword(
    email,
    password,
    TimeZone,
    langageCode,
  ) {
    var data = await axios.post(`${config.authApi}/local/register`, {
      email: email,
      password: password,
      language: langageCode,
      timezone: TimeZone,
    });
    return data;
  }

  static async signinWithEmailAndPassword(email, password, rememberMe = false) {
    console.log(`${config.authApi}/local/login`);
    var data = await axios.post(`${config.authApi}/local/login`, {
      email: email,
      password: password,
    });

    return data.data;
  }

  static async resetPassword(password, secret_token) {
    console.log('ResetPassword : ', password, secret_token);
    var data = await axios.post(`${config.authApi}/local/new-password`, {
      secret_token: secret_token,
      password: password,
    });
    return data.data;
  }

  static async isOnline() {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation MyMutation {
          __typename
          update_users(where: {}, _set: {last_seen: "${moment().format()}"}) {
            affected_rows
          }
        }
      `,
    });

    let data = response.data;

    return data;
  }
  static async fetchMe() {
    const response = await graphqlClientConfig.config(true).query({
      query: gql`
        query SELECTUSER {
          users {
            user_roles {
              role
            }
            id
            default_role
            email
            active

            phone
          }
        }
      `,
    });
    console.log(response);
    let data = response.data.users[0];

    return data;
  }

  static async signout(refresh_token) {
    let mac_address = await Network.getMacAddressAsync();
    console.log(mac_address);
    var data = await axios.post(`${config.authApi}/logout`, {
      refresh_token: refresh_token,
      mac: mac_address,
    });
    return data;
  }

  static async signoutConnexion() {
    let mac_address = await Network.getMacAddressAsync();

    const response = await graphqlClientConfig.config(true).mutate({
      mutation: gql`
      mutation MyMutation {
        delete_connexion(where: {mac_address: {_eq: "${mac_address}"}}) {
          affected_rows
        }
      }
      
      `,
    });
    let data = response;

    return data;
  }

  static async signoutAll(refresh_token) {
    var data = await axios.post(`${config.authApi}/logout-all`, {
      refresh_token: refresh_token,
    });
    return data;
  }

  static staticgetcurrentdate(i = 0) {
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    var time =
      today.getHours() +
      ':' +
      (today.getMinutes() + i) +
      ':' +
      today.getSeconds();
    var dateTime = date + ' ' + time;

    return dateTime;
  }

  static async updateImageProfile(Image) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation MyMutation($image: jsonb) {
          __typename
          update_users(where: {}, _set: { avatarProfile: $image }) {
            affected_rows
          }
        }
      `,

      variables: {
        image: Image,
      },
    });

    return response.data;
  }

  static async updateProfile(first_name, last_name, phoneNumber) {
    var dateTime = this.staticgetcurrentdate(2);
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation UPDATE_PROFILE($registerdata: jsonb, $date: timestamptz) {
          update_user_accounts(
            _set: { register_data: $registerdata }
            where: { created_at: { _is_null: false } }
          ) {
            affected_rows
          }
        }
      `,

      variables: {
        registerdata: {
          last_name: last_name,
          first_name: first_name,
          phoneNumber: phoneNumber,
        },
      },
    });

    return response.data;
  }

  static async updateSettingProfile(language, timezone) {
    const response = await graphqlClientConfig
      .config()
      .mutate({
        mutation: gql`
        mutation MyMutation {
          __typename
          update_account_setting(_set: {${
            typeof language === 'string' || language instanceof String
              ? ''
              : 'language_code:' + language + ','
          }timezone_code: ${timezone.id}}, where: {}) {
            affected_rows
          }
        }
        `,
      })
      .catch((erreor) => {
        return 0;
      });
    return 1;
  }

  static async listDictionaryI18n() {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query MyQuery {
          dictionary_i18n {
            id
            label
            language
            dictionary_id
          }
        }
      `,
    });

    let responsejson = response.data.dictionary_i18n;
    let data = await responsejson.map((item, index) => {
      return {
        id: item.id,
        label: item.language,
      };
    });
    return data;
  }

  static async updatePassword(email, password) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation UPDATE_PASSWORD($date: timestamptz) {
          update_users(_set: { secret_token_expires_at: $date }, where: {}) {
            affected_rows
            returning {
              secret_token
            }
          }
        }
      `,

      variables: {
        date: this.staticgetcurrentdate(2),
      },
    });

    let secret_token = response.data.update_users.returning[0].secret_token;
    let data = await this.resetPassword(password, secret_token);

    return data;
  }

  static async pushTokenNotification(token, mac) {
    let response = await graphqlClientConfig.config(true).mutate({
      mutation: gql`
      mutation MyMutation {
        insert_connexion(objects: {mac_address: "${mac}", push_token: "${token}", connected: true},
        
        on_conflict: {
      constraint: connexion_pkey,
      update_columns: [push_token,user_id] 
      }
        
        ) {
          affected_rows
        }
      }
      
      `,
    });

    return response;
  }

  static async listAutocompleteTimeZone(value) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query GetDictionaryAutocomplete($value: String) {
          dictionary(
            where: { type: { _eq: "TIMEZONE" }, name: { _like: $value } }
          ) {
            name
            code
            id
          }
        }
      `,
      variables: {
        value: '%' + value + '%',
      },
    });

    let responsejson = response.data.dictionary;
    let data = responsejson.map((item, index) => {
      return { id: item.id, label: item.name };
    });
    return data;
  }

  static async AfterLogin() {
    if (Constants.isDevice) {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        throw 'Authorization status: Faild';
      }
      let token = await messaging().getToken();
      let mac_address = await Network.getMacAddressAsync();

      console.log('token : ', token);
      await this.pushTokenNotification(token, mac_address);
    } else {
      throw 'Must use physical device for Push Notifications';
    }
  }
}

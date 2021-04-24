import gql from 'graphql-tag';
import graphqlClientConfig from '../shared/graphql/graphqlClient';
import config from '../../config/index';
export default class DictionaryService {
  static async listDictionary(type) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query GetDictionary($type: String) {
          dictionary(where: { type: { _eq: $type } }) {
            name
            id
            code
          }
        }
      `,
      variables: {
        type: type,
      },
    });

    let responsejson = response.data.dictionary;

    return responsejson;
  }
  static async listI18n(value, type) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query MyQuery {
          dictionary_i18n {
            label
            language
            id
          }
        }
      `,
    });

    let responsejson = response.data.dictionary_i18n;

    return responsejson;
  }

  static async lisCrrency(value, type) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query MyQuery {
          dictionary(where: { type: { _eq: "CURRENCY" } }) {
            code
            extra_data
            name
          }
        }
      `,
    });

    let responsejson = response.data.dictionary;

    let data = responsejson.map((item, index) => {
      return { value: item.code, label: item.extra_data.symbol };
    });
    return data;
  }
  static async listAutocompleteDictionary(value, type) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query GetDictionaryAutocomplete($type: String, $value: String) {
          dictionary(where: { type: { _eq: $type }, name: { _like: $value } }) {
            name
            code
            id
          }
        }
      `,
      variables: {
        type: type,
        value: '%' + value + '%',
      },
    });

    let responsejson = response.data.dictionary;
    let data = responsejson.map((item, index) => {
      return { id: item.id, label: item.name, code: item.code };
    });
    return data;
  }

  static async getIdI18n(value) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
      query MyQuery {
        dictionary_i18n(where: {label: {_like: "%${value}%"}}) {
          dictionary_id
          label
        }
      }
      
      `,
      variables: {
        type: type,
        value: '%' + value + '%',
      },
    });

    let responsejson = response.data.dictionary_i18n;
    let data = responsejson.map((item, index) => {
      return { id: item.dictionary_id, label: item.label };
    });
    return data;
  }
  static async listAutocompleteGeo(value) {
    const response = await fetch(`${config.backendApi}:4100/autocomplet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: value, lang: 'fr' }),
    });
    let data = await response.json();

    return data;
  }
  static async SaveGeo(value) {
    const response = await fetch(`${config.backendApi}:4101/saveGeocode`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ data: value }),
    });

    let res = await response.json();

    return res;
  }
}

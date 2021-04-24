import gql from 'graphql-tag';
import graphqlClientConfig from '../../modules/shared/graphql/graphqlClient';
import axios from 'axios';

import config from '../../config/index';
export default class CandidatService {
  static async MatchCount() {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        query test {
          feed_aggregate(
            where: {
              is_candidate_liked: { _eq: true }
              is_recruiter_liked: { _eq: true }
            }
          ) {
            aggregate {
              count
            }
          }
        }
      `,
    });

    let result = response.data.feed_aggregate.aggregate.count;

    return result;
  }
  static async InsertCandidatRole(data) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation MyMutation($user: users_set_input!) {
          update_users(where: {}, _set: $user) {
            affected_rows
          }
          insert_user_roles(objects: { role: "candidat" }) {
            affected_rows
          }
        }
      `,
      variables: data,
    });

    let result = response.data;

    return result;
  }

  static async updateProfile(data) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation MyMutation(
          $user: users_set_input!
          $candidat: candidat_profile_set_input!
        ) {
          update_users(where: {}, _set: $user) {
            affected_rows
          }
          update_candidat_profile(where: {}, _set: $candidat) {
            affected_rows
          }
        }
      `,
      variables: data,
    });

    let result = response.data;

    return result;
  }
  static async InsertCandidat(data) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation MyMutation(
          $data: [candidat_profile_insert_input!]!
          $preference: [preference_insert_input!]!
        ) {
          insert_candidat_profile(objects: $data) {
            affected_rows
          }
          insert_preference(objects: $preference) {
            affected_rows
          }
        }
      `,
      variables: data,
    });

    let result = response.data;

    return result;
  }
  static async listCandidatProfile(field) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
      query listFieldCandidat {
        candidat_profile{
          ${field}
        }
      }
      
      
      `,
    });

    let data = response.data.candidat_profile[0];

    return data;
  }

  static async listProfile(field) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query MyQuery {
          candidat_profile {
            bio
            work_years_number
            dictionary {
              name
              id
            }
            title
            skills
          }
        }
      `,
    });

    let data = response.data.candidat_profile[0];

    data.study_level = data.dictionary;
    delete data.dictionary;

    return data;
  }
  static async UpdateCandidatProfile(field, json) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
      mutation MyMutation($data: jsonb) {
        __typename
        update_candidat_profile(where: {}, _set: {${field}:$data}) {
          affected_rows
          returning {
            ${field}
          }
        }
      }
      
      
      `,
      variables: {
        data: json,
      },
    });

    let data = response.data.update_candidat_profile.returning;

    return data;
  }
  static async listPreferences(field) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
      query listFieldCandidat {
        preference{
          ${field}
        }
      }
      
      
      `,
    });

    let data = response.data.preference[0] ? response.data.preference[0] : [];
    return data;
  }

  static async listSettings(field) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query MyQuery {
          account_setting {
            messages
            newMatches
            languagei18n {
              label
              id
            }
          }
        }
      `,
    });

    let data = response.data.account_setting[0]
      ? response.data.account_setting[0]
      : [];
    return data;
  }

  static async UpdatePreferences(field, json, type) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation MyMutation($data: ${type ? type : 'jsonb'}) {
          __typename
          update_preference(where: {}, _set: {${field}:$data}) {
            affected_rows
            returning {
              ${field}
            }
          }
        }
      `,
      variables: {
        data: json,
      },
    });

    let data = response.data.update_preference.returning;

    return data;
  }

  static async UpdateSettings(field, params) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
      mutation MyMutation {
        update_account_setting(where: {}, _set: {${field}: ${params}}) {
          affected_rows
          returning {
             messages
                  newMatches
                  languagei18n {
                    label
                    id
                  }
          }
        }
      }
      
      `,
    });

    let data = response.data.update_account_setting.returning;

    return data;
  }

  static async listAutocompleteGeocode(query, limit) {
    var response = await axios.post('http://api.skiliks.net:4100/autocomplet', {
      input: `%${query}`,
      lang: 'fr',
    });
    let responsejson = response.data;
    let data = responsejson.map((item) => {
      return { id: item.id, label: item.name };
    });

    return data;
  }

  static async listAutocompleteDictionary(value, type) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query GetDictionaryAutocomplete($type: String, $value: String) {
          dictionary(
            where: { type: { _eq: $type }, name: { _like: $value } }
            order_by: { name: asc }
          ) {
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
      return { id: item.id, label: item.name };
    });
    return data;
  }

  static async listAutocompleteReference(value) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query GetReferenceAutocomplete($value: String) {
          ad(where: { uuid: { _like: $value } }) {
            uuid
          }
        }
      `,
      variables: {
        value: '%' + value + '%',
      },
    });

    let responsejson = response.data.ad;
    let data = responsejson.map((item, index) => {
      return { id: index, label: item.uuid };
    });
    return data;
  }

  static async listDictionary(type) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query GetDictionary($type: String, $value: String) {
          dictionary(where: { type: { _eq: $type } }) {
            name
            code
            id
          }
        }
      `,
      variables: {
        type: type,
      },
    });

    let responsejson = response.data.dictionary;
    let data = responsejson.map((item, index) => {
      return { id: item.id, label: item.name };
    });
    return data;
  }

  static async listfeeds_candidatId(type) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query MyQuery {
          feed(where: { is_candidate_liked: { _is_null: true } }) {
            ad_id
            id
            profile_id
            is_candidate_liked
            is_recruiter_liked
          }
          candidat_profile {
            id
            title
          }
          feed_aggregate(where: { is_candidate_liked: { _eq: true } }) {
            aggregate {
              count
            }
          }
        }
      `,
    });
    let responsejson = response.data;
    return responsejson;
  }

  static async detailfeedsAds(id) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
      query MyQuery {
        ad(where: {id: {_eq: ${id}}}) {
          id
          availability
          closed_at
          company_logo
          company_name
          contract_types
          created_at
          description
          enabled
          gender
          diploma {
            name
            id
          }
          languages
          localizations
          preferred_skills
          study_level
          required_skills
          recruiter_id
          title
          work_years_experience
        }
      }
      
      `,
    });

    let responsejson = response.data.ad[0];
    return responsejson;
  }

  static async OnSwiped(id, flag) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
      mutation {
        update_feed(where: {id: {_eq: ${id}}}, _set: {candidate_swiped_at: "now()", is_candidate_liked: ${flag}}) {
          affected_rows
        }
      }
      
      
      
      `,
    });

    let responsejson = response.data;
    return responsejson;
  }
}

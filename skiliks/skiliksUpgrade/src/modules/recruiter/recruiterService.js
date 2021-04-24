import gql from 'graphql-tag';
import graphqlClientConfig from '../shared/graphql/graphqlClient';
import axios from 'axios';

import config from '../../config/index';
export default class RecruiterService {
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
  static async InsertRecruiterRole(data) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation MyMutation($user: users_set_input!) {
          update_users(where: {}, _set: $user) {
            affected_rows
          }
          insert_user_roles(objects: { role: "recruiter" }) {
            affected_rows
          }
        }
      `,
      variables: data,
    });

    let result = response.data;

    return result;
  }

  static async listProfile(field) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query test {
          recruiter_profile {
            company_name
            title
          }
        }
      `,
    });
    console.log(response);
    let data = response.data.recruiter_profile[0];

    return data;
  }

  static async updateProfile(data) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation MyMutation(
          $user: users_set_input!
          $recruiter: recruiter_profile_set_input!
        ) {
          update_users(where: {}, _set: $user) {
            affected_rows
          }
          update_recruiter_profile(where: {}, _set: $recruiter) {
            affected_rows
          }
        }
      `,
      variables: data,
    });

    let result = response.data;

    return result;
  }

  static async InsertRecruiter(data) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation MyMutation($data: [recruiter_profile_insert_input!]!) {
          insert_recruiter_profile(objects: $data) {
            affected_rows
          }
        }
      `,
      variables: data,
    });

    let result = response.data;

    return result;
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

  static async listAds() {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query MyQuery {
          list_ads(where: { status_code: { _eq: "PUB" } }) {
            id
            title
            company_logo
            company_name
            count
          }
        }
      `,
    });

    let data = response.data.list_ads;

    return data;
  }

  static async listCandidatLike(ad_id) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
      query MyQuery {
        list_candidat_like_ad(where: {ad_id: {_eq: ${ad_id}}, _and: [{is_recruiter_liked: {_eq: true},is_candidate_liked: {_eq: true}}]}) {
          ad_id
          feed_id
          social_data
          candidat_id
          skills
          work_years_number
          title
          bio
          first_name
          last_name
          avatar_profile
          study_level
          id
          contract_types
          localizations
          languages
          user_id
          availability
          salary
          recruiter_id
        }
      }
      
     
      
      `,
    });

    let data = response.data.list_candidat_like_ad;

    return data;
  }

  static async OnSwipe(id, flag) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
      mutation {
        update_feed(where: {id: {_eq: ${id}}}, _set: {recruiter_swiped_at: "now()", is_recruiter_liked: ${flag}}) {
          affected_rows
        }
      }
      
      
      
      `,
    });

    let data = response.data.update_feed;
    console.log(data);
    return data;
  }
}

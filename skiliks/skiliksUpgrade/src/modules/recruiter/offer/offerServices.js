import gql from 'graphql-tag';
import graphqlClientConfig from '../../shared/graphql/graphqlClient';
import axios from 'axios';

export default class offersServices {
  static async updateOffer(id, data) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
      mutation MyMutation($data: ad_set_input!) {
        update_ad(where: {id: {_eq: ${id}}}, _set: $data) {
          affected_rows
        }
      }
      
      `,
      variables: { data: data },
    });
    let res = response.data.update_ad;
    return res;
  }

  static async createOffer(data) {
    console.log(data);
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation MyMutation($data: [ad_insert_input!]!) {
          insert_ad(objects: $data) {
            affected_rows
            returning {
              id
            }
          }
        }
      `,
      variables: { data: data },
    });
    console.log(response);
    let res = response.data.insert_ad.returning;

    return res;
  }

  static async listOffers(status) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`

      query MyQuery {
        list_ads(where: { status_code: { _eq: "${status}" } }) {
        
          status_id
            status_code
            closed_at
            company_logo
            company_name
            contract_types
            created_at
            description
            enabled
            gender
            languages
            id
            preferred_skills
            localizations
            published_at
            work_years_experience
            uuid
            updated_at
            title
            required_skills
            recruiter_id
            study_level{
              id
              name
            }
            availability
        
          }
       
        
      }
      `,
    });

    let result = response.data.list_ads;

    return result;
  }

  static async findOffer(id) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`

      query findAd {
        list_ads(where: {id: {_eq: ${id}}}) {
          status_id
          status_code
          closed_at
          company_logo
          company_name
          contract_types
          created_at
          description
          enabled
          gender
          languages
          id
          preferred_skills
          localizations
          published_at
          work_years_experience
          uuid
          updated_at
          title
          required_skills
          recruiter_id
          study_level
          availability
        }
      }      
      `,
    });
    let result = response.data.list_ads;

    return result;
  }
  static async candidat_like_ad(ad_id, limit) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
      query MyQuery {
        list_candidat_like_ad(${
          limit ? `limit:${limit},` : ''
        }where: {ad_id: {_eq: ${ad_id}},is_candidate_liked: {_eq: true}}) {
          ad_id
          availability
          bio
          contract_types
          first_name
          id
          languages
          last_name
          work_years_number
          user_id
          title
          study_level
          social_data
          skills
          salary
          recruiter_id
          localizations
          avatar_profile
          feed_id
          candidat_id
          is_recruiter_liked
          is_candidate_liked
        }
      }
      
      
      `,
    });

    let result = response.data.list_candidat_like_ad;

    return result;
  }

  static async change_status_ads(ad_id, status) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        mutation MyMutation {
          insert_ad_status(objects: { ad_id: ${ad_id}, status_code: "${status}" }) {
            affected_rows
          }
        }
      `,
    });

    return response;
  }
}

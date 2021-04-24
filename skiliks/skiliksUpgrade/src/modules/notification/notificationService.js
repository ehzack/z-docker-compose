import gql from 'graphql-tag';
import graphqlClientConfig from '../shared/graphql/graphqlClient';
import axios from 'axios';

import config from '../../config/index';
export default class CandidatService {
  static async listNotification(data) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        query MyQuery {
          notification {
            content
            created_at
            id
          }
        }
      `,
    });

    let result = response.data.notification;
    console.log('Data :', response.data.notification);

    return result;
  }
}

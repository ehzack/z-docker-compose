import gql from "graphql-tag";
import graphqlClientConfig from "../../modules/shared/graphql/graphqlClient";
import axios from "axios";

import config from "../../config/index";
export default class CandidatService {
  static async isRead(id) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
      mutation MyMutation {
        update_parentNotification(where: {id: {_eq: ${id}}}, _set: {isRead: true}) {
          affected_rows
        }
      }
      
      `,
    });

    return response;
  }

  static async getNotificationCount(id) {
    const response = await graphqlClientConfig.config().mutate({
      mutation: gql`
        query {
          parentNotification_aggregate(where: { isRead: { _eq: false } }) {
            aggregate {
              count
            }
          }
        }
      `,
    });

    return response.data.parentNotification_aggregate.aggregate.count;
  }
}

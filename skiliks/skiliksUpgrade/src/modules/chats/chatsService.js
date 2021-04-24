import gql from 'graphql-tag';
import graphqlClientConfig from '../shared/graphql/graphqlClient';
import axios from 'axios';
import config from '../../config/index';
import FunctionsItem from '../../view/shared/items/Functions';
export default class ChatsService {
  static async listchats() {
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query MyQuery {
          chats_last_msg(order_by: { created_at: desc }) {
            content
            sender_id
            recuiter
            recuiter_id
            read_at
            like_id
            created_at
            recuiter_avatar
            id
            recuiter_is_connected
          }
        }
      `,
    });

    let responsejson = response.data;

    return responsejson;
  }

  static async setSeenMsg(id) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
      mutation MyMutation {
        __typename
        update_message(where: {id: {_eq: ${id}}}, _set: {read_at: "now()"}) {
          affected_rows
        }
      }
      
      
      `,
    });

    let responsejson = response.data;
    return responsejson;
  }
  static async listMessages(id) {
    const response = await graphqlClientConfig.config().query({
      query: gql`
      query MyQuery {
        message(where: {chat_id: {_eq: ${id}}}, order_by: {created_at: desc}) {
          sender_id
          read_at
          id
          created_at
          content
          chat_id
        }
      }
      
      `,
    });

    let responsejson = response.data;

    return responsejson;
  }

  static async addMessage(id, content) {
    // var time = FunctionsItem.getTimeWithTimeZone(Date.now());

    const response = await graphqlClientConfig.config().query({
      query: gql`
      mutation MyMutation {
        __typename
        insert_message(objects: {chat_id: ${id}, content: "${content}"}) {
          affected_rows
          returning {
            sender_id
            read_at
            id
            created_at
            content
            chat_id
          }
        }
      }
      
      `,
    });

    let responsejson = response.data.insert_message.returning[0];

    return responsejson;
  }

  static async getLastChat() {
    // var time = FunctionsItem.getTimeWithTimeZone(Date.now());
    const response = await graphqlClientConfig.config().query({
      query: gql`
        query MyQuery {
          chat(limit: 1, order_by: { created_at: desc }) {
            recuiter_id
            like_id
            id
            created_at
            candidat_id
          }
        }
      `,
    });

    let responsejson = response.data.chat;

    return responsejson;
  }
}

import {
  ApolloClient,
  InMemoryCachen,
  split,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import config from "../../../config/index";
import { RetryLink } from "@apollo/client/link/retry";
import { getStore } from "../../store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "../../auth/authService";
import { WebSocketLink } from "@apollo/client/link/ws";
import actions from "../../auth/authActions";
//import {getLanguageCode} from 'i18n';
import { getMainDefinition } from "apollo-utilities";

export default class graphqlClientConfig {
  static getToken = async () => {
    var token = getStore().getState().auth.jwt_token;
    var refresh_token = getStore().getState().auth.refresh_token;
    var jwt_expired = getStore().getState().auth.jwt_expired;
    if (jwt_expired != null && jwt_expired < new Date().getTime() / 1000 - 10) {
      let credentials = await authService.refreshToken(refresh_token);

      token = credentials.jwt_token;
      refresh_token = credentials.refresh_token;

      await AsyncStorage.setItem("@RefreshToken:key", refresh_token);

      getStore().dispatch({
        type: actions.SAVE_TOKEN,
        payload: {
          refresh_token: credentials.refresh_token,
          jwt_token: credentials.jwt_token,
          jwt_expired: credentials.jwt_token_expires,
        },
      });
    }
    return token;
  };

  static config(standarRole = false) {
    const retryLink = new RetryLink({
      attempts: {
        max: 2,
      },
    });

    const authLink = setContext(async (_, { headers }) => {
      var token = await this.getToken();
      var userrole = null;
      try {
        userrole = getStore().getState().auth.currentUser.user_roles[0];
      } catch (er) {
        userrole = null;
      }

      console.log({
        headers: {
          ...headers,
          // 'x-hasura-admin-secret': 'skiliks2019',
          authorization: token ? `Bearer ${token}` : "",
          "X-Hasura-Role": standarRole
            ? "user"
            : userrole
            ? userrole.role
            : "user", //'Accept-Language': getLanguageCode(),
        },
      });
      return {
        headers: {
          ...headers,
          // 'x-hasura-admin-secret': 'skiliks2019',
          authorization: token ? `Bearer ${token}` : "",
          "X-Hasura-Role": standarRole
            ? "user"
            : userrole
            ? userrole.role
            : "user", //'Accept-Language': getLanguageCode(),
        },
      };
    });

    const httpLink = createHttpLink({
      uri: `${config.backendUrl}`,
    });
    const wsLink = new WebSocketLink({
      uri: `${config.webSocketLink}`,
      options: {
        lazy: true,
        reconnect: true,
        connectionParams: async () => {
          try {
            var userrole = getStore().getState().auth.currentUser.user_roles[0];
          } catch (er) {}
          const token = await this.getToken();
          return {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "X-Hasura-Role": standarRole
                ? "user"
                : userrole
                ? userrole.role
                : "user",
            },
          };
        },
      },
    });

    const defaultOptions = {
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    };

    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      authLink.concat(httpLink)
    );
    const graphqlClient = new ApolloClient({
      link: link,
      cache: new InMemoryCache({
        addTypename: false,
      }),
    });
    return graphqlClient;
  }
}

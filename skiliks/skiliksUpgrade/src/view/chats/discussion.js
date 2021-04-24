import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ViewMainStack from '../shared/styles/ViewMainStack';
import plateform from '../../../native-base-theme/variables/platform';
import { GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Mutation, compose, graphql, Subscription, Query } from 'react-apollo';
import { connect } from 'react-redux';
import selectors from '../../modules/chats/chatsSelectors.js';
import AuthSelectors from 'src/modules/auth/authSelectors';

import gql from 'graphql-tag';
import ChatsService from '../../modules/chats/chatsService';
import i18n from '../../i18n/index';
import EmptyData from 'assets/3DElements/emptyData.svg';

import MessageList from './MessageList.js';
const SUBSCRIBE_USER_CHATS_MESSAGES = gql`
  subscription MySubscription($id: Int) {
    message(where: { chat_id: { _eq: $id } }, order_by: { created_at: desc }) {
      chat_id
      sender_id
      read_at
      id
      created_at
      content
    }
  }
`;

const GET_MESSAGES = gql`
  query MyQuery($id: Int) {
    message(where: { chat_id: { _eq: $id } }, order_by: { created_at: desc }) {
      sender_id
      read_at
      id
      created_at
      content
      chat_id
    }
  }
`;
class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var { userId, discussion, currentUser, socket, Role } = this.props;
    return (
      <Query query={GET_MESSAGES} variables={{ id: discussion.id }}>
        {({ subscribeToMore, data, loading, error }) => {
          if (loading) return <View></View>;
          const { message } = data;

          return (
            <MessageList
              socket={socket}
              messages={message}
              discussion={discussion}
              userId={currentUser.id}
              role={Role}
              subscribeToNewMessages={(append) =>
                subscribeToMore({
                  document: SUBSCRIBE_USER_CHATS_MESSAGES,
                  variables: { id: discussion.id },
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessages = subscriptionData.data.message;
                    return append(newMessages);
                  },
                })
              }
            />
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => ({
  discussion: selectors.selectdiscussion(state),
  loading: selectors.selectLoading(state),
  currentUser: AuthSelectors.selectCurrentUser(state),
  socket: AuthSelectors.selectSocket(state),

  Role: AuthSelectors.selectRoles(state),
});

export default connect(mapStateToProps)(Discussion);

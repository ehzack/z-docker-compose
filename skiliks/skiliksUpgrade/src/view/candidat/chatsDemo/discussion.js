import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Thumbnail,
  Icon,
  Text,
  Title,
  ListItem,
  List,
  View,
} from 'native-base';
import gql from 'graphql-tag';

import { GiftedChat } from 'react-native-gifted-chat';
import material from '../../../../native-base-theme/variables/material';
import action from '../../../modules/chats/chatsActions';
import ChatsService from '../../../modules/chats/chatsService';
import { Mutation, compose, graphql, Subscription, Query } from 'react-apollo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from 'react-redux';

import { StyleSheet, KeyboardAvoidingView } from 'react-native';

import UploadFile from '../../../modules/shared/upload/upload';
import FunctionsItem from '../../shared/items/Functions';

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
    this.state = { isOnline: false, messages: props.messages };
  }

  findRole = (user_id, item) => {
    if (user_id != item.recuiter_id) return 'recuiter';

    return 'candidat';
  };
  componentDidMount() {
    var { socket, discussion, dispatch, userId } = this.props;

    this.setState({
      isOnline: discussion.recuiter_is_connected,
    });
  }

  back = () => {
    this.props.navigation.goBack();
  };

  render() {
    var { userId, discussion } = this.props;
    var { messages, isOnline } = this.state;
    var msgdate = new Date(isOnline);
    var id = discussion.id;
    var t = new Date();
    t.setSeconds(t.getSeconds() - 10);
    return (
      <Container>
        <Header style={{ backgroundColor: material.brandPrimary }}>
          <Left>
            <Button transparent onPress={this.back}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Thumbnail
                small
                source={{
                  uri: UploadFile.getPath(
                    discussion[`avatar_${this.findRole(userId, discussion)}`],
                  ),
                }}
              />
              <View>
                <Title style={{ marginLeft: 10 }}>
                  {discussion[`${this.findRole(userId, discussion)}`]
                    .first_name + ' '}
                  {discussion[`${this.findRole(userId, discussion)}`].last_name}
                </Title>
                {msgdate.toUTCString() > t.toUTCString() && (
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 9,
                        color: 'white',
                      }}
                    >
                      en ligne
                    </Text>
                    <View
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 100,
                        position: 'relative',
                        marginLeft: 10,
                        top: 4,
                        backgroundColor: 'green',
                      }}
                    ></View>
                  </View>
                )}
              </View>
            </View>
          </Body>
          <Right>
            <Button transparent>
              <Icon type="FontAwesome" name="video-camera" />
            </Button>
          </Right>
        </Header>
        <Query query={GET_MESSAGES} variables={{ id: id }}>
          {({ subscribeToMore, data, loading, error }) => {
            if (loading) return null;
            const { message } = data;
            return (
              <MessageList
                messages={message}
                discussion={discussion}
                userId={userId}
                subscribeToNewMessages={(append) =>
                  subscribeToMore({
                    document: SUBSCRIBE_USER_CHATS_MESSAGES,
                    variables: { id: id },
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
      </Container>
    );
  }
}

class MessageList extends Component {
  state = {
    messages: [],
    currentUser: null,
    displayUserProfile: false,
    // typing: false
  };

  componentWillMount() {
    const { messages } = this.props;
    this.append(messages);
    this.props.subscribeToNewMessages((newMessages) =>
      this.append(newMessages),
    );
  }

  append(newmsgs) {
    // const {messages} = this.props;
    this.setState({ messages: newmsgs });
  }

  onSend = async (M = []) => {
    let msg = M[0].text;
    var { discussion, dispatch, userId } = this.props;

    var { messages } = this.state;
    messages.unshift({
      sender_id: userId,
      read_at: null,
      id: 2,
      created_at: Date.now(),
      content: msg,
      chat_id: discussion.id,
    });
    this.setState({ messages: messages });

    var data = ChatsService.addMessage(discussion.id, msg);
  };

  renderFooter = (messages) => {
    var { userId, discussion } = this.props;

    return (
      <View style={styles.footerContainer}>
        {/* <Text style={styles.footerText}>is Typing ..</Text> */}
        {messages[0].read_at != null && messages[0].sender_id != userId && (
          <Text
            style={{
              fontSize: 14,
              color: '#aaa',
              marginLeft: 'auto',
            }}
          >
            Vu :{FunctionsItem.GetDateTime(messages[0].read_at)}
          </Text>
        )}
      </View>
    );
  };

  setUserTyping() {}

  render() {
    const { userId, discussion } = this.props;
    const { messages } = this.state;
    var FormatMsg = FunctionsItem.prepareMessage(messages, userId, discussion);
    console.log(messages);
    messages.map((item) => {
      if (item.sender_id != userId && item.read_at == null) {
        ChatsService.setSeenMsg(item.id);
      }
    });

    return (
      <KeyboardAvoidingView
        behavior={'padding'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <GiftedChat
          isAnimated
          inverted={true}
          renderUsernameOnMessage
          messages={FormatMsg}
          user={{
            _id: userId,
          }}
          onInputTextChanged={() => this.setUserTyping()}
          onSend={(messages) => this.onSend(messages)}
          renderChatFooter={() => this.renderFooter(messages)}
        />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  const userId = state.auth.currentUser.user_id;

  const { messages, discussion, errorMessage } = state.chats;

  return {
    messages,
    userId,
    discussion,
    errorMessage,
  };
};

export default connect(mapStateToProps)(Discussion);

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});

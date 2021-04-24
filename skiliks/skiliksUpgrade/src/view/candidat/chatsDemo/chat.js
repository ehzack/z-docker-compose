import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import gql from 'graphql-tag';

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Button,
  Text,
  View,
} from 'native-base';
import material from '../../../../native-base-theme/variables/material';
import { Mutation, compose, graphql, Subscription } from 'react-apollo';

import UploadFile from '../../../modules/shared/upload/upload';
import FunctionsItem from '../../shared/items/Functions';
import action from '../../../modules/chats/chatsActions';
import { connect } from 'react-redux';

const SUBSCRIBE_USER_CHATS = gql`
  subscription MySubscription {
    chats_last_msg(order_by: { created_at: desc }) {
      content
      sender_id
      recuiter
      recuiter_id
      read_at
      like_id
      created_at
      avatar_recuiter
      title
      recuiter_is_connected
      id
      candidat_id
      candidat
      avatar_candidat
    }
  }
`;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { interval: null, didmount: false };
  }

  handlePress(item) {
    var { dispatch } = this.props;
    var _interval = this.state.interval;
    clearInterval(_interval);
    this.setState({ interval: null });

    dispatch(action.DoListMessages(item));
  }

  findRole = (user_id, item) => {
    if (user_id != item.recuiter_id) return 'recuiter';

    return 'candidat';
  };

  render() {
    const { userId, chats } = this.props;
    var datahtml;
    var t = new Date();
    t.setSeconds(t.getSeconds() - 10);
    return (
      <Subscription subscription={SUBSCRIBE_USER_CHATS}>
        {({ data, loading }) => {
          if (loading) data = chats;

          datahtml = data.chats_last_msg.map((item, index) => {
            var msgdate = new Date(
              item[`${this.findRole(userId, item)}_is_connected`],
            );

            return (
              <ListItem
                key={index}
                avatar
                onPress={(e) => {
                  this.handlePress(item);
                }}
              >
                <Left>
                  <Thumbnail
                    style={{ height: 40, width: 40 }}
                    source={{
                      uri: UploadFile.getPath(
                        item[`avatar_${this.findRole(userId, item)}`],
                      ),
                    }}
                  />
                  {msgdate.toUTCString() > t.toUTCString() && (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: 'green',
                        position: 'absolute',
                        bottom: 1,
                        left: 32,
                        borderRadius: 25,
                      }}
                    ></View>
                  )}
                </Left>
                <Body>
                  <Text>
                    {item[`${this.findRole(userId, item)}`].first_name + ' '}
                    {item[`${this.findRole(userId, item)}`].last_name}
                  </Text>
                  <Text note>{item.content}</Text>
                </Body>
                <Right style={{ justifyContent: 'space-between' }}>
                  <Text note>{FunctionsItem.GetDateTime(item.created_at)}</Text>
                  {item.sender_id != userId && item.read_at == null && (
                    <View
                      style={{
                        width: 15,
                        height: 15,
                        backgroundColor: material.brandPrimary,
                        borderRadius: 25,
                      }}
                    ></View>
                  )}
                </Right>
              </ListItem>
            );
          });
          return (
            <Container>
              <Content>
                <List>{datahtml}</List>
              </Content>
            </Container>
          );
        }}
      </Subscription>
    );
  }
}

const mapStateToProps = (state) => {
  const userId = state.auth.currentUser.user_id;

  const { chats, errorMessage } = state.chats;

  return {
    chats,
    userId,
    errorMessage,
  };
};

export default connect()(Chat);

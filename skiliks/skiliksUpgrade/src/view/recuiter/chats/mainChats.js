import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ViewMainStack from '../../shared/styles/ViewMain';
import PageTitle from '../../shared/styles/PageTitle';
import { Mutation, compose, graphql, Subscription } from 'react-apollo';

import plateform from '../../../../native-base-theme/variables/platform';
import gql from 'graphql-tag';
import UploadFile from '../../../modules/shared/upload/upload';
import FunctionsItem from '../../shared/items/Functions';
import action from '../../../modules/chats/chatsActions';
import ItemShowImage from '../../shared/items/ItemShowImage';

import { connect } from 'react-redux';
import i18n from '../../../i18n/index';
import Logo from 'assets/3DElements/bubble.svg';
import NewMatches from 'src/view/chats/NewMatches';

import Chats from 'src/view/chats/chats';
import EmptyData from 'assets/3DElements/emptyData.svg';

const SUBSCRIBE_USER_CHATS = gql`
  subscription MySubscription {
    chats_last_msg(order_by: { created_at: desc }) {
      content
      sender_id
      candidat_id
      read_at
      like_id
      created_at
      candidat_avatar
      candidat_displayname
      id
      candidat_is_connected
    }
  }
`;

const SUBSCRIBE_USER_NEWMATCHES = gql`
  subscription MySubscription {
    chat_new_match(order_by: { created_at: desc }) {
      candidat_id
      like_id
      created_at
      candidat_avatar
      candidat_displayname
      id
      candidat_is_connected
    }
  }
`;
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    var { navigation } = this.props;
    this.props.navigation.addListener('willFocus', this.load);
  };

  load = () => {
    console.log('******************Back**********************');
  };

  render() {
    return (
      <ViewMainStack
        Title={i18n.t('user.candidat.chat.title')}
        Icon={
          <Logo
            width={plateform.normalize(60)}
            height={plateform.normalize(60)}
          />
        }
      >
        <View style={{ width: '100%' }}>
          <Subscription subscription={SUBSCRIBE_USER_NEWMATCHES}>
            {({ data, loading, error }) => {
              if (!!loading) {
                return (
                  <View>
                    <Text>Loading...</Text>
                  </View>
                );
              }

              var newData = data.chat_new_match.map((e) => ({
                client_id: e.candidat_id,
                like_id: e.like_id,
                created_at: e.created_at,
                client_avatar: e.candidat_avatar,
                id: e.id,
                client_is_connected: e.candidat_is_connected,
                client_displayname: e.candidat_displayname,
              }));

              return (
                <View style={{ width: '100%' }}>
                  <NewMatches payload={newData} />
                </View>
              );
            }}
          </Subscription>
          <View
            style={{
              width: '100%',
            }}
          />
          <Subscription subscription={SUBSCRIBE_USER_CHATS}>
            {({ data, loading, error }) => {
              console.log(data);
              if (loading) {
                return (
                  <View>
                    <Text>Loading...</Text>
                  </View>
                );
              }

              if (
                Array.isArray(data.chats_last_msg) &&
                data.chats_last_msg.length == 0
              ) {
                return (
                  <View
                    style={{
                      height: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{}}>
                      <EmptyData
                        width={plateform.normalize(250)}
                        height={plateform.normalize(250)}
                      />
                    </View>

                    <Text
                      style={{
                        fontFamily: 'CalibriBold',
                        fontSize: plateform.normalize(16),
                      }}
                    >
                      {i18n.t('user.notification.emptyData')}
                    </Text>
                  </View>
                );
              }

              var newData = data.chats_last_msg.map((e) => ({
                content: e.content,
                sender_id: e.sender_id,
                client_id: e.candidat_id,
                read_at: e.read_at,
                like_id: e.like_id,
                created_at: e.created_at,
                client_avatar: e.candidat_avatar,
                id: e.id,
                client_is_connected: e.candidat_is_connected,
                client_displayname: e.candidat_displayname,
              }));

              return (
                <View style={{ width: '100%' }}>
                  <Chats payload={newData} />
                </View>
              );
            }}
          </Subscription>
        </View>
      </ViewMainStack>
    );
  }
}

export default connect()(Chat);

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

import plateform from '../../../native-base-theme/variables/platform';
import gql from 'graphql-tag';

import action from 'src/modules/chats/chatsActions';
import ItemShowImage from 'src/view/shared/items/ItemShowImage';

import { connect } from 'react-redux';
import i18n from '../../i18n/index';
import Logo from 'assets/3DElements/bubble.svg';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePress(item) {
    var { dispatch } = this.props;

    dispatch(action.DoListMessages(item));
  }

  isOnline = () => (
    <View
      style={{
        width: plateform.normalize(16),
        height: plateform.normalize(16),
        borderRadius: 100,
        backgroundColor: plateform.brandInfo,
        borderWidth: 1.5,
        borderColor: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0,
      }}
    ></View>
  );

  unreadMsg = (item) => (
    <View
      style={{
        width: plateform.getRelativeWidth(12),
        height: plateform.getRelativeWidth(12),
        borderRadius: 100,
        backgroundColor: plateform.brandSuccess,
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: 'Calibri',
          fontSize: plateform.getRelativeWidth(11),
          textAlign: 'center',
          color: 'white',
        }}
      >
        {item}
      </Text>
    </View>
  );

  ChatItemRender = (item, index) => (
    <TouchableOpacity
      key={index}
      onPress={(e) => {
        this.handlePress(item);
      }}
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: plateform.getResponsiveHeight(8),
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(228, 228, 228, 0.6)',
      }}
    >
      <View style={{ flexDirection: 'row', width: '80%' }}>
        <View
          style={{
            width: plateform.getRelativeWidth(40),
            height: plateform.getRelativeWidth(40),
          }}
        >
          <ItemShowImage
            source={item.client_avatar}
            placeholder={require('../../../assets/icons/socials/anonyme.png')}
            style={{
              width: plateform.getRelativeWidth(40),
              height: plateform.getRelativeWidth(40),
              borderRadius: 100,
            }}
          />
          {item.client_is_connected && this.isOnline()}
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            marginLeft: plateform.getRelativeWidth(12),
          }}
        >
          <Text
            style={{
              fontSize: plateform.normalize(14),
              fontFamily: 'CalibriBold',
              color: 'black',
            }}
          >
            {item.client_displayname}
          </Text>
          <Text
            style={{
              fontSize: plateform.normalize(11),
              fontFamily: 'Calibri',
              color: '#999999',
            }}
          >
            {item.content}
          </Text>
        </View>
      </View>

      <View>
        <Image
          source={
            item.read_at
              ? require('../../../assets/icons/messaging/msg.png')
              : require('../../../assets/icons/messaging/BlueMsg.png')
          }
        />
      </View>
    </TouchableOpacity>
  );
  profileRender = (item, index) => {
    console.log(index);
    return (
      <View
        key={index}
        style={{
          width: plateform.getResponsiveWidth(16),
          alignItems: 'center',
          paddingLeft: plateform.getRelativeWidth(2),
          paddingRight: plateform.getRelativeWidth(2),
        }}
      >
        <View>
          <ItemShowImage
            source={item.client_avatar}
            placeholder={require('../../../assets/icons/socials/anonyme.png')}
            style={{
              width: plateform.normalize(40),
              height: plateform.normalize(40),
              borderRadius: 100,
            }}
          />
          {/* {!item.read_at && this.unreadMsg(item.unreadMsg)} */}

          {item.client_is_connected && this.isOnline()}
        </View>
        <Text
          style={{
            fontFamily: 'Calibri',
            textAlign: 'center',
            fontSize: plateform.normalize(13),
            paddingTop: plateform.getResponsiveHeight(1),
            paddingBottom: plateform.getResponsiveHeight(1),
          }}
        >
          {item.client_displayname}
        </Text>
      </View>
    );
  };
  render() {
    var { payload } = this.props;
    return (
      <View
        style={{ width: '100%', paddingTop: plateform.getResponsiveHeight(1) }}
      >
        <View style={{ width: '100%' }}>
          <Text
            style={{
              fontSize: plateform.normalize(16),
              fontFamily: 'Calibri',
            }}
          >
            {Array.isArray(payload) && payload.length > 0
              ? ''
              : i18n.t('user.candidat.chat.emptyChat')}
          </Text>
        </View>
        <SafeAreaView style={{}}>
          <FlatList
            data={payload}
            renderItem={({ item, index }) => this.ChatItemRender(item, index)}
            style={{
              paddingRight: plateform.getRelativeHeight(30),
            }}
          />
        </SafeAreaView>
      </View>
    );
  }
}

export default connect()(Chat);

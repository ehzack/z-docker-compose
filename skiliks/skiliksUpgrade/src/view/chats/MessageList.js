import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import ViewMainStack from '../shared/styles/ViewMainStack';
import plateform from '../../../native-base-theme/variables/platform';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import FunctionsItem from '../shared/items/Functions';
import UploadFile from 'src/modules/shared/upload/upload';
import ChatsService from 'src/modules/chats/chatsService';
import { LinearGradient } from 'expo-linear-gradient';
import i18n from 'i18n/index';
import ItemShowImage from 'view/shared/items/ItemShowImage';
import platform from '../../../native-base-theme/variables/platform';
import SendSVG from 'assets/icons/messaging/send.svg';
import TicksSVG from 'assets/icons/messaging/ticks.svg';
import { Audio } from 'expo-av';
import { Mutation, graphql, Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const SUBSCRIBE_USER_CHATS = gql`
  subscription MySubscription($id: Int) {
    chats_last_msg(
      order_by: { created_at: desc }
      where: { id: { _eq: $id } }
    ) {
      recuiter_is_connected
      candidat_is_connected
    }
  }
`;
export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.giftedChat = null;
    this.state = {
      messages: [],
      currentUser: null,
      displayUserProfile: false,
      text: '',
      height: 0,
      loading: true,
      isTyping: false,

      // typing: false
    };
  }
  handleChangeeText(data) {
    var { socket, discussion } = this.props;
    var sendTo = discussion.client_id;
    console.log(sendTo);
    this.setState({ text: data });
    if (!data) {
      socket.emit('stoptyping', { user_id: sendTo });
    } else {
      socket.emit('typing', { user_id: sendTo });
    }
  }
  componentDidMount() {
    const { messages, socket, discussion, userId } = this.props;
    this.append(messages);
    this.props.subscribeToNewMessages((newMessages) => {
      this.append(newMessages);
    });
    socket.on('typing', ({ sendItFrom }) => {
      console.log(' ****** Typing', sendItFrom);
      if (sendItFrom == userId) {
        this.setState({ isTyping: true });
      }
    });
    socket.on('stoptyping', ({ sendItFrom }) => {
      console.log(' ****** stoptyping', sendItFrom);

      if (sendItFrom == userId) {
        this.setState({ isTyping: false });
      }
    });
    this.setState({ loading: false });
  }

  append(newmsgs) {
    // const {messages} = this.props;error
    this.setState({ messages: newmsgs });
  }

  onSend = async (M = []) => {
    var { discussion, dispatch, userId } = this.props;
    var { text } = this.state;
    if (text != '') {
      var data = ChatsService.addMessage(discussion.id, text);
      var { messages } = this.state;
      messages.unshift({
        sender_id: userId,
        read_at: null,
        id: Math.random(),
        created_at: Date.now(),
        content: text,
        chat_id: discussion.id,
      });
      this.setState({ messages: messages, text: '' });
    }
  };

  renderFooter = (messages) => {
    var { userId, discussion } = this.props;
    return (
      <View style={styles.footerContainer}>
        {/* <Text style={styles.footerText}>is Typing ..</Text> */}
        {messages.length > 0 &&
          messages[0].read_at != null &&
          messages[0].sender_id != userId && (
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
        {this.state.isTyping && (
          <Text
            style={{
              textAlign: 'right',
              fontSize: 14,
              color: 'black',
              opacity: 0.6,
              fontFamily: 'Calibri',
            }}
          >
            {i18n.t('common.isTyping')}
          </Text>
        )}
      </View>
    );
  };

  setUserTyping() {}

  renderInputToolbar = (props) => {
    //Add the extra styles via containerStyle
    let { placeholder, onSend } = props;
    // console.log("InputToolBar***************");

    // console.log(
    //   plateform.getRelativeHeight(12),
    //   " : ",true
    //   plateform.getRelativeHeight(this.state.height)
    // );
    return (
      <View
        style={[
          {
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            padding: plateform.getRelativeWidth(12),
            height: plateform.getRelativeHeight(67),
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          },
          Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            },
            android: {
              shadowColor: 'rgb(78, 79, 114)',
              shadowOffset: {
                width: 50,
                height: 50,
              },
              shadowOpacity: 1,
              shadowRadius: 1,

              elevation: 4,
            },
          }),
        ]}
      >
        <View
          style={{
            backgroundColor: '#F6F8FB',
            borderRadius: 100,
            flexDirection: 'row',
            width: '70%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <TextInput
            multiline={true}
            value={this.state.text}
            underlineColorAndroid="transparent"
            style={{
              paddingLeft: plateform.getRelativeWidth(15),
              width: '90%',
              height: '100%',
              fontSize: plateform.normalize(16),
              fontFamily: 'Calibri',
              color: 'black',
            }}
            placeholder={i18n.t('user.candidat.chat.message')}
            onChangeText={(text) => {
              this.handleChangeeText(text);
            }}
            onContentSizeChange={(event) => {
              this.setState({ height: event.nativeEvent.contentSize.height });
            }}
          />
        </View>
        <TouchableOpacity
          disabled={this.state.text == ''}
          onPress={() => (this.state.text != '' ? this.onSend() : '')}
          style={{
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '25%',
            backgroundColor:
              this.state.text != '' ? platform.brandPrimary : '#D3D3D3',
            borderRadius: 25,
            alignItems: 'center',
            paddingLeft: '2%',
            paddingRight: '2%',
          }}
        >
          <SendSVG
            style={{
              width: plateform.normalize(12),
              height: plateform.normalize(12),
            }}
          />
          <Text
            style={{
              fontFamily: 'Calibri',
              color: 'white',
              fontSize: plateform.normalize(12),
            }}
          >
            {i18n.t('common.send')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  isOnline = () => (
    <View
      style={{
        width: plateform.getRelativeWidth(15),
        height: plateform.getRelativeWidth(15),
        borderRadius: 100,
        backgroundColor: plateform.brandInfo,
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0,
      }}
    ></View>
  );

  renderCostumMessage = (data, index) => {
    let message = data.currentMessage;
    const { userId } = this.props;
    var { discussion } = this.props;
    if (message.user._id == userId) {
      return (
        <View
          key={index}
          style={{
            alignItems: 'flex-end',
            paddingLeft: plateform.getResponsiveWidth(5),
            paddingRight: plateform.getResponsiveWidth(5),
            paddingTop: plateform.getResponsiveHeight(1),
            paddingBottom: plateform.getResponsiveHeight(1),
          }}
        >
          <View style={{ width: plateform.getResponsiveWidth(65) }}>
            <LinearGradient
              colors={['#2DC9EB', '#14D2B8']}
              start={[0, 1]}
              end={[0.9, 0]}
              style={{
                width: '100%',
                borderTopRightRadius: 20,

                borderBottomLeftRadius: 20,
                borderTopLeftRadius: 20,

                padding: plateform.normalize(14),
                shadowColor: 'black',
                shadowOffset: {
                  width: 0,
                  height: 15,
                },

                elevation: 5,
              }}
            >
              <Text
                style={{
                  fontSize: plateform.normalize(16),
                  fontFamily: 'Calibri',
                  color: 'white',
                }}
              >
                {message.text}
              </Text>
            </LinearGradient>

            <View
              style={{
                width: '100%',
                padding: plateform.normalize(6),
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'Calibri',
                  fontSize: plateform.normalize(12),
                  opacity: 0.7,
                }}
              >
                {FunctionsItem.GetDateTime(message.createdAt)}
              </Text>
              {message.read_at && (
                <View
                  style={{
                    paddingLeft: plateform.getResponsiveWidth(1),
                    paddingRight: plateform.getResponsiveWidth(1),
                    opacity: 0.8,
                  }}
                >
                  <TicksSVG
                    width={plateform.normalize(14)}
                    height={plateform.normalize(14)}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View
          key={index}
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            paddingLeft: plateform.getResponsiveWidth(5),
            paddingRight: plateform.getResponsiveWidth(5),
            paddingTop: plateform.getResponsiveHeight(1),
            paddingBottom: plateform.getResponsiveHeight(1),
            flexDirection: 'column',
          }}
        >
          <LinearGradient
            colors={['#645AFF', '#A573FF']}
            start={[0, 1]}
            end={[0, 0]}
            style={{
              width: plateform.getResponsiveWidth(65),
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              borderTopLeftRadius: 20,

              padding: plateform.normalize(14),
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 15,
              },

              elevation: 5,
            }}
          >
            <Text
              style={{
                fontSize: plateform.normalize(16),
                fontFamily: 'Calibri',
                color: 'white',
              }}
            >
              {message.text}
            </Text>
          </LinearGradient>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            <Text
              style={{
                textAlign: 'left',
                fontFamily: 'Calibri',
                fontSize: plateform.normalize(12),
                opacity: 0.7,
              }}
            >
              {FunctionsItem.GetDateTime(message.createdAt)}
            </Text>
          </View>
        </View>
      );
    }
  };

  render() {
    const { userId, discussion, role } = this.props;

    const { messages, loading } = this.state;
    if (loading)
      return (
        <View>
          <Text>Loading ....</Text>
        </View>
      );
    var FormatMsg = FunctionsItem.prepareMessage(messages, userId, discussion);
    messages.map((item) => {
      if (item.sender_id != userId && item.read_at == null) {
        ChatsService.setSeenMsg(item.id);
      }
    });

    return (
      <Subscription
        subscription={SUBSCRIBE_USER_CHATS}
        variables={{ id: discussion.id }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <View></View>;
          }
          var is_connected = false;
          if (data.chats_last_msg.length > 0) {
            if (role == 'recruiter') {
              is_connected = data.chats_last_msg[0].candidat_is_connected;
            } else {
              is_connected = data.chats_last_msg[0].recuiter_is_connected;
            }
          }
          return (
            <ViewMainStack
              Title={discussion.client_displayname}
              secondTitle={!!is_connected ? 'Online' : ''}
            >
              <GiftedChat
                ref={this.giftedChat}
                isAnimated
                inverted={true}
                renderUsernameOnMessage
                messages={FormatMsg}
                user={{
                  _id: userId,
                }}
                // onInputTextChanged={() => this.setUserTyping()}
                onSend={(messages) => this.onSend(messages)}
                renderChatFooter={() => this.renderFooter(messages)}
                renderInputToolbar={this.renderInputToolbar}
                minInputToolbarHeight={plateform.getRelativeHeight(67)}
                renderMessage={(data, index) =>
                  this.renderCostumMessage(data, index)
                }
              />
            </ViewMainStack>
          );
        }}
      </Subscription>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});

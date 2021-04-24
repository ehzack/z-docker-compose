import React, { Component } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import ViewMainStack from '../shared/styles/ViewMain';
import PageTitle from '../shared/styles/PageTitle';

import plateform from '../../../native-base-theme/variables/platform';
import i18n from '../../i18n/index';
import Action from '../../modules/notification/notificationActions';
import selectors from '../../modules/notification/notificationSelectors';
import { connect } from 'react-redux';
import Functions from '../../modules/shared/processing/Functions';
import { Mutation, compose, graphql, Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import Logo from 'assets/3DElements/mail.svg';
import EmptyData from 'assets/3DElements/emptyData.svg';

const SUBSCRIBE_USER_NOTIFICATIONS = gql`
  subscription get_notification {
    notification(order_by: { created_at: desc }) {
      content
      created_at
      id
    }
  }
`;

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // componentDidMount() {
  //   var { dispatch } = this.props;
  //   dispatch(Action.DoListNotifications());
  // }

  newRender = (item, id) => {
    return (
      <View
        key={id}
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: plateform.getResponsiveHeight(2),
          paddingBottom: plateform.getResponsiveHeight(2),
        }}
      >
        <View
          style={{
            width: plateform.normalize(35),
            height: plateform.normalize(35),
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            borderWidth: 2,
            borderColor: 'rgba(	112, 65, 238,0.42)',
          }}
        >
          <Image
            source={require('../../../assets/icons/popular/BlueLike.png')}
          />
          {item.see && (
            <View
              style={{
                width: plateform.circleSize(35),
                height: plateform.circleSize(35),
                borderRadius: 100,
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: plateform.brandSuccess,
              }}
            ></View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            marginLeft: plateform.getRelativeWidth(15),
          }}
        >
          <Text
            style={{
              fontSize: plateform.normalize(13),
              fontFamily: 'Calibri',
              color: 'black',
            }}
          >
            {item.content}
          </Text>
          <Text
            style={{
              fontSize: plateform.normalize(11),
              fontFamily: 'Calibri',
              color: '#7041EE',
              opacity: 0.7,
            }}
          >
            {Functions.isToday(new Date(item.created_at))
              ? Functions.GetDateTime(new Date(item.created_at))
              : Functions.GetDateTime(new Date(item.created_at))}
          </Text>
        </View>
      </View>
    );
  };

  isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };
  render() {
    return (
      <ViewMainStack
        Title={i18n.t('user.candidat.news.title')}
        Icon={
          <Logo
            width={plateform.normalize(60)}
            height={plateform.normalize(60)}
          />
        }
      >
        <View
          style={{
            width: '100%',
          }}
        >
          <Subscription subscription={SUBSCRIBE_USER_NOTIFICATIONS}>
            {({ data, loading, error }) => {
              if (loading) {
                return (
                  <ActivityIndicator
                    animating={true}
                    size="large"
                    color="rgba(228, 228, 228, 0.43)"
                  />
                );
              }

              let listNotification = data.notification;
              if (
                Array.isArray(listNotification) &&
                listNotification.length == 0
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
              return (
                <View style={{}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '100%',
                      paddingBottom: plateform.getResponsiveHeight(2),
                    }}
                  >
                    <View
                      style={{
                        paddingTop: plateform.getResponsiveHeight(2),
                        paddingBottom: plateform.getResponsiveHeight(2),
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'CalibriBold',
                          fontSize: plateform.normalize(16),
                        }}
                      >
                        {Array.isArray(listNotification) &&
                        listNotification.length > 0
                          ? i18n.t('user.candidat.news.today')
                          : 'aucune donnée à afficher pour le moment'}
                      </Text>
                    </View>
                    <View>
                      {listNotification
                        .filter((item) =>
                          Functions.isToday(new Date(item.created_at)),
                        )
                        .map((e, index) => this.newRender(e, index))}
                    </View>
                  </View>

                  <View
                    style={{ width: '100%', borderTopWidth: 1, opacity: 0.1 }}
                  />
                  {Array.isArray(listNotification) &&
                    listNotification.length > 0 && (
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '100%',
                          paddingTop: plateform.getResponsiveHeight(2),
                          paddingBottom: plateform.getResponsiveHeight(2),
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: 'CalibriBold',
                            fontSize: plateform.normalize(16),
                          }}
                        >
                          {i18n.t('user.candidat.news.earlie')}
                        </Text>
                        {listNotification
                          .filter(
                            (item) =>
                              !Functions.isToday(new Date(item.created_at)),
                          )
                          .map((e, index) => this.newRender(e, index))}
                      </View>
                    )}
                </View>
              );
            }}
          </Subscription>
        </View>
      </ViewMainStack>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: selectors.selectLoading(state),
  listNotification: selectors.selectListNotification(state),
});

export default connect(mapStateToProps)(Notification);

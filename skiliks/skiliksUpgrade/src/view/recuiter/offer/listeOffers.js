import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import CardOffer from './cardOffer';
import DetailOffer from './detailOffer';
import gql from 'graphql-tag';
import { Mutation, compose, graphql, Subscription, Query } from 'react-apollo';

import platform from '../../../../native-base-theme/variables/platform';
import services from '../../../modules/recruiter/offer/offerServices';
import i18n, { setLanguageCode, getLanguageCode } from 'i18n/index';
import EmptyData from 'assets/3DElements/emptyData.svg';

const SUBSCRIBE_OFFERS = gql`
  subscription MySubscription($status: String) {
    list_ads(where: { status_code: { _eq: $status } }) {
      status_id
      status_code
      closed_at
      company_logo
      company_name
      contract_types
      created_at
      description
      enabled
      gender
      languages
      id
      preferred_skills
      localizations
      published_at
      uuid
      updated_at
      title
      required_skills
      recruiter_id
      study_level
      availability
    }
  }
`;
export default class ListeOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      loading: false,
      statusShowIt: false,
      offerShowIt: 0,
    };
  }

  showDetail = (status, index) => {
    console.log(index);
    this.setState({ statusShowIt: status, offerShowIt: index });
  };
  render() {
    var { status, dispatch } = this.props;

    var { loading, offers, statusShowIt, offerShowIt } = this.state;

    return (
      <View
        style={{
          paddingTop: platform.getResponsiveHeight(2),
          paddingBottom: platform.getResponsiveHeight(2),
          backgroundColor: '#FAFBFD',
          height: '100%',
        }}
      >
        <Subscription
          subscription={SUBSCRIBE_OFFERS}
          variables={{ status: status }}
        >
          {({ data, loading, error }) => {
            console.log(error);
            if (loading) {
              return (
                <View
                  style={{
                    backgroundColor: 'transparent',
                  }}
                >
                  <ActivityIndicator
                    animating={true}
                    size="large"
                    color={platform.brandPrimary}
                  />
                </View>
              );
            }

            if (Array.isArray(data.list_ads) && data.list_ads.length > 0) {
              return data.list_ads.map((item, index) => (
                <CardOffer
                  key={index}
                  index={index}
                  item={item}
                  changeStatus={this.showDetail}
                  style={{ elevation: 1000, zIndex: offers.length - index }}
                  {...this.props}
                />
              ));
            } else {
              return (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <EmptyData
                    style={{
                      height: platform.normalize(200),
                      width: platform.normalize(200),
                      marginTop: platform.getResponsiveHeight(5),
                    }}
                  />

                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Calibri',
                      fontSize: platform.normalize(16),
                    }}
                  >
                    {i18n.t('user.recruiter.offer.common.emptyOffers')}
                  </Text>
                </View>
              );
            }
          }}
        </Subscription>
      </View>
    );
  }
}

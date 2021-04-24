import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import platfom from '../../../../native-base-theme/variables/platform';
import { LinearGradient } from 'expo-linear-gradient';
import platform from '../../../../native-base-theme/variables/platform';
import ItemShowImage from '../../shared/items/ItemShowImage';
import i18n, { setLanguageCode, getFlags } from '../../../i18n/index';
import ArrowRSVG from '../../../../assets/icons/navigation/arrowR.svg';
import ArrowLSVG from '../../../../assets/icons/navigation/arrowL.svg';
import Animated, { Easing, interpolate } from 'react-native-reanimated';
import OfferModel from 'src/modules/recruiter/offer/offerModel';

export default class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  itemLanguage = (items) => (
    <View
      style={{
        width: '100%',
        paddingTop: platfom.getResponsiveHeight(0.5),
        paddingBottom: platfom.getResponsiveHeight(0.5),
      }}
    >
      <View
        style={{
          height: platfom.getResponsiveHeight(6),

          backgroundColor: 'white',
          borderRadius: 25,
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.12)',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {items.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {item.code && (
                <View
                  style={{
                    paddingLeft: platfom.getResponsiveWidth(2),
                    paddingRight: platfom.getResponsiveWidth(2),
                  }}
                >
                  <Image source={getFlags(item.code.split('-')[0])} />
                </View>
              )}
              <Text
                style={{
                  fontFamily: 'CalibriBold',
                  fontSize: platfom.normalize(15),
                  color: 'black',
                }}
              >
                {item.label}
              </Text>
              {index != items.length - 1 && (
                <Text
                  style={{
                    fontFamily: 'CalibriBold',
                    fontSize: platfom.normalize(15),
                    color: 'black',
                  }}
                >
                  {' '}
                  |{' '}
                </Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
  item = (items, type) => (
    <View
      style={{
        width: '100%',
        paddingTop: platfom.getResponsiveHeight(0.5),
        paddingBottom: platfom.getResponsiveHeight(0.5),
      }}
    >
      <View
        style={{
          height: platfom.getResponsiveHeight(6),

          backgroundColor: 'white',
          borderRadius: 25,
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.12)',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {items.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: 'CalibriBold',
                  fontSize: platfom.normalize(15),
                  color: 'black',
                }}
              >
                {type == 'gender' &&
                  OfferModel.fields.gender.options[item.id].label}
                {(type != 'gender' && item.label) || item.name}
              </Text>
              {index != items.length - 1 && (
                <Text
                  style={{
                    fontFamily: 'CalibriBold',
                    fontSize: platfom.normalize(15),
                    color: 'black',
                  }}
                >
                  {' '}
                  |{' '}
                </Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
  render() {
    var { card } = this.props;
    console.log(card);
    if (!card) return <View></View>;
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'space-around',
        }}
      >
        <View>
          <View style={{}}>
            <Text
              style={{
                fontSize: platfom.normalize(12),
                color: 'black',
                opacity: 0.3,
              }}
            >
              {i18n.t('user.recruiter.offer.fields.languages')}
            </Text>
          </View>

          <View style={{}}>
            {card.languages ? this.itemLanguage(card.languages) : null}
          </View>
        </View>

        <View>
          <View style={{}}>
            <Text
              style={{
                fontSize: platfom.normalize(12),
                color: 'black',
                opacity: 0.3,
              }}
            >
              {i18n.t('user.recruiter.offer.fields.contract_types')}
            </Text>
          </View>

          <View style={{}}>
            {card.contract_types ? this.item(card.contract_types) : null}
          </View>
        </View>

        <View>
          <View style={{}}>
            <Text
              style={{
                fontSize: platfom.normalize(12),
                color: 'black',
                opacity: 0.3,
              }}
            >
              {i18n.t('user.recruiter.offer.fields.availability')}
            </Text>
          </View>

          <View style={{}}>
            {Array.isArray(card.availability) && this.item(card.availability)}
          </View>
        </View>

        <View>
          <View style={{}}>
            <Text
              style={{
                fontSize: platfom.normalize(12),
                color: 'black',
                opacity: 0.3,
              }}
            >
              {i18n.t('user.recruiter.offer.fields.gender')}
            </Text>
          </View>

          <View style={{}}>
            {Array.isArray(card.gender) && this.item(card.gender, 'gender')}
          </View>
        </View>
      </View>
    );
  }
}

import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import platfom from '../../../../native-base-theme/variables/platform';
import {
  PanGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';
import ItemShowImage from '../../shared/items/ItemShowImage';
import i18n, { setLanguageCode, getFlags } from '../../../i18n/index';
import ItemRateFormItem from '../../shared/items/ItemRateFormItem';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.translateY = new Animated.Value(platfom.deviceHeight);

    this.state = {
      translateYvalue: 0,
      started: false,
      offsetY: 0,
    };
  }
  componentDidMount() {
    Animated.timing(this.translateY, {
      toValue: platfom.deviceHeight * 0.05,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {});
  }

  evaluation = (item) => (
    <View
      style={{
        paddingTop: platfom.getRelativeHeight(5),
        paddingBottom: platfom.getRelativeHeight(5),
      }}
    >
      <View
        style={{
          width: platfom.getRelativeWidth(266),
          height: platfom.getRelativeHeight(46),
          backgroundColor: platfom.brandInfo,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: platfom.getRelativeWidth(22),
          paddingRight: platfom.getRelativeWidth(20),
          marginTop: platfom.getRelativeHeight(7),

          borderRadius: 25,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 9,
        }}
      >
        <Text
          style={{
            fontSize: platfom.getRelativeWidth(18),
            color: 'white',
            fontFamily: 'Calibri',
            textAlign: 'left',
          }}
        >
          {item.label}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          {Array.from(Array(5).keys()).map((e, index) => {
            if (item.rate > index) {
              return (
                <Image
                  source={require('../../../../assets/icons/popular/StarY.png')}
                />
              );
            }
            return (
              <Image
                source={require('../../../../assets/icons/popular/StarN.png')}
              />
            );
          })}
        </View>
      </View>
    </View>
  );

  languagesLabels = (item) => {
    return (
      <View
        style={{
          width: '100%',
          height: platfom.getResponsiveHeight(7),
          paddingTop: platfom.getResponsiveHeight(1),
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: platfom.getResponsiveWidth(5),
            paddingRight: platfom.getResponsiveWidth(5),
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 25,
          }}
        >
          <View
            style={{
              width: '40%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={getFlags(item.code.split('-')[0])} />
            <Text
              style={{
                marginLeft: platfom.getRelativeWidth(22),
                fontSize: platfom.getRelativeWidth(12),
                fontFamily: 'Calibri',
                color: 'black',
                textAlign: 'left',
              }}
            >
              {item.name || item.label}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {Array.from(Array(5).keys()).map((e, index) => {
              if (item.rate > index) {
                return (
                  <Image
                    source={require('../../../../assets/icons/popular/StarY.png')}
                    style={{ tintColor: '#FFCE67' }}
                    width={platfom.normalize(15)}
                    height={platfom.normalize(15)}
                  />
                );
              }
              return (
                <Image
                  source={require('../../../../assets/icons/popular/StarN.png')}
                  style={{ tintColor: '#E2E2E2' }}
                  width={platfom.normalize(15)}
                  height={platfom.normalize(15)}
                />
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  render() {
    var { card } = this.props;
    if (!card) return <View></View>;
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            borderRadius: 7,
          }}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                width: '45%',
                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: platfom.normalize(11),
                borderWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: 8,
              }}
            >
              <Image
                source={require('../../../../assets/icons/popular/Experience.png')}
                style={{
                  width: platfom.normalize(25),
                  height: platfom.normalize(18),
                }}
                resizeMode={'contain'} /* <= changed  */
              />
              <Text
                style={{
                  fontSize: platfom.normalize(16),
                  fontWeight: 'bold',
                  fontFamily: 'CalibriBold',
                  color: platfom.brandInfo,
                  textAlign: 'left',
                }}
              >
                {card.work_years_number}
              </Text>

              <Text
                style={{
                  fontSize: platfom.normalize(13),
                  color: '#999999',
                  fontFamily: 'Calibri',
                }}
              >
                Work Experience
              </Text>
            </View>
            <View
              style={{
                width: '45%',

                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: platfom.normalize(11),
                borderWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: 8,
              }}
            >
              <View style={{ paddingBottom: platfom.getResponsiveHeight(1) }}>
                <Image
                  source={require('../../../../assets/icons/popular/education.png')}
                  style={{
                    width: platfom.normalize(25),
                    height: platfom.normalize(18),
                  }}
                  resizeMode={'contain'} /* <= changed  */
                />
              </View>
              <Text
                style={{
                  fontSize: platfom.normalize(16),
                  fontWeight: 'bold',
                  fontFamily: 'CalibriBold',
                  color: platfom.brandInfo,
                  textAlign: 'left',
                }}
              >
                {card.study_level}
              </Text>

              <Text
                style={{
                  fontSize: platfom.normalize(13),
                  color: '#999999',
                  fontFamily: 'Calibri',
                }}
              >
                Education level
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ width: '100%', paddingTop: platfom.getResponsiveHeight(0) }}
        >
          {Array.isArray(card.languages) &&
            card.languages.map((e) => this.languagesLabels(e))}
        </View>
      </View>
    );
  }
}

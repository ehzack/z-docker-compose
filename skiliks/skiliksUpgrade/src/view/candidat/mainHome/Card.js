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
import i18n from 'i18n-js';
import ArrowRSVG from '../../../../assets/icons/navigation/arrowR.svg';
import ArrowLSVG from '../../../../assets/icons/navigation/arrowL.svg';
import Animated, { Easing, interpolate } from 'react-native-reanimated';
import Offer from './Offer';
import Detail from './Detail';
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      Transformation: new Animated.Value(0),
    };
  }

  item = (text) => (
    <View style={{ padding: platfom.normalize(4) }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: platfom.getRelativeWidth(18),
          paddingRight: platfom.getRelativeWidth(18),
          paddingTop: platfom.getRelativeHeight(5),
          paddingBottom: platfom.getRelativeHeight(5),
          borderColor: platfom.brandPrimary,
          borderWidth: 2,
          borderRadius: 25,
        }}
      >
        <Text
          style={{
            fontFamily: 'Calibri',
            fontSize: platfom.getRelativeWidth(18),
            color: 'black',
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
  changeStatus = (flag) => {
    if (!!flag) {
      Animated.timing(this.state.Transformation, {
        toValue: 1,
        duration: 500,
        easing: Easing.back(0.8),
      }).start(() => {
        this.setState({ showDetail: flag });
      });
    } else {
      Animated.timing(this.state.Transformation, {
        toValue: 0,
        duration: 500,
        easing: Easing.back(0.8),
      }).start(() => {
        this.setState({ showDetail: flag });
      });
    }
  };
  render() {
    var { card, HandlePress, index } = this.props;
    var { showDetail } = this.state;
    console.log('localization new : ', card.localizations);
    if (!card) {
      return <View></View>;
    }
    return (
      <View
        key={index}
        style={{
          width: '100%',
          height: platfom.getResponsiveHeight(74.5),
          backgroundColor: 'white',
          borderRadius: 25,
          paddingLeft: platform.getRelativeWidth(20),
          paddingRight: platform.getRelativeWidth(20),
          paddingTop: platfom.getRelativeHeight(10),
          paddingBottom: platfom.getRelativeHeight(10),
        }}
      >
        <View
          style={{
            width: platfom.getResponsiveWidth(10),
            height: platfom.getResponsiveHeight(15),
            position: 'absolute',
            right: -platfom.getResponsiveWidth(4),
            bottom: '40%',
            zIndex: 999999,

            backgroundColor: 'white',
            borderRadius: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.changeStatus(true);
            }}
            style={{
              width: '100%',
              height: '50%',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,

              backgroundColor: !showDetail ? platfom.brandInfo : 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {!!showDetail && (
              <ArrowLSVG style={{ transform: [{ rotate: '180deg' }] }} />
            )}
            {!showDetail && <ArrowRSVG />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.changeStatus(false);
            }}
            style={{
              width: '100%',
              height: '50%',
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',

              backgroundColor: !!showDetail ? platfom.brandInfo : 'white',
            }}
          >
            {!!showDetail && (
              <ArrowRSVG style={{ transform: [{ rotate: '180deg' }] }} />
            )}
            {!showDetail && <ArrowLSVG />}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',

            width: '100%',
            height: '20%',
            paddingTop: platfom.getResponsiveHeight(2),
          }}
        >
          <LinearGradient
            colors={['#645AFF', '#A573FF']}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={{
              width: platfom.normalize(70),
              height: platfom.normalize(70),
              borderRadius: 100,
              padding: platfom.getRelativeWidth(2),
            }}
          >
            <ItemShowImage
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 100,
              }}
              mode="company"
              source={card.company_logo}
            />
          </LinearGradient>
          <View
            style={{
              width: '100%',
              height: platfom.normalize(80),
              paddingLeft: platform.getRelativeWidth(20),
              paddingTop: platfom.getResponsiveHeight(2),
            }}
          >
            <Text
              style={{
                fontFamily: 'CalibriBold',
                fontSize: platfom.normalize(22),
                color: 'black',
              }}
            >
              {card.company_name}
            </Text>
            <Text
              style={{
                fontFamily: 'Calibri',
                fontSize: platfom.normalize(14),
                color: 'black',
              }}
            >
              {card.title}
            </Text>
            <Text
              style={{
                fontFamily: 'Calibri',
                fontSize: platfom.normalize(14),
                color: 'black',
                opacity: 0.5,
              }}
            >
              {Array.isArray(card.localizations) &&
              card.localizations.length > 0
                ? card.localizations[0].label
                : ''}
            </Text>
          </View>
        </View>
        {!showDetail && (
          <Animated.View
            style={{
              width: '100%',
              height: '72%',
              paddingLeft: platform.getResponsiveWidth(2),
              opacity: interpolate(this.state.Transformation, {
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              transform: [
                {
                  translateX: interpolate(this.state.Transformation, {
                    inputRange: [0, 1],
                    outputRange: [0, platform.getResponsiveWidth(20)],
                  }),
                },
              ],
            }}
          >
            <Offer card={card} />
          </Animated.View>
        )}

        {showDetail && (
          <Animated.View
            style={{
              width: '100%',
              height: '72%',
              paddingLeft: platform.getResponsiveWidth(2),

              opacity: interpolate(this.state.Transformation, {
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateX: interpolate(this.state.Transformation, {
                    inputRange: [0, 1],
                    outputRange: [-platform.getResponsiveWidth(100), 0],
                  }),
                },
              ],
            }}
          >
            <Detail card={card} />
          </Animated.View>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: platfom.normalize(10),
            width: '100%',
            alignItems: 'center',
          }}
        >
          <View style={{ padding: platfom.normalize(4) }}>
            <Animated.View
              style={{
                backgroundColor: !showDetail ? platfom.brandInfo : '#D5E2FF',
                width: this.state.Transformation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [platfom.getResponsiveWidth(7), 8],
                }),
                height: 8,
                borderRadius: 25,
              }}
            ></Animated.View>
          </View>
          <View style={{ padding: platfom.normalize(4) }}>
            <Animated.View
              style={{
                backgroundColor: !!showDetail ? platfom.brandInfo : '#D5E2FF',
                width: this.state.Transformation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [8, platform.getResponsiveWidth(7)],
                }),
                height: 8,
                borderRadius: 25,
              }}
            ></Animated.View>
          </View>
        </View>
      </View>
    );
  }
}

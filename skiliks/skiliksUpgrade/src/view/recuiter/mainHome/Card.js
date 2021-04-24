import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import platfom from '../../../../native-base-theme/variables/platform';
import ItemShowImage from '../../shared/items/ItemShowImage';
import Animated, { Easing, interpolate } from 'react-native-reanimated';
import ArrowLSVG from '../../../../assets/icons/navigation/arrowL.svg';
import ArrowRSVG from '../../../../assets/icons/navigation/arrowR.svg';
import { LinearGradient } from 'expo-linear-gradient';
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

  evaluation = (item, index) => (
    <View style={{ padding: platfom.getRelativeHeight(10) }} key={index}>
      <View
        style={{
          width: '100%',
          height: platfom.getRelativeHeight(46),
          backgroundColor: platfom.brandInfo,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: platfom.getRelativeWidth(22),
          paddingRight: platfom.getRelativeWidth(20),

          borderRadius: 25,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 3,
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
            if (item.rate >= index) {
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

    if (!card) return <View></View>;
    return (
      <View
        key={index}
        style={{
          width: '100%',
          backgroundColor: 'white',
          height: platfom.getResponsiveHeight(76),
          borderRadius: 25,
          paddingLeft: platfom.getRelativeWidth(22),
          paddingRight: platfom.getRelativeWidth(22),
          paddingTop: platfom.getRelativeHeight(10),
          paddingBottom: platfom.getRelativeHeight(10),
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            width: platfom.getResponsiveWidth(12),
            height: platfom.getResponsiveHeight(15),
            position: 'absolute',
            right: -platfom.getResponsiveWidth(4),
            bottom: '50%',
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
            width: '100%',
            height: '42%',
          }}
        >
          <ItemShowImage
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 13,
            }}
            source={card.avatar_profile}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: '10%',
            paddingTop: platfom.normalize(12),
          }}
        >
          <Text
            style={{
              fontFamily: 'CalibriBold',
              fontSize: platfom.normalize(22),
              color: 'black',
            }}
          >
            {card.first_name + ' ' + card.last_name}
          </Text>

          <Text
            style={{
              fontFamily: 'Calibri',
              fontSize: platfom.normalize(14),
              color: '#2C2929',
            }}
          >
            {card.title +
              ' - ' +
              (Array.isArray(card.localizations) &&
              card.localizations.length > 0
                ? card.localizations[0].label
                : '')}
          </Text>
        </View>
        {!showDetail && (
          <Animated.View
            style={{
              width: '100%',
              height: '40%',

              paddingTop: platfom.getResponsiveHeight(4),
              opacity: interpolate(this.state.Transformation, {
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              transform: [
                {
                  translateX: interpolate(this.state.Transformation, {
                    inputRange: [0, 1],
                    outputRange: [0, platfom.getResponsiveWidth(20)],
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
              height: '40%',
              paddingTop: platfom.getResponsiveHeight(0),
              opacity: interpolate(this.state.Transformation, {
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateX: interpolate(this.state.Transformation, {
                    inputRange: [0, 1],
                    outputRange: [-platfom.getResponsiveWidth(100), 0],
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
            width: '100%',
            paddingBottom: platfom.getResponsiveHeight(3),
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
                  outputRange: [8, platfom.getResponsiveWidth(7)],
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

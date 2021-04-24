import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Animated, { Easing, interpolate } from 'react-native-reanimated';
import { Text, View } from 'native-base';
import platform from '../../../native-base-theme/variables/platform';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import actions from '../../modules/auth/authActions';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Transformation: new Animated.Value(0),
      opacity: new Animated.Value(1),

      display: true,
    };
  }

  async componentDidMount() {
    var { dispatch } = this.props;
    const firstInstall = await AsyncStorage.getItem('@FirstInstall:key');
    if (firstInstall == 'FALSE') {
      dispatch(actions.doSigninFromAuthChange());
    } else {
      AsyncStorage.setItem('@FirstInstall:key', 'FALSE');
    }
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
    }).start(() => {
      this.SecondSlide();
    });
  }
  SecondSlide = () => {
    setTimeout(() => {
      Animated.timing(this.state.Transformation, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
      }).start(() => {
        setTimeout(() => {
          this.props.navigation.replace('OnBording');
        }, 500);
      });
    }, 500);
  };

  render() {
    if (!this.state.display) {
      return <View></View>;
    }
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <LinearGradient
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          // Background Linear Gradient
          colors={['#A573FF', '#645AFF']}
          start={[-0.2, -0.3]}
        >
          <Animated.Image
            source={require('../../../assets/Logo.png')}
            style={{
              opacity: this.state.opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              width: platform.normalize(90),
              resizeMode: 'contain',
              transform: [
                {
                  translateY: interpolate(this.state.Transformation, {
                    inputRange: [0, 1],
                    outputRange: [0, -platform.getResponsiveHeight(25)],
                  }),
                },
                {
                  scale: this.state.Transformation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.7],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              position: 'absolute',
            }}
          />
          <Animated.View
            style={{
              justifyContent: 'center',
              flex: 0.2,
              justifyContent: 'flex-end',
              opacity: this.state.Transformation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            }}
          >
            <Text
              style={{
                color: 'black',
                fontSize: platform.normalize(50),

                color: 'white',
                fontFamily: 'CalibriBold',
                //opacity: this.state.opacityText,
              }}
            >
              Skiliks
            </Text>
          </Animated.View>
          <View
            style={{
              position: 'absolute',
              bottom: platform.getResponsiveHeight(3),
            }}
          >
            <Text
              style={{
                color: 'black',
                fontSize: platform.normalize(14),

                color: 'white',
                fontFamily: 'Calibri',
              }}
            >
              @ Skiliks 2020
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { errorMessage } = state.auth;
  return {
    errorMessage,
  };
};

export default connect(mapStateToProps)(SplashScreen);

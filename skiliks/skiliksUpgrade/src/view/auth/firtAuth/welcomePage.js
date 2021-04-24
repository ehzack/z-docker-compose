import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import platform from '../../../../native-base-theme/variables/platform';
import i18n from '../../../i18n/index';
import ViewCloud from '../../shared/styles/ViewCloud';
import Logo from '../../../../assets/Logo.svg';
import ButtonLink from '../../shared/styles/ButtonLink';
import Animated, { Easing, interpolate } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const page = StyleSheet.create({
  containerLebel: {
    height: platform.getResponsiveHeight(6),

    position: 'absolute',
    top: platform.getResponsiveHeight(90),
    zIndex: 99999,
  },
  containerGradienRight: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: platform.getResponsiveWidth(5),
    paddingRight: platform.getResponsiveWidth(5),
  },
  containerGradienLeft: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: platform.getResponsiveWidth(5),
    paddingRight: platform.getResponsiveWidth(5),
  },
  Text: {
    color: 'white',
    fontFamily: 'Calibri',
    fontSize: platform.normalize(14),
  },
});

export default class welcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AnimationValue: new Animated.Value(0),
      loop: 1,
    };
  }
  componentDidMount() {
    this.SlideAnimation();
  }
  SlideAnimation = () => {
    Animated.timing(this.state.AnimationValue, {
      toValue: 100 * 4,
      duration: 3000,

      easing: Easing.back(0),
    }).start(() => {});
  };

  render() {
    return (
      <ViewCloud style={{ alignItems: 'center' }}>
        <Animated.View
          style={{
            alignItems: 'center',
            flex: 0.3,
            justifyContent: 'flex-end',
          }}
        >
          <Logo height={platform.getResponsiveHeight(15)} />
          <Text
            style={{
              fontFamily: 'CalibriBold',
              fontSize: platform.normalize(32),
              color: 'white',
            }}
          >
            Welcome
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            page.containerLebel,
            {
              right: platform.getResponsiveWidth(5),
              opacity: interpolate(this.state.AnimationValue, {
                inputRange: [0, 100, 400],
                outputRange: [0, 1, 1],
              }),
              transform: [
                {
                  translateY: interpolate(this.state.AnimationValue, {
                    inputRange: [0, 400],
                    outputRange: [0, -platform.getResponsiveWidth(80)],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#645AFF', '#A573FF']}
            start={[0.0, 0]}
            end={[1.5, 0]}
            style={page.containerGradienRight}
          >
            <Text style={page.Text}>
              I m Looking for a Marketer in Casablanca
            </Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={[
            page.containerLebel,
            {
              left: platform.getResponsiveWidth(5),
              opacity: interpolate(this.state.AnimationValue, {
                inputRange: [0, 100, 200],
                outputRange: [0, 0, 1],
              }),
              transform: [
                {
                  translateY: interpolate(this.state.AnimationValue, {
                    inputRange: [0, 100, 400],
                    outputRange: [0, 0, -platform.getResponsiveWidth(60)],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#645AFF', '#A573FF']}
            start={[0.0, 0]}
            end={[1.5, 0]}
            style={page.containerGradienLeft}
          >
            <Text style={page.Text}>
              I'm a Senior Marketer looking for a job
            </Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={[
            page.containerLebel,
            {
              right: platform.getResponsiveWidth(5),
              opacity: interpolate(this.state.AnimationValue, {
                inputRange: [0, 200, 300],
                outputRange: [0, 0, 1],
              }),
              transform: [
                {
                  translateY: interpolate(this.state.AnimationValue, {
                    inputRange: [0, 200, 400],
                    outputRange: [0, 0, -platform.getResponsiveWidth(40)],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#645AFF', '#A573FF']}
            start={[0.0, 0]}
            end={[1.5, 0]}
            style={page.containerGradienRight}
          >
            <Text style={page.Text}>
              Nice , i can see your expertise on skiliks
            </Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={[
            page.containerLebel,
            {
              left: platform.getResponsiveWidth(5),
              opacity: interpolate(this.state.AnimationValue, {
                inputRange: [0, 300, 400],
                outputRange: [0, 0, 1],
              }),
              transform: [
                {
                  translateY: interpolate(this.state.AnimationValue, {
                    inputRange: [0, 300, 400],
                    outputRange: [0, 0, -platform.getResponsiveWidth(20)],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#645AFF', '#A573FF']}
            start={[0.0, 0]}
            end={[1.5, 0]}
            style={page.containerGradienLeft}
          >
            <Text style={page.Text}>Lets Get started Then</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.Image
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            top: platform.getResponsiveHeight(30),
            width:
              platform.getResponsiveWidth(100) +
              platform.getResponsiveWidth(100),
            left: 0,

            height: platform.getResponsiveHeight(20),
            resizeMode: 'stretch',
            transform: [
              {
                translateX: interpolate(this.state.AnimationValue, {
                  inputRange: [0, 400],
                  outputRange: [0, -platform.getResponsiveWidth(50)],
                }),
              },
            ],
          }}
          source={require('../../../../assets/Cloud.png')}
        />
        <Animated.Image
          source={require('../../../../assets/ulistration1.png')}
          style={{
            width:
              platform.getResponsiveWidth(100) +
              platform.getResponsiveWidth(100),
            height: platform.getResponsiveHeight(40),
            position: 'absolute',
            left: 0,
            bottom: 0,
            transform: [
              {
                translateX: interpolate(this.state.AnimationValue, {
                  inputRange: [0, 400],
                  outputRange: [0, -platform.getResponsiveWidth(80)],
                }),
              },
            ],
          }}
        />
        <View
          style={{
            width: platform.getResponsiveWidth(80),
            position: 'absolute',
            bottom: platform.getResponsiveHeight(5),
            justifyContent: 'center',
            zIndex: 99999,
          }}
        >
          <ButtonLink
            bold
            handleSubmit={() => {
              this.props.navigation.navigate('LookingPage');
            }}
          >
            Build My Profile Now
          </ButtonLink>
        </View>
      </ViewCloud>
    );
  }
}

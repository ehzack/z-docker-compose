import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Text, Button, List, ListItem, Radio } from 'native-base';
import { Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  scrollInterpolators,
  animatedStyles,
} from '../../modules/shared/animation/animation';
import { NavigationActions } from 'react-navigation';

import Modal from 'react-native-modal';
import InputRadioButton from '../shared/items/InputRadioButton';
import { Reset } from '../../navigation/NavigationService';
import platform from '../../../native-base-theme/variables/platform';
import SelectI18n from '../shared/items/SelectI18n';
import NavigationService from '../../navigation/NavigationService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowLEFT from '../../../assets/icons/navigation/arrow-left.svg';
import ArrowRIGHT from '../../../assets/icons/navigation/arrow-right.svg';
import Logo from '../../../assets/Logo.svg';
import i18n from 'src/i18n/index';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const carouselItem = [
  require('../../../assets/onBording/screen1.png'),
  require('../../../assets/onBording/screen2.png'),
  require('../../../assets/onBording/screen3.png'),
];
export default class OnBording extends Component {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0, showModal: false, i18nTrigger: 0 };
  }

  toggleModal = (flag) => {
    this.setState({ showModal: flag });
  };
  toggleActiveSlide = (n) => {
    let activeSlide = this.state.activeSlide;
    if (activeSlide + n >= carouselItem.length) {
      NavigationService.Reset('AuthStack', 'SigninPage');
    }
    let a = (activeSlide + n) % carouselItem.length;
    this._carousel.snapToItem(a);
    this.setState({ activeSlide: a });
  };

  _renderItem = (item) => {
    return (
      <Image
        style={{
          resizeMode: 'contain',
          width: platform.getResponsiveWidth(100),
          height: platform.getResponsiveHeight(45),
        }}
        source={item.item}
      />
    );
  };

  get pagination() {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={carouselItem.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          width: platform.getResponsiveWidth(20),
          alignItems: 'flex-end',
        }}
        dotStyle={{
          width: (screenWidth * 5) / 100,
          height: (screenWidth * 5) / 100,
          borderRadius: 100,
          marginHorizontal: (screenWidth * 1.5) / 100,
          backgroundColor: '#14D2B8',
          borderWidth: (screenWidth * 1) / 100,
          borderColor: 'rgba(20, 210, 184,0.2)',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.2}
        inactiveDotScale={0.8}
      />
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            position: 'absolute',
            right: platform.getResponsiveWidth(5),
            top: platform.getResponsiveHeight(5),
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            onPress={() => NavigationService.Reset('AuthStack', 'SigninPage')}
          >
            <Text
              style={{
                color: 'black',
                fontSize: platform.getRelativeWidth(15),
                fontFamily: 'CalibriBold',
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingTop: platform.getResponsiveHeight(8),
          }}
        >
          <Logo
            width={platform.normalize(80)}
            height={platform.normalize(80)}
          />
        </View>
        <View
          style={{
            width: '100%',
          }}
        >
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={carouselItem}
            activeSlideOffset={5}
            renderItem={this._renderItem}
            scrollInterpolator={scrollInterpolators[`scrollInterpolator${1}`]}
            slideInterpolatedStyle={animatedStyles[`animatedStyles${4}`]}
            sliderWidth={platform.getResponsiveWidth(100)}
            itemWidth={platform.getResponsiveWidth(50)}
            slideStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
          />
        </View>

        <View
          style={{
            paddingLeft: platform.getResponsiveWidth(15),
            paddingRight: platform.getResponsiveWidth(15),
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: platform.normalize(16),
              fontWeight: 'normal',
              fontFamily: 'Calibri',
            }}
          >
            {i18n.t('welcome.onBording')[this.state.activeSlide]}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingRight: platform.getResponsiveWidth(5),
            paddingLeft: platform.getResponsiveWidth(5),
            height: platform.getResponsiveHeight(4),
          }}
        >
          <Button
            style={{
              width: platform.getResponsiveWidth(15),
              height: '100%',
              backgroundColor:
                this.state.activeSlide == 0 ? '#7041EE' : '#DADADA',
              borderRadius: 50,
              left: 0,
              opacity: this.state.activeSlide == 0 ? 0 : 1,
            }}
            onPress={() => this.toggleActiveSlide(-1)}
            block
            disabled={this.state.activeSlide == 0 ? true : false}
          >
            <ArrowLEFT
              width={platform.getRelativeWidth(48)}
              height={platform.getRelativeHeight(18)}
            />
          </Button>
          <View style={{}}>{this.pagination}</View>
          <Button
            style={{
              width: platform.getResponsiveWidth(15),
              height: '100%',

              backgroundColor: '#7041EE',
              borderRadius: 50,
            }}
            onPress={() => this.toggleActiveSlide(1)}
            block
          >
            <ArrowRIGHT
              width={platform.getRelativeWidth(48)}
              height={platform.getRelativeHeight(18)}
            />
          </Button>
        </View>

        <SelectI18n trigger={() => this.setState({ i18nTrigger: 1 })} />
      </View>
    );
  }
}

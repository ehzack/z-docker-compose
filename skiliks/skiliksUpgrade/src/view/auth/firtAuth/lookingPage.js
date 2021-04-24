import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ViewWrapper from 'src/view/shared/styles/ViewSimple';
import platform from '../../../../native-base-theme/variables/platform';
import NavigationService from '../../../navigation/NavigationService';
import ButtonLink from '../../shared/styles/ButtonLink';
import i18n from '../../../i18n/index';
import Logo from 'assets/Logo.svg';
import SearchSvg from 'assets/3DElements/search.svg';
import MegaphoneSvg from 'assets/3DElements/megaphone.svg';
import Animated, { Easing, interpolate } from 'react-native-reanimated';

const Page = StyleSheet.create({
  cardContainerPadding: {
    paddingBottom: platform.getResponsiveHeight(3),
  },
  cardContainer: {
    width: '100%',
    height: platform.getResponsiveHeight(25),
    paddingTop: platform.getResponsiveHeight(3),
    paddingBottom: platform.getResponsiveHeight(3),
    paddingLeft: platform.getResponsiveWidth(5),
    paddingRight: platform.getResponsiveWidth(5),
    borderRadius: 10,

    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: '#000',

    elevation: 22,
  },
  Text1: {
    color: '#999999',
    fontFamily: 'Calibri',
    fontSize: platform.normalize(14),
    textAlign: 'left',
  },
  Text2: {
    color: 'black',
    fontFamily: 'CalibriBold',
    fontSize: platform.normalize(22),
  },

  Text3: {
    color: 'black',
    fontFamily: 'Calibri',
    fontSize: platform.normalize(11),
    opacity: 0.6,
  },
});
export default class LookingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ViewWrapper style={{ justifyContent: 'space-around' }}>
        <Logo height={platform.getResponsiveHeight(15)} />

        <View>
          <View style={Page.cardContainerPadding}>
            <TouchableOpacity
              style={Page.cardContainer}
              onPress={() =>
                NavigationService.NavigateToNested(
                  'RecruiterStack',
                  'SetupProfile',
                )
              }
            >
              <View
                style={{
                  width: '50%',
                  height: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={Page.Text1}> {i18n.t('welcome.lookingFor')}</Text>
                <Text style={Page.Text2}>
                  {i18n.t('welcome.lookingForProfile')}
                </Text>
                <Text style={Page.Text3}>
                  Search profiles by Skilles and match with the ones that
                  intrests you the most.
                </Text>
              </View>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('assets/3DElements/loupe.png')}
                  style={{ width: '100%', resizeMode: 'contain' }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={Page.cardContainerPadding}>
            <TouchableOpacity
              style={Page.cardContainer}
              onPress={() =>
                NavigationService.NavigateToNested(
                  'CandidatStack',
                  'SetupProfile',
                )
              }
            >
              <View
                style={{
                  width: '50%',
                  height: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={Page.Text1}> {i18n.t('welcome.lookingFor')}</Text>
                <Text style={Page.Text2}>
                  {i18n.t('welcome.lookingForJob')}
                </Text>
                <Text style={Page.Text3}>
                  Search profiles by Skilles and match with the ones that
                  intrests you the most.
                </Text>
              </View>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('assets/3DElements/megaphone.png')}
                  style={{ width: '100%', resizeMode: 'contain' }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            fontFamily: 'Calibri',
            fontSize: platform.normalize(17),
            color: 'black',
            textAlign: 'center',
          }}
        >
          {i18n.t('welcome.youcanChangeIt')}
        </Text>
      </ViewWrapper>
    );
  }
}

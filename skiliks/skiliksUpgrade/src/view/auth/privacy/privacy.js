import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ViewMain from '../../shared/styles/ViewMain';
import PrivacySVG from '../../../../assets/3DElements/privacy.svg';
import platform from '../../../../native-base-theme/variables/platform';
import ButtonLink from '../../shared/styles/ButtonLink';
import i18n from 'src/i18n/index';

const page = StyleSheet.create({
  containerText: {
    paddingTop: platform.getResponsiveHeight(2),
    paddingBottom: platform.getResponsiveHeight(2),
  },
  text: {
    fontFamily: 'Calibri',
    fontSize: platform.normalize(18),
    textAlign: 'center',
    color: '#999999',
  },
});

export default class PrivacyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let Privacy = i18n.t('user.privacy.items');

    return (
      <ViewMain
        Icon={<PrivacySVG width={platform.getRelativeWidth(100)} />}
        Title={'Privacy Policy'}
      >
        {Privacy.map((e) => (
          <View style={page.containerText}>
            <Text style={page.text}>{e.text}</Text>
          </View>
        ))}
      </ViewMain>
    );
  }
}

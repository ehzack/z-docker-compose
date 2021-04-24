import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Pulse from 'react-native-pulse';
import platfom from '../../../../native-base-theme/variables/platform';
import { connect } from 'react-redux';
import selectors from '../../../modules/auth/authSelectors';
import File from '../../../modules/shared/upload/upload';
import ItemShowImage from '../../shared/items/ItemShowImage';
import i18n from '../../../i18n/index';
import Logo from 'assets/Logo.svg';

class PulseMain extends Component {
  setView = () => {
    console.log('Waaaahaa');
    this.props.setView(1);
  };
  render() {
    var { AvatarProfile } = this.props;
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: platfom.getResponsiveHeight(10),
          paddingBottom: platfom.getResponsiveHeight(10),
        }}
      >
        <Logo />

        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pulse
            color={'white'}
            numPulses={15}
            diameter={platfom.getResponsiveWidth(100)}
            speed={10}
            style={{
              opacity: 0.1,
            }}
            duration={500}
          />
          <ItemShowImage
            source={AvatarProfile}
            style={{
              width: platfom.getRelativeWidth(87),
              height: platfom.getRelativeWidth(87),
              borderRadius: 100,
              borderWidth: 2,
              borderColor: platfom.brandPrimary,
            }}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Calibri',
            color: 'white',
            fontSize: platfom.normalize(16),
          }}
        >
          {i18n.t('welcome.lookingForJobarea')}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: selectors.selectLoading(state),
  AvatarProfile: selectors.selectAvatar(state),
});

export default connect(mapStateToProps)(PulseMain);

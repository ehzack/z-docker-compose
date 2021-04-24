import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LogoSvg from 'assets/Logo.svg';
import platfom from '../../../../native-base-theme/variables/platform';
import { connect } from 'react-redux';
import selectors from '../../../modules/auth/authSelectors';
import Pulse from 'react-native-pulse';
import ItemShowImage from '../../shared/items/ItemShowImage';
import i18n, { setLanguageCode, getLanguageCode } from 'i18n/index';

class EmptyData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var { AvatarProfile } = this.props;

    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',

          paddingTop: platfom.getResponsiveHeight(15),
          paddingBottom: platfom.getResponsiveHeight(20),
          paddingRight: platfom.getResponsiveWidth(15),
          paddingLeft: platfom.getResponsiveWidth(15),
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <LogoSvg
            width={platfom.normalize(72)}
            height={platfom.normalize(72)}
          />
          <View>
            <View
              style={{
                justifyContent: 'center',
              }}
            >
              <Pulse
                color={'rgba(112,65,238,0.9)'}
                numPulses={20}
                diameter={platfom.getResponsiveWidth(60)}
                speed={10}
                style={{
                  opacity: 0.1,
                }}
                duration={500}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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
            </View>
            <View
              style={{
                width: '100%',
                paddingTop: platfom.getResponsiveHeight(8),
                paddingBottom: platfom.getRelativeHeight(3),
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Calibri',
                  fontSize: platfom.normalize(16),
                }}
              >
                {i18n.t('user.recruiter.offer.common.emptyMatch')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: selectors.selectLoading(state),
  AvatarProfile: selectors.selectAvatar(state),
});

export default connect(mapStateToProps)(EmptyData);

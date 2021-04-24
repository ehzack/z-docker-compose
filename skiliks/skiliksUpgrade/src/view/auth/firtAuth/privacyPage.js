import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ViewMain from '../../shared/styles/ViewMain';
import PrivacySVG from '../../../../assets/3DElements/privacy.svg';
import platform from '../../../../native-base-theme/variables/platform';
import ButtonLink from '../../shared/styles/ButtonLink';
import Actions from 'src/modules/auth/authActions';
import { connect } from 'react-redux';
import i18n from 'i18n/index';
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

class PrivacyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  Logout = () => {
    var { dispatch } = this.props;
    dispatch(Actions.doSignout());
  };

  render() {
    let Privacy = i18n.t('user.privacy.items');
    return (
      <ViewMain
        Icon={<PrivacySVG width={platform.getRelativeWidth(100)} />}
        Title={'Privacy Policy'}
        NavigateTo={() => this.Logout()}
      >
        {Privacy.map((e) => (
          <View style={page.containerText}>
            <Text style={page.text}>{e.text}</Text>
          </View>
        ))}

        <View style={[page.containerText, { justifyContent: 'center' }]}>
          <ButtonLink
            bold
            handleSubmit={() => this.props.navigation.navigate('WelcomePage')}
          >
            I've agree with this
          </ButtonLink>
        </View>
      </ViewMain>
    );
  }
}
export default connect()(PrivacyPage);

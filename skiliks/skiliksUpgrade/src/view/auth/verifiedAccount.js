import React, { Component } from 'react';

import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Card,
  CardItem,
  Thumbnail,
  View,
  H1,
  Item,
  Input,
} from 'native-base';
import { connect } from 'react-redux';
import i18n from '../../i18n/index';
import actions from '../../modules/auth/authActions';
import { Image, ImageBackground } from 'react-native';
import materiel from '../../../native-base-theme/variables/material';
class VerifiedAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
    };
  }
  componentDidMount = () => {
    const { dispatch } = this.props;
    let { authenticationUser } = this.props;

    this.setState({ email: authenticationUser.email });
    dispatch(actions.doSendEmailConfirmation(authenticationUser.email));
  };
  SendMail = () => {
    const { dispatch } = this.props;

    var { email } = this.state;
    dispatch(actions.doSendEmailConfirmation(email));
  };

  render() {
    var { email } = this.state;

    return (
      <Container>
        <ImageBackground
          source={require('../../../assets/BackgroundLogin.png')}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../../assets/Logo.png')}
              style={{
                height: 150,
                width: 180,
                marginTop: '10%',
                resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              paddingLeft: 30,
              paddingRight: 30,
              marginTop: '30%',
            }}
          >
            <View
              style={{
                width: '100%',
                height: 90,
                padding: 5,
                justifyContent: 'center',

                backgroundColor: materiel.brandPrimary,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: materiel.brandInfo,
                  fontSize: 18,
                }}
              >
                {i18n.t('auth.emailUnverified.message', {
                  email: email != null ? email : '',
                })}
              </Text>
            </View>
          </View>
          <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: '20%' }}>
            <Button
              iconLeft
              dark
              full
              onPress={() => this.SendMail()}
              style={{
                borderRadius: 30,
                marginTop: 10,
              }}
            >
              <Icon type="AntDesign" name="mail" size={30} color="#ffffff" />
              <Text style={{ fontWeight: 'bold' }}>
                ${i18n.t('auth.emailUnverified.submit')}
              </Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, authenticationUser } = state.auth;
  const store = state.auth;

  return {
    loading,
    authenticationUser,
    store,
  };
};

export default connect(mapStateToProps)(VerifiedAccount);

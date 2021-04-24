import React, { Component } from 'react';
import {
  Container,
  Item,
  Input,
  Button,
  Text,
  View,
  Icon,
  Left,
  Right,
} from 'native-base';
import actions from '../../modules/auth/authActions';

import { Image, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import model from '../../modules/auth/userModel';
import FormSchema from '../shared/form/formSchema';
import i18n from '../../i18n';
const { fields } = model;
class UpdateForgoutPassword extends Component {
  schema = new FormSchema(fields.id, [fields.password, fields.confirmPassword]);

  handleSubmitUpdatePassword(values) {
    var dispatch = this.props.dispatch;
    var { currentUser } = this.props;

    dispatch(
      actions.resetEmailUpdatePassword(
        values.password,
        currentUser.refresh_token,
        CurrentUser.email,
      ),
    );
  }
  render() {
    return (
      <Container>
        <ImageBackground
          source={require('../../../assets/BackgroundLogin.png')}
          style={{ width: '100%', height: '100%', flex: 1 }}
        >
          <KeyboardAwareScrollView>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../../assets/Logo.png')}
                style={{
                  height: 150,
                  width: 180,
                  marginTop: 50,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <Formik
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              validationSchema={this.schema.schema}
              onSubmit={(values) => this.handleSubmitUpdatePassword(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={{ marginTop: 25 }}>
                  <View>
                    <View
                      style={{
                        padding: 10,
                        paddingLeft: 30,
                        paddingRight: 30,
                      }}
                    >
                      <Item
                        style={{
                          backgroundColor: 'white',
                          paddingLeft: 5,
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                      >
                        <Icon
                          type="FontAwesome5"
                          name="key"
                          style={{ fontSize: 18 }}
                        />
                        <Input
                          secureTextEntry={true}
                          placeholder="Password"
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                        />
                      </Item>

                      <Item
                        style={{
                          backgroundColor: 'white',
                          paddingLeft: 5,
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                      >
                        <Icon
                          type="FontAwesome5"
                          name="key"
                          style={{ fontSize: 18 }}
                        />
                        <Left>
                          <Input
                            secureTextEntry={true}
                            placeholder="Confirm Password"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                          />
                        </Left>
                        <Right>
                          {errors.confirmPassword && (
                            <Text style={{ color: 'red' }}>
                              {errors.confirmPassword}
                            </Text>
                          )}
                        </Right>
                      </Item>
                      <Button
                        danger
                        onPress={handleSubmit}
                        block
                        style={{
                          height: 40,
                          borderRadius: 30,
                          marginTop: 30,
                        }}
                      >
                        <Text>{i18n.t('auth.editpassword.title')}</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { errorMessage, currentUser } = state.auth;
  return {
    errorMessage,
    currentUser,
  };
};

export default connect(mapStateToProps)(UpdateForgoutPassword);

import React, { Component } from 'react';
import { View, Text, ListItem, Button } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import platfrom from '../../../../native-base-theme/variables/platform';
import Check from '../../../../assets/icons/popular/check.svg';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class InputRadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var { active, label, onPress } = this.props;
    return (
      <TouchableOpacity
        noBorder
        onPress={(e) => onPress()}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: platfrom.getResponsiveHeight(1),
          paddingBottom: platfrom.getResponsiveHeight(1),
        }}
      >
        <View
          transparent
          style={{
            width: platfrom.normalize(20),
            height: platfrom.normalize(20),
            borderColor: '#7041EE',
            backgroundColor: active ? '#7041EE' : null,
            borderWidth: 1,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: platfrom.getResponsiveWidth(2),
            paddingRight: platfrom.getResponsiveWidth(2),
          }}
        >
          <Check />
        </View>
        <View
          transparent
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: platfrom.getResponsiveWidth(2),
            paddingRight: platfrom.getResponsiveWidth(2),
          }}
        >
          <Text
            style={{
              fontFamily: 'Calibri',
              fontStyle: 'normal',
              fontWeight: 'normal',
              opacity: 0.7,
              color: '#212121',
              fontSize: platfrom.normalize(18),
            }}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

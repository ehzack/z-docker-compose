import React, {Component} from 'react';
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
  Content,
  Header,
  Body,
} from 'native-base';
export default class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {
      secureTextEntry,
      placeholder,
      onChangeText,
      onBlur,
      value,
      typeIcon,
      iconName,
      name,
      errors,
      styles,
    } = this.props;

    if (errors) {
      return (
        <View style={styles}>
          <Item error>
            <Icon type={typeIcon} name={iconName} style={{fontSize: 18}} />
            <Input
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              onChangeText={onChangeText}
              onBlur={onBlur}
              value={value}
            />
            <Icon name="close-circle" />
          </Item>
          <Text style={{color: 'red'}}>{errors}</Text>
        </View>
      );
    } else {
      return (
        <Item style={styles}>
          <Icon type={typeIcon} name={iconName} style={{fontSize: 18}} />
          <Input
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
          />
        </Item>
      );
    }
  }
}

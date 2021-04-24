import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import plateform from '../../../../native-base-theme/variables/platform';

import PropTypes from 'prop-types';
import { FastField } from 'formik';
import CheckSVG from 'assets/icons/popular/check.svg';

class ItemRateFormItem extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    var { value } = this.props;
    this.setState({ value });
  }
  OnChangeRate = (key) => {
    var { value } = this.state;
    var { index } = this.props;
    if (key < 0) {
      value.rate = Math.abs(key);
    } else {
      value.rate = key;
    }
    this.props.handleUpate(value, key, index);
  };

  handleDelete = (item) => {
    var { index } = this.props;
    this.props.handleDelete(index);
  };

  render() {
    //const { loading } = this.state;

    const {
      form,
      label,
      name,
      hint,
      layout,
      size,
      placeholder,
      autoFocus,
      formItemProps,
      inputProps,
      errorMessage,
      defaultActiveFirstOption,
      allowClear,
      mode,
      required,
      styleTextItem,
      value,
      styleItem,
      HandlePress,
      checkbox,
      checked,
    } = this.props;

    return (
      <View
        style={{
          paddingTop: plateform.getResponsiveHeight(1),
          paddingBottom: plateform.getResponsiveHeight(1),
          width: '100%',
        }}
      >
        <TouchableOpacity
          onPress={() => HandlePress()}
          style={[
            {
              width: '100%',
              height: plateform.getResponsiveHeight(7),

              backgroundColor: 'white',
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: plateform.getRelativeWidth(15),
              paddingRight: plateform.getRelativeWidth(15),
              color: 'black',
            },
            styleItem,
            Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
              },
              android: {
                shadowColor: 'rgb(78, 79, 114)',
                shadowOffset: {
                  width: 50,
                  height: 50,
                },
                shadowOpacity: 1,
                shadowRadius: 1,

                elevation: 4,
              },
            }),
          ]}
        >
          {checkbox && (
            <View
              style={{
                width: plateform.getResponsiveWidth(7),
                height: plateform.getResponsiveWidth(7),
                borderWidth: 1,
                borderColor: '#E4E4E4',
                borderRadius: 8,
                backgroundColor: checked
                  ? plateform.brandPrimary
                  : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CheckSVG
                width={plateform.circleSize(35)}
                height={plateform.circleSize(35)}
              />
            </View>
          )}
          <View style={{ paddingLeft: plateform.getResponsiveWidth(5) }}>
            <Text
              style={[
                {
                  fontSize: plateform.getRelativeWidth(16),
                  fontFamily: 'Calibri',
                  color: 'black',
                  textAlign: 'right',
                },
                styleTextItem,
              ]}
            >
              {value.label ? value.label : value.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ItemRateFormItem;

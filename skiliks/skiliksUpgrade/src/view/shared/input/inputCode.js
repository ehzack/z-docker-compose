import React, { useState } from 'react';
import {
  Dimensions,
  ActivityIndicator,
  Image,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { View, Button, List, ListItem, Radio } from 'native-base';
import Modal from 'react-native-modal';
import platform from '../../../../native-base-theme/variables/platform';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  codeFiledRoot: { marginTop: 20 },
  view: {
    width: platform.getRelativeWidth(50),
    height: platform.getRelativeWidth(50),
    borderWidth: 1,
    borderColor: 'rgba(228, 228, 228, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cell: {
    lineHeight: 38,
    fontSize: 24,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: 'rgba(112, 65, 238,0.6)',
  },
});

const InputCode = ({ valuee, onChangeText }) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={(e) => {
        setValue(e);
        onChangeText(e);
      }}
      cellCount={4}
      rootStyle={{
        width: platform.getRelativeWidth(305),
        height: platform.getRelativeHeight(58),
        justifyContent: 'space-around',
      }}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View style={[styles.view, isFocused && styles.focusCell]}>
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
    />
  );
};

export default InputCode;

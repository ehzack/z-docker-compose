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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import i18n from '../../../i18n/index';
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
    marginLeft: platform.getRelativeWidth(21),
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

const ModalInputCode = ({
  showModal,
  initAuth,
  handleActivateAccount,
  loading,
  ResendCode,
}) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <Modal
      isVisible={showModal}
      deviceWidth={screenWidth}
      deviceHeight={screenHeight}
      onBackdropPress={(e) => initAuth()}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
          paddingBottom: platform.getRelativeHeight(8),
        }}
      >
        <View
          style={{
            paddingLeft: platform.getRelativeWidth(60),
            paddingRight: platform.getRelativeWidth(60),
            marginTop: platform.getRelativeHeight(50),
          }}
        >
          <Text
            style={{
              fontSize: platform.getRelativeWidth(18),
              lineHeight: platform.getRelativeWidth(20),
              color: platform.brandSuccess,
              fontFamily: 'Calibri',
              color: '#151522',
              textAlign: 'center',
            }}
          >
            {i18n.t('auth.activateAccount.message')}
          </Text>
        </View>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={4}
          rootStyle={{
            justifyContent: 'space-between',
            marginTop: platform.getRelativeHeight(42),
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
        <Button
          style={{
            marginTop: platform.getRelativeHeight(30),
            width: platform.getRelativeWidth(305),
            height: platform.getRelativeHeight(60),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: platform.brandPrimary,
            borderRadius: 25,
            shadowColor: 'rgb(78, 79, 114)',
            shadowOffset: {
              width: 50,
              height: 50,
            },
            shadowOpacity: 1,
            shadowRadius: 1,

            elevation: 4,
          }}
          onPress={() => {
            !loading ? handleActivateAccount(value) : '';

            setValue('');
          }}
        >
          {loading ? (
            <ActivityIndicator
              animating={true}
              size="large"
              color="rgba(228, 228, 228, 0.43)"
            />
          ) : (
            <Text
              style={{
                fontSize: platform.getRelativeWidth(16),
                lineHeight: platform.getRelativeWidth(22),
                color: platform.brandSuccess,
                fontFamily: 'Calibri',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Confirm
            </Text>
          )}
        </Button>

        <Button
          transparent
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: platform.getRelativeWidth(30),
            height: '10%',
          }}
          onPress={() => ResendCode()}
        >
          <Text
            style={{
              fontSize: platform.getRelativeWidth(15),
              lineHeight: platform.getRelativeWidth(20),
              color: 'white',
              fontFamily: 'Calibri',
              color: '#212121',
            }}
          >
            {i18n.t('auth.activateAccount.resend')}
          </Text>
        </Button>
      </View>
    </Modal>
  );
};

export default ModalInputCode;

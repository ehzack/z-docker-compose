import React, { useState } from 'react';

import {
  Image,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text,
  Platform,
} from 'react-native';
import plateform from '../../../../native-base-theme/variables/platform';
import Go from '../../../../assets/icons/popular/go.svg';
import { LinearGradient } from 'expo-linear-gradient';

const ButtonItem = ({
  styleButton,
  styleText,
  handleSubmit,
  Title,
  IconLeft,
  IconRight,
  loading,
}) => {
  return (
    <View
      style={{
        height: plateform.getResponsiveHeight(9),
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity
        key={Title}
        onPress={handleSubmit}
        disabled={loading}
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            height: plateform.getResponsiveHeight(7),

            paddingLeft: plateform.getRelativeWidth(20),
            paddingRight: plateform.getRelativeWidth(15),
            borderRadius: 25,
            backgroundColor: 'white',
          },
          Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            },
            android: {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            },
          }),
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {IconLeft && (
            <View
              style={{
                paddingLeft: plateform.getResponsiveWidth(0),
                paddingRight: plateform.getResponsiveWidth(4),
              }}
            >
              {IconLeft()}
            </View>
          )}
          {Title && (
            <Text
              style={{
                fontFamily: 'Calibri',
                fontSize: plateform.getRelativeWidth(18),
                color: 'black',
                textAlign: 'left',
              }}
            >
              {Title}
            </Text>
          )}
        </View>

        <LinearGradient
          colors={[plateform.brandPrimary, '#A573FF']}
          start={[0, 0.7]}
          end={[0, 0]}
          style={{
            width: plateform.getRelativeHeight(45),
            height: plateform.getRelativeHeight(45),
            backgroundColor: plateform.brandPrimary,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Go />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonItem;

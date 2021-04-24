import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  multiply,
  cos,
  sub,
  asin,
  divide,
} from 'react-native-reanimated';
import { useValue, translateZ } from 'react-native-redash';
import MaskedView from '@react-native-community/masked-view';

import GestureHandler from './GestureHandler';
import { VISIBLE_ITEMS, ITEM_HEIGHT } from './Constant';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
  },
  label: {
    color: 'black',
    fontFamily: 'Calibri',
    fontSize: 24,
    lineHeight: ITEM_HEIGHT,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
const perspective = 600;
const RADIUS_REL = VISIBLE_ITEMS * 0.5;
const RADIUS = RADIUS_REL * ITEM_HEIGHT;

const Picker = ({ values, defaultValue }) => {
  const translateY = useValue(0);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {values.map((v, i) => {
          const y = interpolate(
            divide(sub(translateY, ITEM_HEIGHT * 2), -ITEM_HEIGHT),
            {
              inputRange: [i - RADIUS_REL, i, i + RADIUS_REL],
              outputRange: [-1, 0, 1],
              extrapolate: Extrapolate.CLAMP,
            },
          );
          const rotateX = asin(y);
          const z = sub(multiply(RADIUS, cos(rotateX)), RADIUS);
          return (
            <Animated.View
              key={v.id}
              style={[
                styles.item,
                {
                  transform: [
                    { perspective },
                    { rotateX },
                    translateZ(perspective, z),
                  ],
                },
              ]}
            >
              <Text style={styles.label}>{v.name}</Text>
            </Animated.View>
          );
        })}
      </Animated.View>
      <View style={StyleSheet.absoluteFill}>
        <View
          style={{
            borderColor: 'grey',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            top: ITEM_HEIGHT * 2,
            height: ITEM_HEIGHT,
          }}
        />
      </View>
      <GestureHandler
        max={values.length}
        translateY={translateY}
        {...{ defaultValue }}
      />
    </View>
  );
};

export default Picker;

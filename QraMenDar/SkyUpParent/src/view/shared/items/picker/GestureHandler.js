import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useCode,
  set,
  divide,
  debug,
  sub,
  cond,
  eq,
  Value,
  add,
  Clock,
  Easing,
  block,
  startClock,
  timing,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  State,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import {
  usePanGestureHandler,
  diffClamp,
  snapPoint,
} from "react-native-redash";

import { ITEM_HEIGHT } from "./Constant";
import { withDecay } from "./AnimationHelpers";

const withSnapToInterval = ({
  value,
  velocity,
  state: gestureState,
  snapPoints,
}) => {
  const clock = new Clock();
  const offset = new Value(0);
  const state = {
    position: new Value(0),
    finished: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    easing: Easing.bezier(0.33, 1, 0.68, 1),
    duration: 1000,
  };
  return block([
    startClock(clock),
    cond(eq(gestureState, State.BEGAN), [
      set(offset, state.position),
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
    ]),
    cond(eq(gestureState, State.ACTIVE), [
      set(state.position, add(offset, value)),
      set(config.toValue, snapPoint(state.position, velocity, snapPoints)),
    ]),
    cond(eq(gestureState, State.END), [timing(clock, state, config)]),
    state.position,
  ]);
};

const GestureHandler = ({ translateY, max, defaultValue }) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const snapPoints = new Array(max).fill(0).map((_, i) => i * -ITEM_HEIGHT);
  // const translateY = withDecay({
  //   value: translation.y,
  //   velocity: velocity.y,
  //   state,
  //   snapPoints,
  //   offset: new Value(-ITEM_HEIGHT * 34),
  // });
  useCode(
    () =>
      set(
        translateY,
        withSnapToInterval({
          value: translation.y,
          velocity: velocity.y,
          state,
          snapPoints,
        })
      ),
    []
  );

  const ExampleWithHoc = gestureHandlerRootHOC(function GestureExample() {
    return (
      <View>
        <PanGestureHandler {...gestureHandler}>
          <Animated.View style={[StyleSheet.absoluteFill]} />
        </PanGestureHandler>
      </View>
    );
  });

  return ExampleWithHoc;
};

export default GestureHandler;

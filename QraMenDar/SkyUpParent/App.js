import {StatusBar} from 'expo-status-bar';
import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import graphqlClientConfig from './src/modules/shared/graphql/graphqlClient';
import {configureStore} from './src/modules/store';
import {ApolloProvider} from '@apollo/client';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import GlobalNavigation from 'navigation/navigation';
import {navigationRef} from './src/navigation/NavigationService';
import * as Notifications from 'expo-notifications';
import Service from 'src/modules/parent/service';
import Toast from 'src/view/shared/items/toast';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <GlobalNavigation />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}

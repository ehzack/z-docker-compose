import React, { Component } from 'react';

import { StyleProvider, View, Text } from 'native-base';

import { Provider } from 'react-redux';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import AppNavigator from './src/navigation/navigation';
import NavigationService from './src/navigation/NavigationService';
import { ApolloProvider } from 'react-apollo';
import { AppLoading } from 'expo';
import * as Localization from 'expo-localization';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { configureStore } from './src/modules/store';
import graphqlClientConfig from './src/modules/shared/graphql/graphqlClient';
import * as Linking from 'expo-linking';
import Toast from './src/view/shared/items/toast';
import { LogBox } from 'react-native';
console.disableYellowBox = true;

const store = configureStore();
const client = graphqlClientConfig.config();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Calibri: require('./assets/fonts/Calibri-Light.ttf'),
      CalibriBold: require('./assets/fonts/Calibri-Bold.ttf'),

      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    const prefix = Linking.makeUrl('/');
    if (!this.state.isReady) {
      return <View></View>;
    }

    return (
      <ApolloProvider client={graphqlClientConfig.config()}>
        <Provider store={store}>
          <StyleProvider style={getTheme(material)}>
            <AppNavigator
              uriPrefix={prefix}
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </StyleProvider>
        </Provider>
        <Toast />
      </ApolloProvider>
    );
  }
}

export default App;

import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import {
  ApplicationProvider,
  IconRegistry,
  Spinner,
  Layout,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, dark } from '@eva-design/eva';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createHttpClient } from 'mst-gql';
import { config } from '../config';
import { AppStack } from '../navigation/AppStack';
import { getBearerToken } from '../graphql/init';
import { CentreScreen } from '../comps/CentreScreen';
import { ErrorBoundary } from '../comps/ErrorBoundary';
import { init } from './init';
import { getGraphQLClient, setTokenInHeader } from '../graphql/client';
import { RootStore, StoreContext } from '../models';

console.log(
  `Starting App with GraphQL "${config().graphqlServerUrl}" on Platform ${
    Platform.OS
  } `,
);
init();

const rootStore = RootStore.create(undefined, {
  gqlHttpClient: getGraphQLClient(),
});

export const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={dark}>
        <ErrorBoundary>
          <StoreContext.Provider value={rootStore}>
            <SafeAreaProvider>
              <NavigationContainer>
                <AppStack />
              </NavigationContainer>
            </SafeAreaProvider>
          </StoreContext.Provider>
        </ErrorBoundary>
      </ApplicationProvider>
    </>
  );
};

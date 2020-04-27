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

console.log(`Starting App with GraphQL: ${config().graphqlServerUrl}`);
init();

const rootStore = RootStore.create(undefined, {
  gqlHttpClient: getGraphQLClient(),
});

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getBearerToken();
      console.log(`Got token: "${token}"`);
      if (token) {
        setTokenInHeader(token);
      }
      setIsAuthorized(token ? true : false);
      setIsLoading(false);
    })();
  }, []);

  return (
    <ErrorBoundary>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={dark}>
        <StoreContext.Provider value={rootStore}>
          <SafeAreaProvider>
            <NavigationContainer>
              {isLoading ? (
                <CentreScreen>
                  <Spinner size="giant" />
                </CentreScreen>
              ) : (
                <AppStack initialRouteName={isAuthorized ? 'Home' : 'Login'} />
              )}
            </NavigationContainer>
          </SafeAreaProvider>
        </StoreContext.Provider>
      </ApplicationProvider>
    </ErrorBoundary>
  );
};

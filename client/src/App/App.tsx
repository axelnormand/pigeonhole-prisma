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
import { config } from '../config';
import { AppStack } from '../navigation/AppStack';
import { getBearerToken } from '../graphql/init';
import { CentreScreen } from '../comps/CentreScreen';
import { ErrorBoundary } from '../comps/ErrorBoundary';

console.log(`Started App with GraphQL: ${config().graphqlServerUrl}`);

// setup async error handler
if (Platform.OS !== 'web') {
  const defaultErrorHandler = ErrorUtils.getGlobalHandler();
  const myErrorHandler = (e: Error, isFatal?: boolean) => {
    console.error(`ASYNC ERROR (isFatal ${isFatal}): ${e.message}`, e);
    defaultErrorHandler(e, isFatal);
  };
  ErrorUtils.setGlobalHandler(myErrorHandler);
}

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getBearerToken();
      console.log(`Got token: "${token}"`);
      setIsAuthorized(token ? true : false);
      setIsLoading(false);
    })();
  }, []);

  return (
    <ErrorBoundary>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={dark}>
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
      </ApplicationProvider>
    </ErrorBoundary>
  );
};

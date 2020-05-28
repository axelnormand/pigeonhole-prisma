import React from 'react';
import { Platform } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, dark } from '@eva-design/eva';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { config } from '../config';
import { AppStack } from '../navigation/AppStack';
import { ErrorBoundary } from '../comps/ErrorBoundary';
import { init } from './init';
import { getGraphQLClient } from '../graphql/client';
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
  const navTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: dark['color-basic-700'],
    },
  };
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={dark}>
        <ErrorBoundary>
          <StoreContext.Provider value={rootStore}>
            <SafeAreaProvider>
              <NavigationContainer theme={navTheme}>
                <AppStack />
              </NavigationContainer>
            </SafeAreaProvider>
          </StoreContext.Provider>
        </ErrorBoundary>
      </ApplicationProvider>
    </>
  );
};

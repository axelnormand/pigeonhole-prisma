import React from 'react';
import { Platform } from 'react-native';
import {
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, dark } from '@eva-design/eva';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  LinkingOptions,
  getPathFromState,
} from '@react-navigation/native';
import { config } from '../config';
import { AppStack } from '../navigation/AppStack';
import { ErrorBoundary } from '../comps/ErrorBoundary';
import { init } from './init';
import { getGraphQLClient } from '../graphql/client';
import { RootStore, StoreContext } from '../models';
import { CentreLoadingPage } from '../comps/CentreLoadingPage';
import { navTheme, evaTheme } from '../theme'

console.log(
  `Starting App with GraphQL "${config().graphqlServerUrl}" on Platform ${
    Platform.OS
  } `,
);
init();

const rootStore = RootStore.create(undefined, {
  gqlHttpClient: getGraphQLClient(),
});


const { webUrl, appScheme } = config();
const linking: LinkingOptions = {
  prefixes: [webUrl, appScheme],
  getPathFromState
};

export const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={evaTheme}>
        <ErrorBoundary>
          <StoreContext.Provider value={rootStore}>
            <SafeAreaProvider>
              <NavigationContainer
                theme={navTheme}
                linking={linking}
                fallback={<CentreLoadingPage />}
              >
                <AppStack />
              </NavigationContainer>
            </SafeAreaProvider>
          </StoreContext.Provider>
        </ErrorBoundary>
      </ApplicationProvider>
    </>
  );
};

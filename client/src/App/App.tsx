import React from 'react';
import { StyleSheet } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, dark } from '@eva-design/eva';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { config } from '../config';
import { AppStack } from '../navigation/AppStack';

console.log(`Started App with GraphQL: ${config().graphqlServerUrl}`);

const isAuthorized = true;

export const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={dark}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppStack initialRouteName={isAuthorized ? 'Home' : 'Login'} />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
};

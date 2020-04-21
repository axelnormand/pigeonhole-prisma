import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ApplicationProvider,
  IconRegistry,
  Text,
  Layout,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, dark } from '@eva-design/eva';
import { config } from '../config';

console.log(`Started App with GraphQL: ${config().graphqlServerUrl}`);

export const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={dark}>
        <Layout style={styles.container}>
          <Text category="h1">Hello, World!</Text>
        </Layout>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
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
          <Text style={styles.text} category="h1">
            Hello, World!
          </Text>
          <Text style={styles.text} category="s1">
            Pigeonhole!
          </Text>
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
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
});

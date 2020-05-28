import React from 'react';
import { StyleSheet } from 'react-native';
import { CentreLoading } from './CentreLoading';
import { Layout } from '@ui-kitten/components';

export const CentreLoadingPage: React.FC = () => (
  <Layout style={styles.container}>
    <CentreLoading />
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

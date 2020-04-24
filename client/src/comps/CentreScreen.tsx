import React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export const CentreScreen: React.FC<Props> = ({ children }) => (
  <Layout style={styles.container}>{children}</Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

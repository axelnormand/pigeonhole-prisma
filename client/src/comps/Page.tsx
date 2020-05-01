import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout } from '@ui-kitten/components';

type Props = {
  children: React.ReactNode;
  isCentre?: boolean;
};

export const Page: React.FC<Props> = ({ children, isCentre }) => (
  <Layout
    style={[styles.container, isCentre ? { alignItems: 'center' } : null]}
  >
    <ScrollView style={styles.scroll}>{children}</ScrollView>
  </Layout>
);

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
});

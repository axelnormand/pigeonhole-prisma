import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

type Props = {
  children: React.ReactNode;
  isCentre?: boolean;
};

export const Screen: React.FC<Props> = ({ children, isCentre }) => (
  <Layout
    style={[styles.container, isCentre ? { alignItems: 'center' } : null]}
  >
    {children}
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
});

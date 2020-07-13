import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

type Props = {
  children: React.ReactNode;
  isCentre?: boolean;
};

export const Page: React.FC<Props> = ({ children, isCentre }) => (
  <Layout
    style={[styles.container, { alignItems: isCentre ? 'center' : undefined }]}
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

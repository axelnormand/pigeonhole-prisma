import React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const CentreScreen: React.FC<Props> = ({ style, children }) => (
  <Layout style={[style, styles.container]}>{children}</Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

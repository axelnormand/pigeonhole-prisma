import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Layout } from '@ui-kitten/components';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const CardRow: React.FC<Props> = ({ children, style }) => (
  <Layout style={[styles.row, style]}>{children}</Layout>
);

const styles = StyleSheet.create({
  row: {
    marginBottom: 20,
  },
});

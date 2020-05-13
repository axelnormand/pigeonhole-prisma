import React from 'react';
import { StyleSheet, Platform, ViewStyle } from 'react-native';
import { Layout } from '@ui-kitten/components';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const FormRow: React.FC<Props> = ({ children, style }) => (
  <Layout style={[styles.row, style]}>{children}</Layout>
);

const styles = StyleSheet.create({
  row: {
    marginBottom: 15,
  },
});

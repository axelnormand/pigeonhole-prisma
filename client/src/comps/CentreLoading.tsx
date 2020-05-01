import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import { FormRow } from './FormRow';

export const CentreLoading: React.FC = () => (
  <FormRow style={styles.container}>
    <Spinner size="giant" />
  </FormRow>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { FormRow } from './FormRow';

export const CentreFin: React.FC = () => (
  <FormRow style={styles.container}>
    <Text appearance="hint" category="c1">
      ~ end ~
    </Text>
  </FormRow>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

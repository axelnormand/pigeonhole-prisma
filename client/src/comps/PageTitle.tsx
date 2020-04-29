import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextElement } from '@ui-kitten/components';

type Props = {
  children: string | TextElement;
};

export const PageTitle: React.FC<Props> = ({ children }) => (
  <Text category="h5" style={styles.container}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
});

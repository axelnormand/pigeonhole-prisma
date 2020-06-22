import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, Layout } from '@ui-kitten/components';
import { Italic } from './Italic';
import { dark } from '@eva-design/eva';

export const Quote: React.FC<{ name: string; children: string }> = ({
  name,
  children,
}) => {
  const border = dark['color-basic-500'];
  return (
    <Layout style={[styles.container, { borderColor: border }]}>
      <Italic testID="bbcode-quote-name">{name} wrote:</Italic>
      <Text testID="bbcode-quote-text">{children}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 8,
  },
});

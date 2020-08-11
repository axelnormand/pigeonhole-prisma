import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '@ui-kitten/components';
import { Italic } from './Italic';
import { dark } from '@eva-design/eva';

export const Quote: React.FC<{ name?: string; children: string }> = ({
  name,
  children,
}) => {
  const border = dark['color-basic-500'];
  const background = dark['color-basic-900'];
  return (
    <View
      style={[
        styles.container,
        { borderColor: border, backgroundColor: background },
      ]}
    >
      {name && <Italic testID="bbcode-quote-name">{name} wrote:</Italic>}
      <Text testID="bbcode-quote-text">{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 8,
    flex: 1,
    display: 'flex',
  },
});

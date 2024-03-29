import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, useTheme } from '@ui-kitten/components';

export const Quote: React.FC<{ name?: string; children: string }> = ({
  name,
  children,
}) => {
  const theme = useTheme();
  const border = theme['color-basic-500'];
  const background = theme['color-basic-900'];
  return (
    <View
      style={[
        styles.container,
        { borderColor: border, backgroundColor: background },
      ]}
    >
      {name && (
        <Text style={{ fontWeight: 'bold' }} testID="bbcode-quote-name">
          {name} wrote:
        </Text>
      )}
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

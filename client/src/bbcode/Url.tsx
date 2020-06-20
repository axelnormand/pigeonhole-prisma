import React from 'react';
import { Text } from '@ui-kitten/components';
import { Linking } from 'react-native';

export const Url: React.FC<{ url: string; children: string }> = ({
  url,
  children,
}) => {
  if (!url.startsWith('http')) {
    throw new Error('Please only use http links');
  }
  return (
    <Text
      status="primary"
      onPress={() => Linking.openURL(url)}
      testID="bbcode-url"
    >
      {children}
    </Text>
  );
};

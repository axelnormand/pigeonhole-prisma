import React from 'react';
import { Text } from '@ui-kitten/components';

export const Italic: React.FC<{
  children: string | string[];
  testID?: string;
}> = ({ children, testID }) => (
  <Text style={{ fontStyle: 'italic' }} testID={testID || 'bbcode-italic'}>
    {children}
  </Text>
);

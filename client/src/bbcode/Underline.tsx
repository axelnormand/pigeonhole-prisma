import React from 'react';
import { Text } from '@ui-kitten/components';

export const Underline: React.FC<{
  children: string | string[];
  testID?: string;
}> = ({ children, testID }) => (
  <Text
    style={{ textDecorationLine: 'underline' }}
    testID={testID || 'bbcode-underline'}
  >
    {children}
  </Text>
);

import React from 'react';
import { Text } from '@ui-kitten/components';

export const Bold: React.FC<{ children: string }> = ({ children }) => (
  <Text style={{ fontWeight: 'bold' }} testID="bbcode-bold">
    {children}
  </Text>
);

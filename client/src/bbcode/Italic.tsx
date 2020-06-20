import React from 'react';
import { Text } from '@ui-kitten/components';

export const Italic: React.FC<{ children: string }> = ({ children }) => (
  <Text style={{ fontStyle: 'italic' }} testID="bbcode-italic">
    {children}
  </Text>
);

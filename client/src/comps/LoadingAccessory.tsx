import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Spinner } from '@ui-kitten/components';

type Props = {
  style?: ViewStyle;
};

export const LoadingAccessory: React.FC<Props> = ({ style }) => (
  <View style={[style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

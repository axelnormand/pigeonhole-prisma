import React from 'react';
import { StyleSheet, ScrollView, ScrollViewProps } from 'react-native';
import { Layout } from '@ui-kitten/components';

type Props = {
  children: React.ReactNode;
  isCentre?: boolean;
} & ScrollViewProps;

/** Scrollable page */
export const Page: React.FC<Props> = ({
  children,
  isCentre,
  ...scrollViewProps
}) => (
  <ScrollView style={styles.scroll} {...scrollViewProps}>
    <Layout
      style={[
        styles.container,
        { alignItems: isCentre ? 'center' : undefined },
      ]}
    >
      {children}
    </Layout>
  </ScrollView>
);

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
});

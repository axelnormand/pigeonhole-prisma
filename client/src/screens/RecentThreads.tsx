import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
export const RecentThreads = () => {
  return (
    <Layout style={styles.container}>
      <Text category="h1">Recent Threads</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

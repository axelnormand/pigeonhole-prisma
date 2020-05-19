import React from 'react';
import { StyleSheet, View } from 'react-native';
import { compactInteger } from 'humanize-plus';
import { Card, Text } from '@ui-kitten/components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CardRow } from './CardRow';

dayjs.extend(relativeTime);

type Props = {
  header: string;
  blurb: string;
  category: string;
  topics: number;
  posts: number;
  lastPost: number;
  lastPoster: string;
};

export const ForumCard: React.FC<Props> = ({
  header,
  blurb,
  lastPost,
  lastPoster,
  posts,
  topics,
  category,
}) => {
  const subtitle = `${category} | topics: ${compactInteger(
    topics,
  )} | posts: ${compactInteger(posts)}`;
  return (
    <CardRow>
      <Card
        header={() => (
          <View style={styles.headerContainer}>
            <Text category="h6">{header}</Text>
            <Text appearance="hint" category="p1">
              {subtitle}
            </Text>
          </View>
        )}
        footer={() => <Footer lastPost={lastPost} lastPoster={lastPoster} />}
      >
        <Text>{blurb}</Text>
      </Card>
    </CardRow>
  );
};

const Footer: React.FC<{
  lastPost: number;
  lastPoster: string;
}> = ({ lastPost, lastPoster }) => (
  <View style={styles.footerContainer}>
    <Text appearance="hint" category="c1">
      Last Post {dayjs(lastPost * 1000).fromNow()} by {lastPoster}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 24,
    paddingRight: 24,
  },
});

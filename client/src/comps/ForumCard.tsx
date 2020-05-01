import React from 'react';
import { StyleSheet } from 'react-native';
import { compactInteger } from 'humanize-plus';
import { Card, CardHeader, Text, Layout } from '@ui-kitten/components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CardRow } from './CardRow';

dayjs.extend(relativeTime);

type Props = {
  header: string;
  blurb: string;
  topics: number;
  posts: number;
  lastPost: Date;
  lastPostUsername: string;
};

export const ForumCard: React.FC<Props> = ({
  header,
  blurb,
  lastPost,
  lastPostUsername,
  posts,
  topics,
}) => {
  const subtitle = `topics: ${compactInteger(topics)} | posts: ${compactInteger(
    posts,
  )}`;
  return (
    <CardRow>
      <Card
        header={() => <Header header={header} subtitle={subtitle} />}
        footer={() => (
          <Footer lastPost={lastPost} lastPostUsername={lastPostUsername} />
        )}
      >
        <Text>{blurb}</Text>
      </Card>
    </CardRow>
  );
};

const Header: React.FC<{ header: string; subtitle: string }> = ({
  header,
  subtitle,
}) => <CardHeader title={header} description={subtitle} />;

const Footer: React.FC<{
  lastPost: Date;
  lastPostUsername: string;
}> = ({ lastPost, lastPostUsername }) => (
  <Layout style={styles.footerContainer}>
    <Text appearance="hint" category="c1">
      Last Post {dayjs(lastPost).fromNow()} by {lastPostUsername}
    </Text>
  </Layout>
);

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5,
  },
});

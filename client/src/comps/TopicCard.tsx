import React from 'react';
import { View, StyleSheet } from 'react-native';
import { compactInteger } from 'humanize-plus';
import { Card, Text, useTheme } from '@ui-kitten/components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CardRow } from './CardRow';

dayjs.extend(relativeTime);

type Props = {
  subject: string;
  poster: string;
  lastPoster: string;
  replies: number;
  lastPost: number;
};

export const TopicCard: React.FC<Props> = ({
  subject,
  poster,
  lastPoster,
  lastPost,
  replies,
}) => {
  const theme = useTheme();
  const descriptionColour = theme['text-hint-color'];
  const subtitle = `posts: ${compactInteger(replies)}`;
  return (
    <CardRow>
      <Card
        header={() => (
          <View style={styles.headerContainer}>
            <Text category="h6">{poster}</Text>
            <Text appearance="hint" category="p1">
              {subtitle}
            </Text>
          </View>
        )}
        footer={() => <Footer lastPost={lastPost} lastPoster={lastPoster} />}
      >
        <Text>{subject}</Text>
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

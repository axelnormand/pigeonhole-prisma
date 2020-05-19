import React from 'react';
import { compactInteger } from 'humanize-plus';
import { Card, Text } from '@ui-kitten/components';
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
  onPress: () => void;
};

export const TopicCard: React.FC<Props> = ({
  subject,
  poster,
  lastPoster,
  lastPost,
  replies,
  onPress,
}) => {
  const msg = `${compactInteger(replies)} Posts | Last Post ${dayjs(
    lastPost * 1000,
  ).fromNow()} by ${lastPoster}`;
  return (
    <CardRow>
      <Card onPress={onPress}>
        <Text category="h6">{subject}</Text>
        <Text appearance="hint" category="p1">
          {msg}
        </Text>
        <Text appearance="hint" category="p1">
          {poster}
        </Text>
      </Card>
    </CardRow>
  );
};

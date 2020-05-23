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
  const subtitle = `${poster} | ${compactInteger(replies)} Posts`;
  return (
    <CardRow>
      <Card onPress={onPress}>
        <Text category="h6">{subject}</Text>
        <Text appearance="hint" category="p1">
          {subtitle}
        </Text>
        <Text appearance="hint" category="p1">
          Last Post {dayjs(lastPost * 1000).fromNow()} by {lastPoster}
        </Text>
      </Card>
    </CardRow>
  );
};

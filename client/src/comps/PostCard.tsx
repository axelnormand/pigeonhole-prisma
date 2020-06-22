import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CardRow } from './CardRow';
import { parse } from '../bbcode';

dayjs.extend(relativeTime);

type Props = {
  message: string;
  posted: number;
  poster: string;
};

export const PostCard: React.FC<Props> = ({ message, posted, poster }) => {
  return (
    <CardRow>
      <Card
        footer={() => <Footer posted={posted} poster={poster} />}
        disabled={true}
      >
        {parse(message)}
      </Card>
    </CardRow>
  );
};

const Footer: React.FC<{
  posted: number;
  poster: string;
}> = ({ posted, poster }) => (
  <View style={styles.footerContainer}>
    <Text appearance="hint" category="c1">
      {poster} | {dayjs(posted * 1000).format('dddd, MMMM D, YYYY h:mm A')}
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

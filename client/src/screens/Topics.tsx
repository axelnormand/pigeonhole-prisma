import React from 'react';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { useQuery } from '../models';
import { CentreLoadingPage } from '../comps/CentreLoadingPage';
import { MainStackParams } from '../navigation/MainStack';
import { TopicCard } from '../comps/TopicCard';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  route: RouteProp<MainStackParams, 'Topics'>;
};

type NavProps = StackNavigationProp<MainStackParams, 'Topics'>;

export const Topics = observer(({ route }: Props) => {
  const { forumId } = route.params;
  const { data, loading, error } = useQuery((store) =>
    store.queryTopics({ forumId }),
  );
  const navigation = useNavigation<NavProps>();

  if (error) {
    throw error;
  }

  if (loading) {
    return <CentreLoadingPage />;
  }

  return (
    <Page>
      {data?.topics.map(
        ({ id, subject, poster, last_poster, num_replies, last_post }) => {
          return (
            <TopicCard
              key={id}
              subject={subject ?? ''}
              poster={poster ?? ''}
              lastPoster={last_poster ?? ''}
              replies={num_replies ?? 0}
              lastPost={last_post ?? new Date().getTime()}
              onPress={() => navigation.navigate('Posts', { topicId: id ?? 0 })}
            />
          );
        },
      )}
    </Page>
  );
});

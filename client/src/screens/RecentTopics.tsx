import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { useQuery } from '../models';
import { CentreLoadingPage } from '../comps/CentreLoadingPage';
import { TabsScreenProps } from '../navigation/TopicStack';
import { TopicCard } from '../comps/TopicCard';

export const RecentTopics = observer(() => {
  const { data, loading, error } = useQuery((store) =>
    store.queryRecentTopics(),
  );
  const navigation = useNavigation<TabsScreenProps>();

  if (error) {
    throw error;
  }

  if (loading) {
    return <CentreLoadingPage />;
  }

  return (
    <Page>
      {data?.recentTopics.map(
        ({ id, subject, poster, last_poster, num_replies, last_post }) => {
          return (
            <TopicCard
              key={id}
              subject={subject ?? ''}
              poster={poster ?? ''}
              lastPoster={last_poster ?? ''}
              replies={num_replies ?? 0}
              lastPost={last_post ?? new Date().getTime()}
              onPress={() => navigation.navigate('Topic', { topicId: id ?? 0 })}
            />
          );
        },
      )}
    </Page>
  );
});

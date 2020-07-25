import React, { useContext } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { StoreContext, PunbbTopicModelType } from '../models';
import { TopicCard } from '../comps/TopicCard';
import { MainStackParams } from '../navigation/MainStack';
import { CursorFlatList } from '../comps/CursorFlatList';

type NavProps = StackNavigationProp<MainStackParams, 'ForumTabs'>;

export const RecentTopics = observer(() => {
  const navigation = useNavigation<NavProps>();
  const store = useContext(StoreContext);

  return (
    <Page>
      <CursorFlatList<PunbbTopicModelType>
        fetch={async (cursor) =>
          (await store.queryRecentTopics({ cursor })).recentTopics
        }
        renderItem={({ item }) => {
          const {
            id,
            subject,
            poster,
            last_poster,
            num_replies,
            last_post,
          } = item;
          return (
            <TopicCard
              key={id}
              subject={subject ?? ''}
              poster={poster ?? ''}
              lastPoster={last_poster ?? ''}
              replies={num_replies ?? 0}
              lastPost={last_post ?? new Date().getTime()}
              onPress={() =>
                navigation.navigate('Posts', {
                  topicId: id ?? 0,
                  topicName: subject ?? '',
                })
              }
            />
          );
        }}
      />
    </Page>
  );
});

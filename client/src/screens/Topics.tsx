import React, { useEffect, useContext } from 'react';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { PunbbTopicModelType, StoreContext } from '../models';
import { MainStackParams } from '../navigation/MainStack';
import { TopicCard } from '../comps/TopicCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { CursorFlatList } from '../comps/CursorFlatList';

type Props = {
  route: RouteProp<MainStackParams, 'Topics'>;
};

type NavProps = StackNavigationProp<MainStackParams, 'Topics'>;

export const Topics = observer(({ route }: Props) => {
  const { forumId, forumName } = route.params;
  const navigation = useNavigation<NavProps>();
  const store = useContext(StoreContext);

  useEffect(() => {
    navigation.setOptions({
      title: forumName,
    });
  }, [navigation, forumName]);

  return (
    <CursorFlatList<PunbbTopicModelType>
      fetch={async ({ cursor }) =>
        (await store.queryTopics({ forumId, cursor })).topics
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
  );
});

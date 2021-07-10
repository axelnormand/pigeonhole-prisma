import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react';
import { PostCard } from '../comps/PostCard';
import { StoreContext, PunbbPostModelType } from '../models';
import { MainStackParams } from '../navigation/MainStack';
import { StackScreenProps } from '@react-navigation/stack';
import { OffsetFlatList } from '../comps/flatlist';

type Props = StackScreenProps<MainStackParams, 'Posts'>;

export const Posts = observer(({ route, navigation }: Props) => {
  const { topicId, topicName: initialTopicName} = route.params;
  const store = useContext(StoreContext);
  const [topicName, setTopicName] = useState('');
  
  useEffect(() => {
    navigation.setOptions({
      title: initialTopicName ?? topicName,
    });
  }, [navigation, topicName, initialTopicName]);

  return (
    <OffsetFlatList<PunbbPostModelType>
      fetch={async ({ skip, take, resumePosition }) => {
        const ret = (await store.queryPosts({ skip, take, resumePosition, topicId: Number(topicId) })).posts;
        if (ret.topicName && ret.topicName !== initialTopicName) {
          setTopicName(ret.topicName);
        }
        return ret;
      }}
      renderItem={({ item }) => {
        const { id, message, posted, poster } = item;
        return (
          <PostCard
            key={id}
            id={id ?? 0}
            message={message ?? ''}
            posted={posted ?? new Date().getTime()}
            poster={poster ?? ''}
          />
        );
      }}
    />
  );
});

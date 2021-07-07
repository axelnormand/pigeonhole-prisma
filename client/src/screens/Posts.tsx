import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import { PostCard } from '../comps/PostCard';
import { StoreContext, PunbbPostModelType } from '../models';
import { MainStackParams } from '../navigation/MainStack';
import { StackScreenProps } from '@react-navigation/stack';
import { OffsetFlatList } from '../comps/flatlist';

type Props = StackScreenProps<MainStackParams, 'Posts'>;

export const Posts = observer(({ route, navigation }: Props) => {
  const { topicId, topicName } = route.params;
  const store = useContext(StoreContext);
  
  useEffect(() => {
    navigation.setOptions({
      title: topicName,
    });
  }, [navigation, topicName]);

  return (
    <OffsetFlatList<PunbbPostModelType>
      fetch={async ({ skip, take, resumePosition }) =>
        (await store.queryPosts({ skip, take, resumePosition, topicId: Number(topicId)})).posts
      }
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

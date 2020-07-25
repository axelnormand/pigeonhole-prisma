import React, { useEffect, useContext } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { PostCard } from '../comps/PostCard';
import { StoreContext, PunbbPostModelType } from '../models';
import { MainStackParams } from '../navigation/MainStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { CursorFlatList } from '../comps/CursorFlatList';

type Props = {
  route: RouteProp<MainStackParams, 'Posts'>;
};

type NavProps = StackNavigationProp<MainStackParams, 'Posts'>;

export const Posts = observer(({ route }: Props) => {
  const navigation = useNavigation<NavProps>();
  const { topicId, topicName } = route.params;
  const store = useContext(StoreContext);

  useEffect(() => {
    navigation.setOptions({
      title: topicName,
    });
  }, [navigation, topicName]);

  return (
    <Page>
      <CursorFlatList<PunbbPostModelType>
        fetch={async ({ cursor }) =>
          (await store.queryPosts({ cursor, topicId })).posts
        }
        renderItem={({ item }) => {
          const { id, message, posted, poster } = item;
          return (
            <PostCard
              key={id}
              message={message ?? ''}
              posted={posted ?? new Date().getTime()}
              poster={poster ?? ''}
            />
          );
        }}
      />
    </Page>
  );
});

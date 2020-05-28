import React, { useEffect } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { PostCard } from '../comps/PostCard';
import { CentreLoadingPage } from '../comps/CentreLoadingPage';
import { useQuery } from '../models';
import { MainStackParams } from '../navigation/MainStack';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  route: RouteProp<MainStackParams, 'Posts'>;
};

type NavProps = StackNavigationProp<MainStackParams, 'Posts'>;

export const Posts = observer(({ route }: Props) => {
  const navigation = useNavigation<NavProps>();
  const { topicId, topicName } = route.params;
  const { data, loading, error } = useQuery((store) =>
    store.queryPosts({ topicId }),
  );

  useEffect(() => {
    navigation.setOptions({
      title: topicName,
    });
  }, [navigation, topicName]);

  if (error) {
    throw error;
  }

  if (loading) {
    return <CentreLoadingPage />;
  }

  return (
    <Page>
      {data?.posts.map(({ id, message, posted, poster }) => {
        return (
          <PostCard
            key={id}
            message={message ?? ''}
            posted={posted ?? new Date().getTime()}
            poster={poster ?? ''}
          />
        );
      })}
    </Page>
  );
});

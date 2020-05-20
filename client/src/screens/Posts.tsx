import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { PostCard } from '../comps/PostCard';
import { CentreLoadingPage } from '../comps/CentreLoadingPage';
import { useQuery } from '../models';
import { MainStackParams } from '../navigation/MainStack';

type Props = {
  route: RouteProp<MainStackParams, 'Posts'>;
};

export const Posts = observer(({ route }: Props) => {
  const { topicId } = route.params;
  const { data, loading, error } = useQuery((store) =>
    store.queryPosts({ topicId }),
  );

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

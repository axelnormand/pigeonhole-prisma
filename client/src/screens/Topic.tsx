import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { PostCard } from '../comps/PostCard';
import { useQuery, PunbbForumModelType } from '../models';
import { CentreLoadingPage } from '../comps/CentreLoadingPage';
import { TopicScreenProps, TopicRouteProp } from '../navigation/TopicStack';

type Props = {
  navigation: TopicScreenProps;
  route: TopicRouteProp;
};

export const Topic = observer(({ route }: Props) => {
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

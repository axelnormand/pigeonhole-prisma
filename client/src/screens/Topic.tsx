import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { ForumTabProps } from '../navigation/ForumTabs';
import { ForumCard } from '../comps/ForumCard';
import { useQuery, PunbbForumModelType } from '../models';
import { CentreLoading } from '../comps/CentreLoading';
import { clearTokenInHeader } from '../graphql/client';

export const Topic = observer(() => {
  const { data, loading, error } = useQuery((store) =>
    store.queryRecentTopics(),
  );
  const navigation = useNavigation<TopicStackParams>();

  if (error) {
    throw error;
  }

  if (loading) {
    return (
      <Page>
        <CentreLoading />
      </Page>
    );
  }

  return (
    <Page>
      {data?.recentTopics.map((topic) => {
        return (
          <ForumCard
            key={forum.id}
            category={category.cat_name ?? ''}
            header={forum.forum_name ?? ''}
            blurb={forum.forum_desc ?? ''}
            lastPost={forum.last_post ?? new Date().getTime()}
            lastPostUsername={forum.last_poster ?? ''}
            posts={forum.num_posts ?? 0}
            topics={forum.num_topics ?? 0}
          />
        );
      })}
      ;
    </Page>
  );
});

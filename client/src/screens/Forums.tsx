import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { ForumTabProps } from '../navigation/ForumTabs';
import { ForumCard } from '../comps/ForumCard';
import { useQuery, PunbbForumModelType } from '../models';
import { CentreLoading } from '../comps/CentreLoading';
import { clearTokenInHeader } from '../graphql/client';

export const Forums = observer(() => {
  const { data, loading, error } = useQuery((store) =>
    store.queryCategories({}, (categories) =>
      // prettier-ignore
      categories
        .cat_name
        .disp_position
        .punbb_forums((forum) =>
          forum.disp_position
            .forum_desc
            .forum_name
            .last_post
            .last_post_id
            .last_poster
            .num_posts
            .num_topics,
      ),
    ),
  );
  const navigation = useNavigation<ForumTabProps>();

  if (error) {
    // TODO: move this to not auth middleware of sorts + read correct http status for not auth
    if (error.toString().indexOf('Not Authorised') >= 0) {
      console.log(`Not auth, navigating Login after clearing token`);
      clearTokenInHeader();
      navigation.navigate('Login');
      return (
        <Page>
          <CentreLoading />
        </Page>
      );
    }
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
      {data?.categories.map((category) => {
        // TODO: forum should be typed?!
        return category.punbb_forums?.map((forum: PunbbForumModelType) => {
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
        });
      })}
    </Page>
  );
});

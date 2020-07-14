import React from 'react';
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { ForumCard } from '../comps/ForumCard';
import { useQuery, PunbbForumModelType } from '../models';
import { CentreLoadingPage } from '../comps/CentreLoadingPage';
import { AppStackParams } from '../navigation/AppStack';
import { MainStackParams } from '../navigation/MainStack';

type NavProps = CompositeNavigationProp<
  StackNavigationProp<AppStackParams, 'Login'>,
  StackNavigationProp<MainStackParams, 'ForumTabs'>
>;

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

  const navigation = useNavigation<NavProps>();

  if (error) {
    throw error;
  }

  if (loading) {
    return <CentreLoadingPage />;
  }

  return (
    <Page>
      <ScrollView style={styles.scroll}>
        {data?.categories.map(({ cat_name, punbb_forums }) => {
          // TODO: forum should be typed?!
          return punbb_forums?.map(
            ({
              id,
              forum_name,
              forum_desc,
              last_post,
              last_poster,
              num_posts,
              num_topics,
            }: PunbbForumModelType) => {
              return (
                <ForumCard
                  key={id}
                  category={cat_name ?? ''}
                  header={forum_name ?? ''}
                  blurb={forum_desc ?? ''}
                  lastPost={last_post ?? new Date().getTime()}
                  lastPoster={last_poster ?? ''}
                  posts={num_posts ?? 0}
                  topics={num_topics ?? 0}
                  onPress={() =>
                    navigation.navigate('Topics', {
                      forumId: id ?? 0,
                      forumName: forum_name ?? '',
                    })
                  }
                />
              );
            },
          );
        })}
      </ScrollView>
    </Page>
  );
});

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
});

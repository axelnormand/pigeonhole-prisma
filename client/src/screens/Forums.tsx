import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { ForumTabProps } from '../navigation/ForumTabs';
import { ForumCard } from '../comps/ForumCard';
import { useQuery } from '../models';
import { CentreLoading } from '../comps/CentreLoading';
import { clearTokenInHeader } from '../graphql/client';

export const Forums = observer(() => {
  const { data, loading, error } = useQuery((store) => store.queryCategories());
  const navigation = useNavigation<ForumTabProps>();

  if (error) {
    if (error.message.indexOf('Not Authorised') >= 0) {
      clearTokenInHeader();
      navigation.navigate('Home');
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
        category.punbb_forums?.map((forum) => {
          <ForumCard
            key={forum.id}
            header={forum.forum_name ?? ''}
            blurb={forum.forum_desc ?? ''}
            category={category.cat_name ?? ''}
            lastPost={new Date()}
            lastPostUsername="testingUser"
            posts={110}
            topics={11}
          />;
        });
      })}
    </Page>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

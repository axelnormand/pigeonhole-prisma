import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { useQuery } from '../models';
import { CentreLoadingPage } from '../comps/CentreLoadingPage';
import { TopicCard } from '../comps/TopicCard';
import { MainStackParams } from '../navigation/MainStack';

type NavProps = StackNavigationProp<MainStackParams, 'ForumTabs'>;

export const RecentTopics = observer(() => {
  const { data, loading, error } = useQuery((store) =>
    store.queryRecentTopics(),
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
      <FlatList
        style={styles.scroll}
        data={data?.recentTopics}
        keyExtractor={(item, index) => item.id?.toString() ?? `index-${index}`}
        renderItem={({ item }) => {
          const {
            id,
            subject,
            poster,
            last_poster,
            num_replies,
            last_post,
          } = item;
          return (
            <TopicCard
              key={id}
              subject={subject ?? ''}
              poster={poster ?? ''}
              lastPoster={last_poster ?? ''}
              replies={num_replies ?? 0}
              lastPost={last_post ?? new Date().getTime()}
              onPress={() =>
                navigation.navigate('Posts', {
                  topicId: id ?? 0,
                  topicName: subject ?? '',
                })
              }
            />
          );
        }}
      />
    </Page>
  );
});

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
});

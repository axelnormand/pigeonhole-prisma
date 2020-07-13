import React, { useEffect } from 'react';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StyleSheet, FlatList } from 'react-native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { useQuery } from '../models';
import { CentreLoadingPage } from '../comps/CentreLoadingPage';
import { MainStackParams } from '../navigation/MainStack';
import { TopicCard } from '../comps/TopicCard';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  route: RouteProp<MainStackParams, 'Topics'>;
};

type NavProps = StackNavigationProp<MainStackParams, 'Topics'>;

export const Topics = observer(({ route }: Props) => {
  const { forumId, forumName } = route.params;
  const { data, loading, error } = useQuery((store) =>
    store.queryTopics({ forumId }),
  );
  const navigation = useNavigation<NavProps>();

  useEffect(() => {
    navigation.setOptions({
      title: forumName,
    });
  }, [navigation, forumName]);

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
        data={data?.topics}
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

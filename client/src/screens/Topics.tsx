import React, { useEffect, useState, useContext } from 'react';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StyleSheet, FlatList } from 'react-native';
import { observer } from 'mobx-react';
import { Page } from '../comps/Page';
import { PunbbTopicModelType, StoreContext } from '../models';
import { CentreLoadingPage } from '../comps/CentreLoadingPage';
import { MainStackParams } from '../navigation/MainStack';
import { TopicCard } from '../comps/TopicCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { CentreLoading } from '../comps/CentreLoading';

type Props = {
  route: RouteProp<MainStackParams, 'Topics'>;
};

type NavProps = StackNavigationProp<MainStackParams, 'Topics'>;

export const Topics = observer(({ route }: Props) => {
  const { forumId, forumName } = route.params;
  const [cursor, setCursor] = useState<number | undefined>();
  const [nextCursor, setNextCursor] = useState<number | undefined>();
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [list, setList] = useState<PunbbTopicModelType[]>([]);
  const store = useContext(StoreContext);

  const navigation = useNavigation<NavProps>();

  //load data
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { topics } = await store.queryTopics({ forumId, cursor });
        setList([...list, ...topics]);
        setFirstLoad(false);
        setLoading(false);
        setNextCursor(topics.length ? topics[topics.length - 1].id : undefined);
      } catch (e) {
        setError(e);
      }
    })();
  }, [forumId, cursor]);

  const loadMore = () => {
    setCursor(nextCursor);
  };

  const refresh = () => {
    setList([]);
    setCursor(undefined);
  };

  console.log(`Render topics`, { loading, cursor, nextCursor });

  useEffect(() => {
    navigation.setOptions({
      title: forumName,
    });
  }, [navigation, forumName]);

  if (error) {
    throw error;
  }

  if (loading && firstLoad) {
    return <CentreLoadingPage />;
  }

  return (
    <Page>
      <FlatList
        style={styles.scroll}
        data={list}
        onRefresh={refresh}
        onEndReached={loadMore}
        refreshing={loading}
        ListFooterComponent={nextCursor ? <CentreLoading /> : null}
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

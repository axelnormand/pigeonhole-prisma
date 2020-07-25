import React, { Ref, useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { CentreLoadingPage } from './CentreLoadingPage';
import { CentreLoading } from './CentreLoading';

/** make sure can get next cursor using last element id in array */
type Item = {
  id: number | undefined;
};

type Props<T extends Item> = {
  fetch: (cursor?: number) => Promise<T[]>;
  renderItem: ListRenderItem<T>;
};

/**
 * abstracts so just need to provide a fetch function that takes in next cursor.
 *
 * can use pass in a ref and use FlatList ref functions to scroll
 */
export const CursorFlatList = <T extends Item>({
  fetch,
  renderItem,
}: Props<T>) => {
  const [list, setList] = useState<T[]>([]);
  const [cursor, setCursor] = useState<number>();
  const [nextCursor, setNextCursor] = useState<number>();
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  //const ref = useRef<FlatList<T>>();

  //load data
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(undefined);
        const data = await fetch(cursor);
        console.log(`FLATLIST`, { cursor, list, data });
        setList([...list, ...data]);
        setRefreshing(false);
        setLoading(false);
        setNextCursor(data.length ? data[data.length - 1].id : undefined);
      } catch (e) {
        setError(e);
      }
    })();
  }, [cursor]);

  const loadMore = () => {
    // set cursor to trigger useEffect
    setCursor(nextCursor);
  };

  const refresh = () => {
    //clear and re-fetch from beginning
    setList([]);
    setRefreshing(true);
    setCursor(undefined);
  };

  console.log(`Render CursorFlatList`, { loading, cursor, nextCursor });

  if (error) {
    throw error;
  }

  if (refreshing) {
    return <CentreLoadingPage />;
  }

  return (
    <FlatList
      style={styles.scroll}
      data={list}
      onRefresh={refresh}
      refreshing={refreshing}
      onEndReached={loadMore}
      ListFooterComponent={nextCursor ? <CentreLoading /> : null}
      keyExtractor={(item, index) => item.id?.toString() ?? `index-${index}`}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
});

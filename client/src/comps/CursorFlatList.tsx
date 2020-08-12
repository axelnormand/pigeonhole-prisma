import React, { useState, useEffect } from 'react';
import { Text, useTheme } from '@ui-kitten/components';
import { StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { CentreLoadingPage } from './CentreLoadingPage';
import { CentreLoading } from './CentreLoading';
import { CentreFin } from './CentreFin';

/** make sure can get next cursor using last element id in array */
type Item = {
  id: number | undefined;
};

type Props<T extends Item> = {
  fetch: (variables: { cursor?: number }) => Promise<T[]>;
  renderItem: ListRenderItem<T>;
};

enum LoadingState {
  none = 'none',
  loading = 'loading',
  refreshing = 'refreshing',
}

/**
 * abstracts so just need to provide a fetch function that takes in next cursor.
 *
 * can use pass in a ref and use FlatList ref functions to scroll
 */
export const CursorFlatList = <T extends Item>({
  fetch,
  renderItem,
}: Props<T>) => {
  const theme = useTheme();
  const background = theme['color-basic-800'];
  const [list, setList] = useState<T[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.none,
  );
  const [error, setError] = useState<Error>();
  const [hasMore, setHasMore] = useState(false);

  // loadMore on initial render
  useEffect(() => {
    loadMore();
    setInitialLoad(false);
  }, []);

  const loadMore = async () => {
    if (loadingState !== LoadingState.none) return;
    try {
      setLoadingState(LoadingState.loading);
      const cursor = list.length ? list[list.length - 1].id : undefined;
      const data = await fetch({ cursor });
      setHasMore((data.length && !!data[data.length - 1].id) || false);
      setList([...list, ...data]);
      setLoadingState(LoadingState.none);
    } catch (e) {
      setError(e);
    }
  };

  const refresh = async () => {
    try {
      //clear and re-fetch from beginning
      setLoadingState(LoadingState.refreshing);
      setList([]);
      const data = await fetch({ cursor: undefined });
      setList(data);
      setLoadingState(LoadingState.none);
    } catch (e) {
      setError(e);
    }
  };

  if (error) {
    throw error;
  }

  if (initialLoad) {
    return <CentreLoadingPage />;
  }

  return (
    <FlatList
      style={[styles.scroll, { backgroundColor: background }]}
      data={list}
      onRefresh={refresh}
      refreshing={loadingState === LoadingState.refreshing}
      onEndReached={hasMore ? loadMore : undefined}
      ListFooterComponent={
        hasMore ? (
          <CentreLoading />
        ) : loadingState === LoadingState.none ? (
          <CentreFin />
        ) : null
      }
      keyExtractor={(item, index) => item.id?.toString() ?? `index-${index}`}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
});

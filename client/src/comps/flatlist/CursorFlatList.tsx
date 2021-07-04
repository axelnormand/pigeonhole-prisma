import React, { useState, useEffect } from 'react';
import { useTheme } from '@ui-kitten/components';
import {  ListRenderItem } from 'react-native';
import { CentreLoadingPage } from '../CentreLoadingPage';
import { CentreLoading } from '../CentreLoading';
import { CentreFin } from '../CentreFin';
import { FlatList } from 'react-native';
import { Button } from '@ui-kitten/components';
import { DEFAULT_TAKE, LoadingState, styles, Item } from './common';


type Props<T extends Item> = {
  fetch: (variables: { cursor?: number, take: number }) => Promise<T[]>;
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
  const theme = useTheme();
  const background = theme['color-basic-800'];
  const [list, setList] = useState<T[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.none,
  );
  const [error, setError] = useState<Error>();
  const [hasMore, setHasMore] = useState(false);

  // loadMore on initial mount
  useEffect(() => {
    loadMore();
    setInitialLoad(false);
  }, []);

  const loadMore = async () => {
    if (loadingState !== LoadingState.none) return;
    try {
      // scrolling down
      setLoadingState(LoadingState.loading);
      const cursor = list.length ? list[list.length - 1].id : undefined;
      const data = await fetch({ cursor, take: DEFAULT_TAKE });
      setHasMore(data.length > 0);
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
      const data = await fetch({ cursor: undefined, take: DEFAULT_TAKE });
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
      onEndReached={() => {
        if (hasMore) loadMore();
      }}
      ListFooterComponent = {
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


import React, { useState, useEffect } from 'react';
import { useTheme } from '@ui-kitten/components';
import { StyleSheet, ListRenderItem } from 'react-native';
import { CentreLoadingPage } from '../CentreLoadingPage';
import { CentreLoading } from '../CentreLoading';
import { CentreFin } from '../CentreFin';
import { FlatList } from 'react-native';
import { Button } from '@ui-kitten/components';
import { DEFAULT_TAKE, Item, LoadingState, styles } from './common';



type Props<T extends Item> = {
  /**
   * resume position true to resume from last read page on initial load
   */
  fetch: (variables: { skip: number, take: number, resumePosition: boolean }) => Promise<T[]>;
  renderItem: ListRenderItem<T>;
};


/**
 * abstracts so just need to provide a fetch function that takes in skip and take for offset pagination.
 *
 * can use pass in a ref and use FlatList ref functions to scroll
 */
export const OffsetFlatList = <T extends Item>({
  fetch,
  renderItem,
}: Props<T>) => {
  const theme = useTheme();
  const background = theme['color-basic-800'];
  const [list, setList] = useState<T[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [resumePosition, setResumePosition] = useState(true);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.none,
  );
  const [error, setError] = useState<Error>();
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  // fetchPage on initial mount
  useEffect(() => {
    fetchPage();
    setInitialLoad(false);
    setResumePosition(false);
  }, []);

  const fetchPage = async () => {
    if (loadingState !== LoadingState.none) return;
    try {
      setLoadingState(LoadingState.loading);
      const data = await fetch({skip: pages * DEFAULT_TAKE, take: DEFAULT_TAKE, resumePosition });
      setPage(page+1);
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
      setPage(0);
      const data = await fetch({ skip: pages * DEFAULT_TAKE , take: DEFAULT_TAKE, resumePosition });
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
      ListFooterComponent = {
         page === pages && loadingState === LoadingState.none ? (
           <CentreFin />
         ) : null
      }
      keyExtractor={(item, index) => item.id?.toString() ?? `index-${index}`}
      renderItem={renderItem}
    />
  );
};

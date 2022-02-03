import React, { useState, useEffect } from 'react';
import { useTheme } from '@ui-kitten/components';
import { ListRenderItem, View, Text } from 'react-native';
import { CentreLoadingPage } from '../CentreLoadingPage';
import { FlatList } from 'react-native';
import { Button } from '@ui-kitten/components';
import { DEFAULT_TAKE, Item, LoadingState, styles } from './common';

type OffsetPage<T> = {
  items: T[] | undefined |null;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

type Props<T extends Item> = {
  /**
   * resume position true to resume from last read page on initial load
   */
  fetch: (variables: { skip: number, take: number, resumePosition: boolean }) => Promise<OffsetPage<T>>;
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
  const [items, setItems] = useState<T[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [resumePosition, setResumePosition] = useState(true);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.none,
  );
  const [error, setError] = useState<Error>();
  const [currentPage, setCurrentPage] = useState(-1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // fetchPage on initial mount
  useEffect(() => {
    fetchPage(true);
    setInitialLoad(false);
    setResumePosition(false);
  }, []);

  const fetchPage = async (isNext: boolean) => {
    if (loadingState !== LoadingState.none) return;
    try {
      setLoadingState(LoadingState.loading);
      const data = await fetch({skip: (currentPage + (isNext? 1 : -1)) * DEFAULT_TAKE, take: DEFAULT_TAKE, resumePosition });
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
      setItems(data.items ?? []);  
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
      data={items}
      ListFooterComponent={<Pagination currentPage={currentPage} totalItems={totalItems} totalPages={totalPages} onNext={() => fetchPage(true)} onPrev={() => fetchPage(false)}/>}
      keyExtractor={(item, index) => item.id?.toString() ?? `index-${index}`}
      renderItem={renderItem}
    />
  );
};

const Pagination: React.FC<{ currentPage: number; totalPages: number; totalItems: number, onNext: () => void; onPrev: () => void }> = ({ currentPage, totalPages, totalItems, onNext, onPrev }) => {
  return(
    <View>
      <Button onPress={onPrev} disabled={currentPage < 2}>Prev</Button>
      <Button onPress={onNext} disabled={currentPage >= totalPages}>Next</Button>
      <Text>Current: ${currentPage}</Text>
      <Text>Total Pages: ${totalPages}</Text>
      <Text>Total Items: ${totalItems}</Text>
    </View>
  )
}
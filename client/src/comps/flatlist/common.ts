import { StyleSheet } from 'react-native';

/** make sure can get next cursor using last element id in array */
export type Item = {
  id: number | undefined;
};

export const DEFAULT_TAKE = 20;

export enum LoadingState {
    none = 'none',
    loading = 'loading', 
    refreshing = 'refreshing',
  }
  
  export const styles = StyleSheet.create({
    scroll: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
    },
  });
  
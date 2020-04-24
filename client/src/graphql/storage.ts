import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const getKey = async (key: string): Promise<string | null> => {
  return Platform.OS === 'web'
    ? Promise.resolve(localStorage.getItem(key))
    : SecureStore.getItemAsync(key);
};

export const setKey = async (key: string, value: string) => {
  return Platform.OS === 'web'
    ? Promise.resolve(localStorage.setItem(key, value))
    : SecureStore.setItemAsync(key, value);
};

export const deleteKey = async (key: string) => {
  return Platform.OS === 'web'
    ? Promise.resolve(localStorage.deleteKey(key))
    : SecureStore.deleteItemAsync(key);
};

import { Storage } from './storage.d';
import * as SecureStore from 'expo-secure-store';

export const storage: Storage = {
  getKey: (key) => SecureStore.getItemAsync(key),
  setKey: (key, value) => SecureStore.setItemAsync(key, value),
  deleteKey: (key) => SecureStore.deleteItemAsync(key),
};

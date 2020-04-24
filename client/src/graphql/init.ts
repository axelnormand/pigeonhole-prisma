import { Platform } from 'react-native';
import { storage } from './storage.web';

enum key {
  bearer = 'bearer',
}

export const getBearerToken = async (): Promise<string | null> =>
  storage.getKey(key.bearer);

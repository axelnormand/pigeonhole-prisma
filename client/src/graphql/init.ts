import { Platform } from 'react-native';
import { getKey } from './storage';

enum key {
  bearer = 'bearer',
}

export const getBearerToken = async (): Promise<string | null> =>
  getKey(key.bearer);

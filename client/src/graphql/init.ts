import { getKey, setKey } from './storage';

enum key {
  bearer = 'bearer',
}

export const getBearerToken = async (): Promise<string | null> =>
  getKey(key.bearer);

export const setBearerToken = async (token: string) =>
  setKey(key.bearer, token);

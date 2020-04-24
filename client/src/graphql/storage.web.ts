import { Storage } from './storage.d';

export const storage: Storage = {
  getKey: (key) => Promise.resolve(localStorage.getItem(key)),
  setKey: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  deleteKey: (key) => Promise.resolve(localStorage.removeItem(key)),
};

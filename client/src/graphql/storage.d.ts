export interface Storage {
  getKey: (key: string) => Promise<string | null>;
  setKey: (key: string, value: string) => Promise<void>;
  deleteKey: (key: string) => Promise<void>;
}

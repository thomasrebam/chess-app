export interface PersistentStorageServiceInterface {
  getValue(key: string): string | undefined;
  setValue(key: string, value: string): void;
}

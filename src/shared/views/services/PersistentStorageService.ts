import {MMKV} from 'react-native-mmkv';
import {PersistentStorageServiceInterface} from './PersistentStorageService.interface';

const mmkvStorage = new MMKV();

export const PersistentStorageService: PersistentStorageServiceInterface = {
  getValue: (key: string): string | undefined => {
    return mmkvStorage.getString(key);
  },

  setValue: (key: string, value: string): void => {
    return mmkvStorage.set(key, value);
  },
};

import {createContext} from 'react';

export const LastMoveContext = createContext<{row: number; column: number}>({
  row: -1,
  column: -1,
});

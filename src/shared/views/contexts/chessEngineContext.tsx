import {Chess} from 'chess.js';
import {MutableRefObject, ReactNode, createContext} from 'react';

export const ChessEngineContext = createContext<{
  chess: MutableRefObject<Chess>;
}>({
  chess: {current: new Chess()},
});

interface ChessEngineProviderProps {
  children: ReactNode;
  value: {chess: MutableRefObject<Chess>};
}

export const ChessEngineProvider = ({
  children,
  value,
}: ChessEngineProviderProps) => {
  return (
    <ChessEngineContext.Provider value={value}>
      {children}
    </ChessEngineContext.Provider>
  );
};

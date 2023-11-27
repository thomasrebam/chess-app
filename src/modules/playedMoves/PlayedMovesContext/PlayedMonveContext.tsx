import {ReactNode, createContext, useState} from 'react';

export const PlayedMovesContext = createContext<{
  playedMoves: string[];
  // eslint-disable-next-line unused-imports/no-unused-vars
  addPlayedMove: (move: string) => void;
}>({
  playedMoves: [],
  addPlayedMove: (move: string) => {
    console.warn(
      `PlayedMovesContext.addPlayedMove was not initialized correctly with ${move}`,
    );
  },
});

interface PlayedMovesProviderProps {
  children: ReactNode;
}

export const PlayedMovesProvider = ({children}: PlayedMovesProviderProps) => {
  const [playedMoves, setPlayedMoves] = useState<string[]>([]);
  const addPlayedMove = (move: string) => {
    setPlayedMoves([...playedMoves, move]);
  };
  return (
    <PlayedMovesContext.Provider value={{playedMoves, addPlayedMove}}>
      {children}
    </PlayedMovesContext.Provider>
  );
};

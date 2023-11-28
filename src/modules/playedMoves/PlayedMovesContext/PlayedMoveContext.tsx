import {ReactNode, createContext, useState} from 'react';

export const PlayedMovesContext = createContext<{
  playedMoves: string[];
  // eslint-disable-next-line unused-imports/no-unused-vars
  addPlayedMove: (move: string) => void;
  removeLastMove: () => void;
}>({
  playedMoves: [],
  addPlayedMove: (move: string) => {
    console.warn(
      `PlayedMovesContext.addPlayedMove was not initialized correctly with ${move}`,
    );
  },
  removeLastMove: () => undefined,
});

interface PlayedMovesProviderProps {
  children: ReactNode;
}

export const PlayedMovesProvider = ({children}: PlayedMovesProviderProps) => {
  const [playedMoves, setPlayedMoves] = useState<string[]>([]);
  const addPlayedMove = (move: string) => {
    if (playedMoves.length % 2 === 0) {
      move = ` ${playedMoves.length / 2 + 1}. ${move}`;
    }
    setPlayedMoves([...playedMoves, ` ${move}`]);
  };
  const removeLastMove = () => {
    setPlayedMoves(playedMoves.slice(0, playedMoves.length - 1));
  };
  return (
    <PlayedMovesContext.Provider
      value={{playedMoves, addPlayedMove, removeLastMove}}>
      {children}
    </PlayedMovesContext.Provider>
  );
};

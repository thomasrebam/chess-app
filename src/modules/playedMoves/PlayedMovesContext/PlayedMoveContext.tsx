/* eslint-disable unused-imports/no-unused-vars */
import {ReactNode, createContext, useState} from 'react';
import {
  MovesTree,
  emptyMovesTree,
} from '../../../shared/domain/entities/MovesTree';
import {addMoveToMovesTree} from '../../../shared/views/helpers/addMoveToMovesTree';

export const PlayedMovesContext = createContext<{
  playedMoves: MovesTree;
  currentMoveKey: string;
  addPlayedMove: ({
    move,
    fen,
    squareTo,
  }: {
    move: string;
    fen: string;
    squareTo: string;
  }) => void;
  removeLastMove: () => void;
  setCurrentMoveKey: (key: string) => void;
}>({
  playedMoves: JSON.parse(JSON.stringify(emptyMovesTree)),
  currentMoveKey: Object.keys({...emptyMovesTree})[0],
  addPlayedMove: ({move, fen}: {move: string; fen: string}) => {
    console.warn(
      `PlayedMovesContext.addPlayedMove was not initialized correctly with ${move} and ${fen}`,
    );
  },
  removeLastMove: () => undefined,
  setCurrentMoveKey: (key: string) => {
    console.warn(
      `PlayedMovesContext.setCurrentMoveKey was not initialized correctly with ${key}`,
    );
  },
});

interface PlayedMovesProviderProps {
  children: ReactNode;
}

export const PlayedMovesProvider = ({children}: PlayedMovesProviderProps) => {
  const [playedMoves, setPlayedMoves] = useState<MovesTree>(
    JSON.parse(JSON.stringify(emptyMovesTree)),
  );
  const [currentMoveKey, setCurrentMoveKey] = useState<string>(
    Object.keys(emptyMovesTree)[0],
  );
  const addPlayedMove = ({
    move,
    fen,
    squareTo,
  }: {
    move: string;
    fen: string;
    squareTo: string;
  }) => {
    if (!move.includes(' ')) {
      if (playedMoves[currentMoveKey].moveDepth % 2 === 0) {
        move = ` ${playedMoves[currentMoveKey].moveDepth / 2 + 1}. ${move}`;
      } else {
        move = ` ${move}`;
      }
    }
    const {tree, key} = addMoveToMovesTree({
      tree: playedMoves,
      move,
      fen,
      parentKey: currentMoveKey,
      squareTo,
    });
    setPlayedMoves(tree);
    setCurrentMoveKey(key);
  };
  const removeLastMove = () => {
    setCurrentMoveKey(playedMoves[currentMoveKey].parentKey);
  };
  return (
    <PlayedMovesContext.Provider
      value={{
        playedMoves,
        currentMoveKey,
        addPlayedMove,
        removeLastMove,
        setCurrentMoveKey,
      }}>
      {children}
    </PlayedMovesContext.Provider>
  );
};

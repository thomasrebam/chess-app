import {ReactNode, createContext, useState} from 'react';
import {
  MovesTree,
  emptyMovesTree,
} from '../../../shared/domain/entities/MovesTree';
import {addMoveToMovesTree} from '../../../shared/views/helpers/addMoveToMovesTree';

export const PlayedMovesContext = createContext<{
  playedMoves: MovesTree;
  currentMoveKey: string;
  // eslint-disable-next-line unused-imports/no-unused-vars
  addPlayedMove: ({move, fen}: {move: string; fen: string}) => void;
  removeLastMove: () => void;
}>({
  playedMoves: JSON.parse(JSON.stringify(emptyMovesTree)),
  currentMoveKey: Object.keys({...emptyMovesTree})[0],
  addPlayedMove: ({move, fen}: {move: string; fen: string}) => {
    console.warn(
      `PlayedMovesContext.addPlayedMove was not initialized correctly with ${move} and ${fen}`,
    );
  },
  removeLastMove: () => undefined,
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
  const addPlayedMove = ({move, fen}: {move: string; fen: string}) => {
    if (playedMoves[currentMoveKey].moveDepth % 2 === 0) {
      move = ` ${playedMoves[currentMoveKey].moveDepth / 2 + 1}. ${move}`;
    } else {
      move = ` ${move}`;
    }
    const {tree, key} = addMoveToMovesTree({
      tree: playedMoves,
      move,
      fen,
      parentKey: currentMoveKey,
    });
    setPlayedMoves(tree);
    setCurrentMoveKey(key);
  };
  const removeLastMove = () => {
    setCurrentMoveKey(playedMoves[currentMoveKey].parentKey);
  };
  return (
    <PlayedMovesContext.Provider
      value={{playedMoves, currentMoveKey, addPlayedMove, removeLastMove}}>
      {children}
    </PlayedMovesContext.Provider>
  );
};

/* eslint-disable unused-imports/no-unused-vars */
import {ReactNode, createContext, useState} from 'react';
import {
  EMPTY_MOVES_TREE_ROOT,
  MovesTree,
  emptyMovesTree,
  getEmptyMovesTree,
} from '../../../shared/domain/entities/MovesTree';
import {addMoveToMovesTree} from '../../../shared/views/helpers/addMoveToMovesTree';
import {removePlayedMoveFromTree} from '../../../shared/views/helpers/removePlayedMoveFromTree';

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
  goBackToLastMove: () => void;
  setCurrentMoveKey: (key: string) => void;
  removePlayedMove: (moveKey: string) => void;
}>({
  playedMoves: getEmptyMovesTree(),
  currentMoveKey: Object.keys({...emptyMovesTree})[0],
  addPlayedMove: ({move, fen}: {move: string; fen: string}) => {
    console.warn(
      `PlayedMovesContext.addPlayedMove was not initialized correctly with ${move} and ${fen}`,
    );
  },
  goBackToLastMove: () => undefined,
  setCurrentMoveKey: (key: string) => {
    console.warn(
      `PlayedMovesContext.setCurrentMoveKey was not initialized correctly with ${key}`,
    );
  },
  removePlayedMove: (moveKey: string) => {
    console.warn(
      `PlayedMovesContext.removePlayedMove was not initialized correctly with ${moveKey}`,
    );
  },
});

interface PlayedMovesProviderProps {
  children: ReactNode;
  value: {playedMoves?: MovesTree};
}

export const PlayedMovesProvider = ({
  children,
  value,
}: PlayedMovesProviderProps) => {
  const [playedMoves, setPlayedMoves] = useState<MovesTree>(
    value.playedMoves ? value.playedMoves : getEmptyMovesTree(),
  );
  const [currentMoveKey, setCurrentMoveKey] = useState<string>(
    EMPTY_MOVES_TREE_ROOT,
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
  const goBackToLastMove = () => {
    setCurrentMoveKey(playedMoves[currentMoveKey].parentKey);
  };

  const removePlayedMove = (moveKey: string) => {
    setPlayedMoves(prevPlayedMoves =>
      removePlayedMoveFromTree({tree: prevPlayedMoves, moveKey}),
    );
  };
  return (
    <PlayedMovesContext.Provider
      value={{
        playedMoves,
        currentMoveKey,
        addPlayedMove,
        goBackToLastMove,
        setCurrentMoveKey,
        removePlayedMove,
      }}>
      {children}
    </PlayedMovesContext.Provider>
  );
};

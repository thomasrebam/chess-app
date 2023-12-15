import {useContext, useEffect, useState} from 'react';
import {ChessBoard} from '../../../shared/views/components/ChessBoard/ChessBoard';
import {PlayedMovesContext} from '../../playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessEngineContext} from '../../../shared/views/contexts/ChessEngineContext';
import {
  MovesTree,
  emptyMovesTree,
} from '../../../shared/domain/entities/MovesTree';
import {cleanMove} from '../../../shared/views/helpers/cleanMove';
import {Move} from 'chess.js';

interface TestingBoardProps {
  movesTree: MovesTree;
}

export const TestingBoard = ({movesTree}: TestingBoardProps) => {
  const [currentTestMoveKey, setCurrentTestMoveKey] = useState(
    Object.keys(emptyMovesTree)[0],
  );
  // eslint-disable-next-line unused-imports/no-unused-vars
  const {addPlayedMove, currentMoveKey} = useContext(PlayedMovesContext);
  const {chess} = useContext(ChessEngineContext);

  useEffect(() => {
    const history = chess.current.history({verbose: true});
    if (movesTree[currentTestMoveKey].children.length === 0) {
      return;
    } else {
      if (checkRealisedMove({history, movesTree, currentTestMoveKey})) {
        const realisedMoveKey = movesTree[currentTestMoveKey].children[0];
        if (movesTree[realisedMoveKey].children.length === 0) {
          return;
        }
        const automaticMoveKey = getNextMove({movesTree, realisedMoveKey});
        const automaticMove = movesTree[automaticMoveKey];
        chess.current.move(cleanMove(automaticMove.move));
        const newHistory = chess.current.history({verbose: true});
        addPlayedMove({
          move: automaticMove.move,
          fen: chess.current.fen(),
          squareTo: newHistory[newHistory.length - 1].to,
        });
        setCurrentTestMoveKey(automaticMoveKey);
      }
    }
  }, [
    chess,
    movesTree,
    currentTestMoveKey,
    currentMoveKey,
    setCurrentTestMoveKey,
    addPlayedMove,
  ]);
  return <ChessBoard />;
};

interface GetNextMoveProps {
  movesTree: MovesTree;
  realisedMoveKey: string;
}

const getNextMove = ({
  movesTree,
  realisedMoveKey,
}: GetNextMoveProps): string => {
  const possibleMovesNumber = movesTree[realisedMoveKey].children.length;
  const randomNumber = Math.floor(Math.random() * possibleMovesNumber);
  const automaticMoveKey = movesTree[realisedMoveKey].children[randomNumber];
  return automaticMoveKey;
};

interface CheckRealisedMoveProps {
  history: Move[];
  movesTree: MovesTree;
  currentTestMoveKey: string;
}

const checkRealisedMove = ({
  history,
  movesTree,
  currentTestMoveKey,
}: CheckRealisedMoveProps): boolean => {
  let res = false;
  if (!history[history.length - 1]) {
    return res;
  }
  const realisedMove = history[history.length - 1];
  if (realisedMove.color === 'b') {
    return res;
  }
  movesTree[currentTestMoveKey].children.forEach(childKey => {
    if (cleanMove(movesTree[childKey].move) === realisedMove.san) {
      res = true;
    }
  });
  return res;
};

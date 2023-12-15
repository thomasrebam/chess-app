import {useContext, useEffect, useState} from 'react';
import {ChessBoard} from '../../../shared/views/components/ChessBoard/ChessBoard';
import {PlayedMovesContext} from '../../playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessEngineContext} from '../../../shared/views/contexts/ChessEngineContext';
import {
  MovesTree,
  emptyMovesTree,
} from '../../../shared/domain/entities/MovesTree';
import {cleanMove} from '../../../shared/views/helpers/cleanMove';

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
      if (
        history[history.length - 1] &&
        history[history.length - 1].color === 'w' &&
        history[history.length - 1].san ===
          cleanMove(movesTree[movesTree[currentTestMoveKey].children[0]].move)
      ) {
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

const getNextMove = ({movesTree, realisedMoveKey}: GetNextMoveProps) => {
  const possibleMovesNumber = movesTree[realisedMoveKey].children.length;
  const randomNumber = Math.floor(Math.random() * possibleMovesNumber);
  const automaticMoveKey = movesTree[realisedMoveKey].children[randomNumber];
  return automaticMoveKey;
};

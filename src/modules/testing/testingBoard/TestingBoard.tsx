import {useContext, useEffect, useState} from 'react';
import {ChessBoard} from '../../../shared/views/components/ChessBoard/ChessBoard';
import {PlayedMovesContext} from '../../playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessEngineContext} from '../../../shared/views/contexts/ChessEngineContext';
import {
  MovesTree,
  emptyMovesTree,
} from '../../../shared/domain/entities/MovesTree';
import {cleanMove} from '../../../shared/views/helpers/cleanMove';
import {getNextMove} from '../helpers/getNextMove';
import {checkRealisedMove} from '../helpers/checkRealisedMove';
import {TestingModal} from '../testingModal/TestingModal';

interface TestingBoardProps {
  movesTree: MovesTree;
  onCorrectMove: () => void;
  onIncorrectMove: () => void;
}

export const TestingBoard = ({
  movesTree,
  onCorrectMove,
  onIncorrectMove,
}: TestingBoardProps) => {
  const [currentTestMoveKey, setCurrentTestMoveKey] = useState(
    Object.keys(emptyMovesTree)[0],
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    playedMoves,
    addPlayedMove,
    currentMoveKey,
    removePlayedMove,
    goBackToLastMove,
  } = useContext(PlayedMovesContext);
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
        onCorrectMove();
      } else {
        if (
          history[history.length - 1] &&
          history[history.length - 1].color === 'w'
        ) {
          onIncorrectMove();
          setIsModalVisible(true);
        }
      }
    }
  }, [
    chess,
    movesTree,
    currentTestMoveKey,
    currentMoveKey,
    setCurrentTestMoveKey,
    addPlayedMove,
    onCorrectMove,
    onIncorrectMove,
  ]);

  const onPressClose = () => {
    setIsModalVisible(false);
    const parentKey = playedMoves[currentMoveKey].parentKey;
    chess.current.load(playedMoves[parentKey].fen);
    removePlayedMove(currentMoveKey);
    goBackToLastMove();
  };
  return (
    <>
      <ChessBoard />
      <TestingModal
        isModalVisible={isModalVisible}
        onPressClose={onPressClose}
      />
    </>
  );
};

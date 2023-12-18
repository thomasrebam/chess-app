import {useContext, useEffect, useState} from 'react';
import {ChessBoard} from '../../../shared/views/components/ChessBoard/ChessBoard';
import {PlayedMovesContext} from '../../playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessEngineContext} from '../../../shared/views/contexts/ChessEngineContext';
import {
  EMPTY_MOVES_TREE_ROOT,
  MovesTree,
} from '../../../shared/domain/entities/MovesTree';
import {cleanMove} from '../../../shared/views/helpers/cleanMove';
import {getNextMove} from '../helpers/getNextMove';
import {checkRealisedMove} from '../helpers/checkRealisedMove';
import {ErrorTestingModal} from '../testingModal/ErrorTestingModal';
import {getRealisedMove} from '../helpers/getRealisedMove';
import {PlayerColorContext} from '../../../shared/views/contexts/PlayerColorContext';

interface TestingBoardProps {
  movesTree: MovesTree;
  onCorrectMove: () => void;
  onIncorrectMove: () => void;
  onLastMove: () => void;
}

export const TestingBoard = ({
  movesTree,
  onCorrectMove,
  onIncorrectMove,
  onLastMove,
}: TestingBoardProps) => {
  const {playerColor} = useContext(PlayerColorContext);
  const {
    playedMoves,
    addPlayedMove,
    currentMoveKey,
    removePlayedMove,
    goBackToLastMove,
  } = useContext(PlayedMovesContext);
  const {chess} = useContext(ChessEngineContext);

  const [currentTestMoveKey, setCurrentTestMoveKey] = useState(
    playerColor === 'w'
      ? EMPTY_MOVES_TREE_ROOT
      : movesTree[EMPTY_MOVES_TREE_ROOT].children[0],
  );
  const [hasPlayedFirstMove, setHasPlayedFirstMove] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const history = chess.current.history({verbose: true});
    if (!hasPlayedFirstMove && playerColor === 'b') {
      const automaticFirstMoveForWhite = cleanMove(
        movesTree[currentTestMoveKey].move,
      );
      chess.current.move(automaticFirstMoveForWhite);
      addPlayedMove({
        move: movesTree[currentTestMoveKey].move,
        fen: chess.current.fen(),
        squareTo: movesTree[currentTestMoveKey].squareTo,
      });
      setHasPlayedFirstMove(true);
      return;
    }
    if (movesTree[currentTestMoveKey].children.length === 0) {
      onLastMove();
      return;
    } else {
      if (
        checkRealisedMove({history, movesTree, currentTestMoveKey, playerColor})
      ) {
        const realisedMoveKey = getRealisedMove({
          history,
          movesTree,
          currentMoveKey: currentTestMoveKey,
        });
        if (movesTree[realisedMoveKey].children.length === 0) {
          onLastMove();
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
          history[history.length - 1].color === playerColor
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
    onLastMove,
    playerColor,
    hasPlayedFirstMove,
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
      <ErrorTestingModal
        isModalVisible={isModalVisible}
        onPressClose={onPressClose}
      />
    </>
  );
};

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
import {
  incrementKnowledge,
  resetKnowledge,
} from '../helpers/incrementsKnowledge';
import {saveMovesInStorage} from '../../analysis/helpers/saveMovesInStorage';

interface TestingBoardProps {
  movesTree: MovesTree;
  onCorrectMove: () => void;
  onIncorrectMove: () => void;
  onLastMove: () => void;
  analysisName: string;
}

export const TestingBoard = ({
  movesTree,
  onCorrectMove,
  onIncorrectMove,
  onLastMove,
  analysisName,
}: TestingBoardProps) => {
  // TODO: Idea is => you have 7 levels of knowledge (1 to 7).
  // We will check first the level 1. If all level 1 are checked, we check the level 2 etc...
  // If you successfully play a level 1, it is marked as a level 2
  // If you fail a level 3, it goes down to level 1.
  // IDEA: put a global knowledge score on each testing sesssion

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
      incrementKnowledge({moveKey: currentTestMoveKey, movesTree});
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

        incrementKnowledge({moveKey: realisedMoveKey, movesTree});
        incrementKnowledge({moveKey: currentTestMoveKey, movesTree});
        saveMovesInStorage({
          playedMoves: movesTree,
          textInputValue: analysisName,
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

          resetKnowledge({movesTree, moveKey: currentTestMoveKey});
          movesTree[currentTestMoveKey].children.forEach(childKey => {
            resetKnowledge({movesTree, moveKey: childKey});
          });
          saveMovesInStorage({
            playedMoves: movesTree,
            textInputValue: analysisName,
          });

          setIsModalVisible(true);
        }
      }
    }
  }, [
    chess,
    movesTree,
    currentTestMoveKey,
    addPlayedMove,
    onCorrectMove,
    onIncorrectMove,
    onLastMove,
    playerColor,
    hasPlayedFirstMove,
    analysisName,
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

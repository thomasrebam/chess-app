import {Color, Move} from 'chess.js';
import {MovesTree} from '../../../shared/domain/entities/MovesTree';
import {cleanMove} from '../../../shared/views/helpers/cleanMove';

interface CheckRealisedMoveProps {
  history: Move[];
  movesTree: MovesTree;
  currentTestMoveKey: string;
  playerColor: Color;
}

export const checkRealisedMove = ({
  history,
  movesTree,
  currentTestMoveKey,
  playerColor,
}: CheckRealisedMoveProps): boolean => {
  let res = false;
  if (!history[history.length - 1]) {
    return res;
  }
  const realisedMove = history[history.length - 1];
  if (realisedMove.color !== playerColor) {
    return res;
  }

  movesTree[currentTestMoveKey].children.forEach(childKey => {
    if (cleanMove(movesTree[childKey].move) === realisedMove.san) {
      res = true;
    }
  });
  return res;
};

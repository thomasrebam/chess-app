import {Move} from 'chess.js';
import {MovesTree} from '../../../shared/domain/entities/MovesTree';
import {cleanMove} from '../../../shared/views/helpers/cleanMove';

interface GetRealisedMoveProps {
  history: Move[];
  movesTree: MovesTree;
  currentMoveKey: string;
}

export const getRealisedMove = ({
  history,
  movesTree,
  currentMoveKey,
}: GetRealisedMoveProps): string => {
  const realisedMoveKey = movesTree[currentMoveKey].children.find(childKey => {
    return (
      cleanMove(movesTree[childKey].move) === history[history.length - 1].san
    );
  });

  return realisedMoveKey ? realisedMoveKey : '';
};

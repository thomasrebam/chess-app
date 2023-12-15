import {MovesTree} from '../../../shared/domain/entities/MovesTree';

interface GetNextMoveProps {
  movesTree: MovesTree;
  realisedMoveKey: string;
}

export const getNextMove = ({
  movesTree,
  realisedMoveKey,
}: GetNextMoveProps): string => {
  const possibleMovesNumber = movesTree[realisedMoveKey].children.length;
  const randomNumber = Math.floor(Math.random() * possibleMovesNumber);
  const automaticMoveKey = movesTree[realisedMoveKey].children[randomNumber];
  return automaticMoveKey;
};

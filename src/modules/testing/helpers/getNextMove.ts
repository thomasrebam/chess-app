import {MovesTree} from '../../../shared/domain/entities/MovesTree';
import {computeKnowledgeLevelToChoose} from './computeKnowledgeScores';

interface GetNextMoveProps {
  movesTree: MovesTree;
  realisedMoveKey: string;
}

export const getNextMove = ({
  movesTree,
  realisedMoveKey,
}: GetNextMoveProps): string => {
  const movesWithCoeff = movesTree[realisedMoveKey].children.map(childKey => {
    return {
      move: childKey,
      coefficient:
        8 -
        computeKnowledgeLevelToChoose({
          movesTree,
          moveKey: childKey,
        }),
    };
  });
  const totalNumberOfOptions = movesWithCoeff.reduce((acc: number, move) => {
    return acc + move.coefficient;
  }, 0);
  const choosenOption = Math.floor(Math.random() * totalNumberOfOptions);
  let movesWithCoeffAccumulator = 0;
  let automaticMoveKey: string = movesWithCoeff[0].move;
  let isAutomaticMoveKeyFound = false;
  movesWithCoeff.forEach(mwc => {
    movesWithCoeffAccumulator += mwc.coefficient;
    if (
      movesWithCoeffAccumulator >= choosenOption &&
      !isAutomaticMoveKeyFound
    ) {
      automaticMoveKey = mwc.move;
      isAutomaticMoveKeyFound = true;
    }
  });
  return automaticMoveKey;
};

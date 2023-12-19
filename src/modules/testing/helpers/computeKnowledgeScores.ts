import {MovesTree} from '../../../shared/domain/entities/MovesTree';

interface ComputeKnowledgeScoreProps {
  moveKey: string;
  movesTree: MovesTree;
}

export const computeKnowledgeLevelToChoose = ({
  moveKey,
  movesTree,
}: ComputeKnowledgeScoreProps): number => {
  const currentMove = movesTree[moveKey];
  if (currentMove.children.length === 0) {
    return Number(currentMove.knowledgeLevel);
  } else {
    // The total score is calculated as the average of the scores of the children
    // Where we include the knowledge level of the direct children, as half of the total score
    // of it and its children
    const totalScore = currentMove.children.reduce((acc: number, childKey) => {
      return (
        acc +
        (computeKnowledgeLevelToChoose({movesTree, moveKey: childKey}) +
          Number(movesTree[childKey].knowledgeLevel)) /
          2
      );
    }, 0);
    return totalScore / currentMove.children.length;
  }
};

export const computeKnowledgeScore = ({movesTree}: {movesTree: MovesTree}) => {
  const moves = Object.values(movesTree).filter(
    move => move.parentKey !== '-1',
  );
  return (
    moves.reduce((acc: number, move) => {
      return acc + Number(move.knowledgeLevel);
    }, 0) / moves.length
  );
};

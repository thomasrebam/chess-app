import {MovesTree} from '../../../shared/domain/entities/MovesTree';

interface ComputeKnowledgeScoreProps {
  moveKey: string;
  movesTree: MovesTree;
}

export const computeKnowledgeScore = ({
  moveKey,
  movesTree,
}: ComputeKnowledgeScoreProps): number => {
  const currentMove = movesTree[moveKey];
  if (currentMove.children.length === 0) {
    return Number(currentMove.knowledgeLevel);
  } else {
    const totalScore = currentMove.children.reduce((acc: number, childKey) => {
      return acc + computeKnowledgeScore({movesTree, moveKey: childKey});
    }, 0);
    return totalScore / currentMove.children.length;
  }
};

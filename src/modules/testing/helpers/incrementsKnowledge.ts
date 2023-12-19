import {MovesTree} from '../../../shared/domain/entities/MovesTree';

interface IncrementKnowledgeProps {
  movesTree: MovesTree;
  moveKey: string;
}

export const incrementKnowledge = ({
  moveKey,
  movesTree,
}: IncrementKnowledgeProps): void => {
  switch (movesTree[moveKey].knowledgeLevel) {
    case '1':
      movesTree[moveKey].knowledgeLevel = '2';
      break;
    case '2':
      movesTree[moveKey].knowledgeLevel = '3';
      break;
    case '3':
      movesTree[moveKey].knowledgeLevel = '4';
      break;
    case '4':
      movesTree[moveKey].knowledgeLevel = '5';
      break;
    case '5':
      movesTree[moveKey].knowledgeLevel = '6';
      break;
    case '6':
      movesTree[moveKey].knowledgeLevel = '7';
      break;
    case '7':
      break;
  }
};

export const resetKnowledge = ({
  moveKey,
  movesTree,
}: IncrementKnowledgeProps): void => {
  movesTree[moveKey].knowledgeLevel = '1';
};

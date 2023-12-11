import {MovesTree} from '../../domain/entities/MovesTree';

interface RemovePlayedMoveFromTreeProps {
  tree: MovesTree;
  moveKey: string;
}

export const removePlayedMoveFromTree = ({
  tree,
  moveKey,
}: RemovePlayedMoveFromTreeProps): MovesTree => {
  // Cut the move from its parent
  let parentKey: string;
  if (Object.keys(tree).includes(moveKey)) {
    parentKey = tree[moveKey].parentKey;
    const children = tree[parentKey].children.filter(
      childKey => childKey !== moveKey,
    );
    tree[parentKey].children = children;
  }
  return tree;
};

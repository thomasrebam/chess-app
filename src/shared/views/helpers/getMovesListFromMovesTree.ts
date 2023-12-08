import {MovesTree, emptyMovesTree} from '../../domain/entities/MovesTree';

export const getMovesListFromMovesTree = ({
  tree,
  currentMoveKey,
}: {
  tree: MovesTree;
  currentMoveKey: string;
}): Array<string> => {
  if (currentMoveKey === Object.keys(emptyMovesTree)[0]) {
    return [];
  } else {
    return getMovesListFromMovesTree({
      tree,
      currentMoveKey: tree[currentMoveKey].parentKey,
    }).concat(tree[currentMoveKey].move);
  }
};

export const getCompleteMovesListFromMovesTree = ({
  tree,
  currentMoveKey = Object.keys(emptyMovesTree)[0],
}: {
  tree: MovesTree;
  currentMoveKey?: string;
}): Array<{key: string; move: string}> => {
  if (tree[currentMoveKey].children.length > 0) {
    const nextMoveKey = tree[currentMoveKey].children[0];
    if (currentMoveKey === Object.keys(emptyMovesTree)[0]) {
      return getCompleteMovesListFromMovesTree({
        tree,
        currentMoveKey: nextMoveKey,
      });
    } else {
      return [
        {key: currentMoveKey, move: tree[currentMoveKey].move},
        ...getCompleteMovesListFromMovesTree({
          tree,
          currentMoveKey: nextMoveKey,
        }),
      ];
    }
  } else {
    return [{key: currentMoveKey, move: tree[currentMoveKey].move}];
  }
};

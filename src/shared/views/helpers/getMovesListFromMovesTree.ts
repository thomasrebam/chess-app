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

type MovesList = Array<{key: string; move: string}>;

export const getCompleteMovesListFromMovesTree = ({
  tree,
  currentMoveKey = Object.keys(emptyMovesTree)[0],
}: {
  tree: MovesTree;
  currentMoveKey?: string;
}): MovesList => {
  const currentMove = tree[currentMoveKey];
  if (currentMove.children.length > 0) {
    const nextMoveKey = tree[currentMoveKey].children[0];
    if (currentMoveKey === Object.keys(emptyMovesTree)[0]) {
      return getCompleteMovesListFromMovesTree({
        tree,
        currentMoveKey: nextMoveKey,
      });
    } else {
      if (currentMove.children.length > 1) {
        const [mainMove, ...variants] = currentMove.children;
        const variantsResponse = variants.reduce(
          (acc: MovesList, childKey) => [
            ...acc,
            ...getCompleteMovesListFromMovesTree({
              tree,
              currentMoveKey: childKey,
            }),
          ],
          [],
        );
        const [firstMainMove, ...restMainMove] =
          getCompleteMovesListFromMovesTree({tree, currentMoveKey: mainMove});
        return [
          {key: currentMoveKey, move: currentMove.move},
          firstMainMove,
          {key: 'leftParenthesis', move: '('},
          ...variantsResponse,
          {key: 'rightParenthesis', move: ')'},
          ...restMainMove,
        ];
      }
      return [
        {key: currentMoveKey, move: currentMove.move},
        ...getCompleteMovesListFromMovesTree({
          tree,
          currentMoveKey: nextMoveKey,
        }),
      ];
    }
  } else {
    return [{key: currentMoveKey, move: currentMove.move}];
  }
};

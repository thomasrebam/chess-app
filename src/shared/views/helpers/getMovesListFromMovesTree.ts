import {
  EMPTY_MOVES_TREE_ROOT,
  MovesTree,
} from '../../domain/entities/MovesTree';

export const getMovesListFromMovesTree = ({
  tree,
  currentMoveKey,
}: {
  tree: MovesTree;
  currentMoveKey: string;
}): Array<string> => {
  if (currentMoveKey === EMPTY_MOVES_TREE_ROOT) {
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
  currentMoveKey = EMPTY_MOVES_TREE_ROOT,
}: {
  tree: MovesTree;
  currentMoveKey?: string;
}): MovesList => {
  const currentMove = tree[currentMoveKey];
  if (currentMove.children.length > 0) {
    const nextMoveKey = tree[currentMoveKey].children[0];
    if (currentMoveKey === EMPTY_MOVES_TREE_ROOT) {
      return getCompleteMovesListFromMovesTree({
        tree,
        currentMoveKey: nextMoveKey,
      });
    } else {
      if (currentMove.children.length > 1) {
        const variantsResponse = currentMove.children.reduce(
          (acc: MovesList, childKey) => [
            ...acc,
            {key: 'leftParenthesis', move: '('},
            ...getCompleteMovesListFromMovesTree({
              tree,
              currentMoveKey: childKey,
            }),
            {key: 'rightParenthesis', move: ')'},
          ],
          [],
        );
        return [
          {key: currentMoveKey, move: currentMove.move},
          ...variantsResponse,
        ];
      } else {
        return [
          {key: currentMoveKey, move: currentMove.move},
          ...getCompleteMovesListFromMovesTree({
            tree,
            currentMoveKey: nextMoveKey,
          }),
        ];
      }
    }
  } else {
    return [{key: currentMoveKey, move: currentMove.move}];
  }
};

type MovesListWithDepth = {movesList: MovesList; depth: number};

export const getMovesListToDisplay = ({
  tree,
}: {
  tree: MovesTree;
}): MovesListWithDepth[] => {
  const movesList = getCompleteMovesListFromMovesTree({tree});

  let currentMoveList: MovesList = [];
  let currentDepth = 0;
  const response: MovesListWithDepth[] = [];

  movesList.forEach(move => {
    if (move.key === 'leftParenthesis') {
      response.push({movesList: currentMoveList, depth: currentDepth});
      currentDepth++;
      currentMoveList = [];
    } else if (move.key === 'rightParenthesis') {
      response.push({movesList: currentMoveList, depth: currentDepth});
      currentDepth--;
      currentMoveList = [];
    } else {
      if (move.key !== EMPTY_MOVES_TREE_ROOT) {
        currentMoveList.push(move);
      }
    }
  });
  response.push({movesList: currentMoveList, depth: currentDepth});
  return response;
};

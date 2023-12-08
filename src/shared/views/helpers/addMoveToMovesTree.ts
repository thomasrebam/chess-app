import {MovesTree} from '../../domain/entities/MovesTree';
import {keyGenerator} from './keyGenerator';
// import keygen = require('keygen');

interface addMoveProps {
  tree: MovesTree;
  parentKey: string;
  move: string;
  fen: string;
}

export const addMoveToMovesTree = ({
  tree,
  parentKey,
  move,
  fen,
}: addMoveProps): {tree: MovesTree; key: string} => {
  const key = keyGenerator();
  if (!tree[parentKey]) {
    return {tree, key: '-1'};
  }
  const alreadyExists = tree[parentKey].children.find(
    childKey => tree[childKey].move === move,
  );
  if (alreadyExists) {
    return {tree, key: alreadyExists};
  }
  tree[parentKey].children.push(key);
  tree[key] = {
    move,
    fen,
    children: [],
    parentKey,
    player: tree[parentKey].player === 'w' ? 'b' : 'w',
    moveDepth: tree[parentKey].moveDepth + 1,
  };
  return {tree, key};
};

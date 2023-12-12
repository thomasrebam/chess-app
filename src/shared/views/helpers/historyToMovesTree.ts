import {Chess, Move} from 'chess.js';
import {MovesTree, emptyMovesTree} from '../../domain/entities/MovesTree';
import {keyGenerator} from './keyGenerator';

interface HistoryToMovesTreeProps {
  moves: Move[];
}

export const historyToMovesTree = ({
  moves,
}: HistoryToMovesTreeProps): MovesTree => {
  const chess = new Chess();
  const tree = JSON.parse(JSON.stringify(emptyMovesTree));
  let currentParentMoveKey = 'empty';
  let currentMoveKey = '';
  moves.forEach(move => {
    chess.move(move.san);

    currentMoveKey = keyGenerator();
    const moveDepth = tree[currentParentMoveKey].moveDepth + 1;

    tree[currentMoveKey] = {
      move:
        moveDepth % 2 === 1
          ? ` ${(moveDepth + 1) / 2}. ${move.san}`
          : ` ${move.san}`,
      fen: chess.fen(),
      children: [],
      parentKey: currentParentMoveKey,
      player: move.color,
      moveDepth: moveDepth,
      squareTo: move.to,
    };
    tree[currentParentMoveKey].children.push(currentMoveKey);

    currentParentMoveKey = currentMoveKey;
  });
  return tree;
};

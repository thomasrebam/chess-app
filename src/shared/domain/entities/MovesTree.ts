import {Player} from './Player';

type MoveInformation = {
  move: string;
  fen: string;
  children: string[];
  parentKey: string;
  player: Player;
  moveDepth: number;
  squareTo: string;
};

export type MovesTree = Record<string, MoveInformation>;

export const emptyMovesTree: MovesTree = {
  empty: {
    move: '',
    fen: '',
    player: 'b',
    children: [],
    parentKey: '-1',
    moveDepth: 0,
    squareTo: '',
  },
};

export const getEmptyMovesTree = (): MovesTree => {
  return JSON.parse(JSON.stringify(emptyMovesTree));
};

export const EMPTY_MOVES_TREE_ROOT: string = Object.keys(emptyMovesTree)[0];

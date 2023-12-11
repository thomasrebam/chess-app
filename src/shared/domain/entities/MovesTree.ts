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
    player: 'w',
    children: [],
    parentKey: '-1',
    moveDepth: 0,
    squareTo: '',
  },
};

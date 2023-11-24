import {Player} from './Player';

export type PieceName = 'k' | 'q' | 'r' | 'b' | 'n' | 'p';

export type ColoredPieceName = `${Player}${PieceName}`;

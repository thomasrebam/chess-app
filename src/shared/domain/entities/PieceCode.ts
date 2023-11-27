import {Player} from './Player';

export type PieceCode = 'k' | 'q' | 'r' | 'b' | 'n' | 'p';

export type ColoredPieceName = `${Player}${PieceCode}`;

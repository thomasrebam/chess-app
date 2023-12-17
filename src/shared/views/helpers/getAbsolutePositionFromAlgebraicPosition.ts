import {Color} from 'chess.js';
import {SIZE} from '../components/Piece/Piece';
import {getFileCodeFromFile} from './getFileCodeFromFile';

type AlgebraicPosition = {
  column: string;
  row: number;
  playerColor: Color;
};

export const getAbsolutePositionFromAlgebraicPosition = ({
  column,
  row,
  playerColor,
}: AlgebraicPosition) => {
  if (playerColor === 'w') {
    return {x: getFileCodeFromFile(column) * SIZE, y: (8 - row) * SIZE};
  } else {
    return {x: (7 - getFileCodeFromFile(column)) * SIZE, y: (row - 1) * SIZE};
  }
};

export const getAbsolutePositionFromAlgebraicNotation = (
  notation: string,
  playerColor: Color,
) => {
  const column = notation[0];
  const row = Number(notation[1]);
  return getAbsolutePositionFromAlgebraicPosition({column, row, playerColor});
};

export const getPositionFromAlgebraicNotation = (notation: string) => {
  const column = notation[0];
  const row = Number(notation[1]);
  return {row, column: getFileCodeFromFile(column)};
};

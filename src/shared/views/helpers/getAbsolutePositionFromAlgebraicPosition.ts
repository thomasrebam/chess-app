import {Color} from 'chess.js';
import {SIZE} from '../components/Piece/Piece';
import {getFileCodeFromFile} from './getFileCodeFromFile';

type AlgebraicPosition = {
  file: string;
  column: number;
  playerColor: Color;
};

export const getAbsolutePositionFromAlgebraicPosition = ({
  file,
  column,
  playerColor,
}: AlgebraicPosition) => {
  if (playerColor === 'w') {
    return {x: getFileCodeFromFile(file) * SIZE, y: (8 - column) * SIZE};
  } else {
    return {x: (7 - getFileCodeFromFile(file)) * SIZE, y: (column - 1) * SIZE};
  }
};

export const getAbsolutePositionFromAlgebraicNotation = (
  notation: string,
  playerColor: Color,
) => {
  const file = notation[0];
  const column = Number(notation[1]);
  return getAbsolutePositionFromAlgebraicPosition({file, column, playerColor});
};

export const getPositionFromAlgebraicNotation = (notation: string) => {
  const column = notation[0];
  const row = Number(notation[1]);
  return {row, column: getFileCodeFromFile(column)};
};

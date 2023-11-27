import {SIZE} from '../Piece/Piece';
import {getFileCodeFromFile} from './getFileCodeFromFile';

type AlgebraicPosition = {
  file: string;
  column: number;
};

export const getAbsolutePositionFromAlgebraicPosition = ({
  file,
  column,
}: AlgebraicPosition) => {
  return {x: getFileCodeFromFile(file) * SIZE, y: (8 - column) * SIZE};
};

export const getAbsolutePositionFromAlgebraicNotation = (notation: string) => {
  const file = notation[0];
  const column = Number(notation[1]);
  return getAbsolutePositionFromAlgebraicPosition({file, column});
};

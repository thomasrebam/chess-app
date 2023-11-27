import {SIZE} from '../Piece/Piece';
import {getFileCodeFromFile} from './getFileCodeFromFile';

export const getAbsolutePositionFromAlgebraicPosition = ({
  file,
  column,
}: {
  file: string;
  column: number;
}) => {
  return {x: getFileCodeFromFile(file) * SIZE, y: (8 - column) * SIZE};
};

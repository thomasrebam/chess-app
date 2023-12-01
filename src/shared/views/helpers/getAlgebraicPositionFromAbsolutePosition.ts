import {PositionNumber} from '../../domain/entities/PositionNumber';
import {SIZE} from '../components/Piece/Piece';

export const getAlgebraicPositionFromAbsolutePosition = (
  absolutePosition: PositionNumber,
) => {
  'worklet';
  const row = Math.round(absolutePosition.x / SIZE);
  const column = Math.round(absolutePosition.y / SIZE);
  const rowAlgebraic = String.fromCharCode('a'.charCodeAt(0) + row);
  const columnAlgebraic = 8 - column;
  return {
    complete: rowAlgebraic + columnAlgebraic.toString(),
    file: rowAlgebraic,
    column: columnAlgebraic,
  };
};

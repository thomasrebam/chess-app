import {PositionNumber} from '../../domain/entities/PositionNumber';
import {SIZE} from '../components/Piece/Piece';

export const getAlgebraicPositionFromAbsolutePosition = (
  absolutePosition: PositionNumber,
) => {
  'worklet';
  const column = Math.round(absolutePosition.x / SIZE);
  const row = Math.round(absolutePosition.y / SIZE);
  const columnAlgebraic = String.fromCharCode('a'.charCodeAt(0) + column);
  const rowAlgebraic = 8 - row;
  return {
    complete: columnAlgebraic + rowAlgebraic.toString(),
    column: columnAlgebraic,
    row: rowAlgebraic,
  };
};

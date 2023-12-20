import {Color} from 'chess.js';
import {PositionNumber} from '../../domain/entities/PositionNumber';
import {SIZE} from '../components/AnimatedPiece/AnimatedPiece';

interface AlgebraicPositionProps {
  absolutePosition: PositionNumber;
  playerColor: Color;
}

export const getAlgebraicPositionFromAbsolutePosition = ({
  absolutePosition,
  playerColor,
}: AlgebraicPositionProps) => {
  'worklet';
  if (playerColor === 'w') {
    const column = Math.round(absolutePosition.x / SIZE);
    const row = Math.round(absolutePosition.y / SIZE);
    const columnAlgebraic = String.fromCharCode('a'.charCodeAt(0) + column);
    const rowAlgebraic = 8 - row;
    return {
      complete: columnAlgebraic + rowAlgebraic.toString(),
      column: columnAlgebraic,
      row: rowAlgebraic,
    };
  } else {
    const column = 7 - Math.round(absolutePosition.x / SIZE);
    const row = Math.round(absolutePosition.y / SIZE);
    const columnAlgebraic = String.fromCharCode('a'.charCodeAt(0) + column);
    const rowAlgebraic = 1 + row;
    return {
      complete: columnAlgebraic + rowAlgebraic.toString(),
      column: columnAlgebraic,
      row: rowAlgebraic,
    };
  }
};

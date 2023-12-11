import styled from '@emotion/native';
import {useContext} from 'react';
import {View} from 'react-native';
import {getPositionFromAlgebraicNotation} from '../../helpers/getAbsolutePositionFromAlgebraicPosition';
import {PlayedMovesContext} from '../../../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';

const WHITE = 'rgb(230, 233, 198)';
const BLACK = 'rgb(100, 133, 68)';
const HIGHLITED_WHITE = 'rgb(244, 246, 128)';
const HIGHLITED_BLACK = 'rgb(187, 204, 68)';

export const ChessBoardSquare = ({
  row,
  column,
}: {
  row: number;
  column: number;
}) => {
  const {playedMoves, currentMoveKey} = useContext(PlayedMovesContext);

  const lastMove = playedMoves[currentMoveKey];
  const {row: lastMoveRow, column: lastMoveColumn} =
    lastMove.squareTo === ''
      ? {row: -1, column: -1}
      : getPositionFromAlgebraicNotation(lastMove.squareTo);

  let backgroundColor;
  if ((row + column) % 2 === 0) {
    if (row === 8 - lastMoveRow && column === lastMoveColumn) {
      backgroundColor = HIGHLITED_WHITE;
    } else {
      backgroundColor = WHITE;
    }
  } else {
    if (row === 8 - lastMoveRow && column === lastMoveColumn) {
      backgroundColor = HIGHLITED_BLACK;
    } else {
      backgroundColor = BLACK;
    }
  }
  const color =
    backgroundColor === WHITE || backgroundColor === HIGHLITED_WHITE
      ? BLACK
      : WHITE;
  return (
    <Square
      style={{
        backgroundColor,
      }}>
      <RowText color={color} column={column}>
        {8 - row}
      </RowText>
      <ColumnText row={row} color={color}>
        {String.fromCharCode('a'.charCodeAt(0) + column)}
      </ColumnText>
    </Square>
  );
};

const Square = styled(View)({
  flex: 1,
  justifyContent: 'space-between',
  padding: 4,
});

interface RowTextProps {
  column: number;
  color: string;
}

const RowText = styled.Text(({column, color}: RowTextProps) => ({
  color,
  opacity: column === 0 ? 1 : 0,
  fontWeight: 'bold',
}));

interface ColumnTextProps {
  row: number;
  color: string;
}

const ColumnText = styled.Text(({row, color}: ColumnTextProps) => ({
  alignSelf: 'flex-end',
  color,
  opacity: row === 7 ? 1 : 0,
  fontWeight: 'bold',
}));

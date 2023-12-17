import styled from '@emotion/native';
import {useContext} from 'react';
import {View} from 'react-native';
import {getPositionFromAlgebraicNotation} from '../../helpers/getAbsolutePositionFromAlgebraicPosition';
import {PlayedMovesContext} from '../../../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';
import {PlayerColorContext} from '../../contexts/PlayerColorContext';
import {Color} from 'chess.js';

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
  const {playerColor} = useContext(PlayerColorContext);
  const {playedMoves, currentMoveKey} = useContext(PlayedMovesContext);

  const lastMove = playedMoves[currentMoveKey];
  const {row: lastMoveRow, column: lastMoveColumn} =
    lastMove.squareTo === ''
      ? {row: -1, column: -1}
      : getPositionFromAlgebraicNotation(lastMove.squareTo);

  let backgroundColor;
  if ((row + column) % 2 === 0) {
    if (
      isLastMoveSquare({row, column, lastMoveRow, lastMoveColumn, playerColor})
    ) {
      backgroundColor = HIGHLITED_WHITE;
    } else {
      backgroundColor = WHITE;
    }
  } else {
    if (
      isLastMoveSquare({row, column, lastMoveRow, lastMoveColumn, playerColor})
    ) {
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
        {getRowNumber({row, playerColor})}
      </RowText>
      <ColumnText row={row} color={color}>
        {getColumnLetter({column, playerColor})}
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

const getRowNumber = ({
  row,
  playerColor,
}: {
  row: number;
  playerColor: Color;
}) => {
  if (playerColor === 'w') {
    return 8 - row;
  } else {
    return row + 1;
  }
};

const getColumnLetter = ({
  column,
  playerColor,
}: {
  column: number;
  playerColor: Color;
}) => {
  if (playerColor === 'w') {
    return String.fromCharCode('a'.charCodeAt(0) + column);
  } else {
    return String.fromCharCode('a'.charCodeAt(0) + 7 - column);
  }
};

interface IsLastMoveSquareProps {
  row: number;
  column: number;
  lastMoveRow: number;
  lastMoveColumn: number;
  playerColor: Color;
}

const isLastMoveSquare = ({
  row,
  column,
  lastMoveRow,
  lastMoveColumn,
  playerColor,
}: IsLastMoveSquareProps) => {
  if (playerColor === 'w') {
    return row === 8 - lastMoveRow && column === lastMoveColumn;
  } else {
    return row === lastMoveRow - 1 && column === 7 - lastMoveColumn;
  }
};

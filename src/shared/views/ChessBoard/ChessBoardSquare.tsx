import styled from '@emotion/native';
import {View} from 'react-native';

const WHITE = 'rgb(230, 233, 198)';
const BLACK = 'rgb(100, 133, 68)';

export const ChessBoardSquare = ({
  row,
  column,
}: {
  row: number;
  column: number;
}) => {
  const backgroundColor = (row + column) % 2 === 0 ? WHITE : BLACK;
  const color = backgroundColor === WHITE ? BLACK : WHITE;
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

import {Text, View} from 'react-native';
import styled from '@emotion/native';

const WHITE = 'rgb(230, 233, 198)';
const BLACK = 'rgb(100, 133, 68)';

const ChessBoardSquare = ({row, column}: {row: number; column: number}) => {
  return (
    <Square
      style={{
        backgroundColor: (row + column) % 2 === 0 ? WHITE : BLACK,
      }}>
      <Text>{row}</Text>
      <Text>{column}</Text>
    </Square>
  );
};

const ChessBoardRow = ({index}: {index: number}) => {
  const squares = Array(8).fill(0);
  return <Row>{renderSquares(squares, index)}</Row>;
};

export const ChessBoardBackground = () => {
  const rows = Array(8).fill(0);
  return <Background>{renderRows(rows)}</Background>;
};

const renderRows = (rows: number[]) => {
  return rows.map((_, index) => {
    return <ChessBoardRow key={index} index={index}></ChessBoardRow>;
  });
};

const renderSquares = (squares: number[], row: number) => {
  return squares.map((_, index) => {
    return (
      <ChessBoardSquare key={index} column={index} row={row}></ChessBoardSquare>
    );
  });
};

const Background = styled(View)({
  flex: 1,
  width: '100%',
  height: '100%',
});

const Row = styled(View)({
  flexDirection: 'row',
  flex: 1,
});

const Square = styled(View)({
  flex: 1,
});

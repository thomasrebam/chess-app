import styled from '@emotion/native';
import {View} from 'react-native';
import {ChessBoardSquare} from './ChessBoardSquare';

export const ChessBoardRow = ({index}: {index: number}) => {
  const squares = Array(8).fill(0);
  return <Row>{renderSquares(squares, index)}</Row>;
};

const renderSquares = (squares: number[], row: number) => {
  return squares.map((_, index) => {
    return (
      <ChessBoardSquare key={index} column={index} row={row}></ChessBoardSquare>
    );
  });
};

const Row = styled(View)({
  flexDirection: 'row',
  flex: 1,
});

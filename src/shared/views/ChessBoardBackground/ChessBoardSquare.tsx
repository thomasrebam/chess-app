import styled from '@emotion/native';
import {Text, View} from 'react-native';

const WHITE = 'rgb(230, 233, 198)';
const BLACK = 'rgb(100, 133, 68)';

export const ChessBoardSquare = ({
  row,
  column,
}: {
  row: number;
  column: number;
}) => {
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

const Square = styled(View)({
  flex: 1,
});

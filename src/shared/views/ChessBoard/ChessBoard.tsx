import styled from '@emotion/native';
import {View} from 'react-native';
import {ChessBoardBackground} from './ChessBoardBackground';

export const ChessBoard = () => {
  return (
    <Container>
      <ChessBoardBackground />
    </Container>
  );
};

const Container = styled(View)({
  flexShrink: 1,
  justifyContent: 'center',
  alignItems: 'center',
  aspectRatio: 1,
});

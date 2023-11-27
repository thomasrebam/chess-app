import styled from '@emotion/native';
import {View} from 'react-native';
import {ChessBoardBackground} from './ChessBoardBackground';
import {useRef, useState} from 'react';
import {Piece} from '../Piece/Piece';
import {Chess} from 'chess.js';

export const ChessBoard = () => {
  const chess = useRef(new Chess());
  const [gameState, setGameState] = useState({
    player: chess.current.turn(),
    board: chess.current.board(),
  });
  return (
    <Container>
      <ChessBoardBackground />
      {gameState.board.map(file =>
        file.map((square, index) => {
          if (square === null) return null;
          return (
            <Piece
              key={index}
              piece={square.type}
              player={square.color}
              position={square.square}
              chess={chess.current}
            />
          );
        }),
      )}
    </Container>
  );
};

const Container = styled(View)({
  flexShrink: 1,
  aspectRatio: 1,
});

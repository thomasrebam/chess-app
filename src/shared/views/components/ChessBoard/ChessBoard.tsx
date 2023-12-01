import styled from '@emotion/native';
import {View} from 'react-native';
import {ChessBoardBackground} from './ChessBoardBackground';
import {Piece} from '../Piece/Piece';
import {Chess, Color, PieceSymbol, Square} from 'chess.js';
import {MutableRefObject} from 'react';

interface ChessBoardProps {
  game: {
    player: Color;
    board: ({
      square: Square;
      type: PieceSymbol;
      color: Color;
    } | null)[][];
  };
  onTurn: () => void;
  chess: MutableRefObject<Chess>;
}

export const ChessBoard = ({game, onTurn, chess}: ChessBoardProps) => {
  return (
    <Container>
      <ChessBoardBackground />
      {game.board.map(file =>
        file.map((square, index) => {
          if (square === null) return null;
          return (
            <Piece
              key={index}
              piece={square.type}
              player={square.color}
              position={square.square}
              chess={chess.current}
              onTurn={onTurn}
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

import styled from '@emotion/native';
import {View} from 'react-native';
import {ChessBoardBackground} from './ChessBoardBackground';
import Chess = require('chess');
import {useRef, useState} from 'react';
import {Piece} from '../Piece/Piece';
import {getPiecesCodeFromPiece} from '../helpers/getPieceCodeFromPiece';
import {getPlayerFromPiece} from '../helpers/getPlayerFromPiece';

export const ChessBoard = () => {
  const chess = useRef(() => Chess.create());
  const [gameState, setGameState] = useState({
    player: 'w',
    board: chess.current().getStatus().board,
  });
  return (
    <Container>
      <ChessBoardBackground />
      {gameState.board.squares.map((square, index) => {
        if (square.piece === null) return null;
        return (
          <Piece
            key={index}
            piece={getPiecesCodeFromPiece(square.piece)}
            player={getPlayerFromPiece(square.piece)}
          />
        );
      })}
    </Container>
  );
};

const Container = styled(View)({
  flexShrink: 1,
  aspectRatio: 1,
});

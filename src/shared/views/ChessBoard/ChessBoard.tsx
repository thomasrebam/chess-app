import styled from '@emotion/native';
import {View} from 'react-native';
import {ChessBoardBackground} from './ChessBoardBackground';
import {useRef, useState} from 'react';
import {Piece} from '../Piece/Piece';
import {Chess} from 'chess.js';
import {LastMoveContext} from './LastMoveContext';
import {getFileCodeFromFile} from '../helpers/getFileCodeFromFile';

export const ChessBoard = () => {
  const chess = useRef(new Chess());
  const [gameState, setGameState] = useState({
    player: chess.current.turn(),
    board: chess.current.board(),
  });
  const onTurn = () => {
    setGameState({
      player: gameState.player === 'w' ? 'b' : 'w',
      board: chess.current.board(),
    });
  };
  const lastMove = chess.current.history({verbose: true})[
    chess.current.history().length - 1
  ];
  const {row, column} = lastMove
    ? {
        row: getFileCodeFromFile(lastMove.to[0]),
        column: Number(lastMove.to[1]),
      }
    : {
        row: -1,
        column: -1,
      };
  return (
    <Container>
      <LastMoveContext.Provider
        value={{
          row,
          column,
        }}>
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
                onTurn={onTurn}
              />
            );
          }),
        )}
      </LastMoveContext.Provider>
    </Container>
  );
};

const Container = styled(View)({
  flexShrink: 1,
  aspectRatio: 1,
});

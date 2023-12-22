import styled from '@emotion/native';
import {View} from 'react-native';
import {ChessBoardBackground} from './ChessBoardBackground';
import {AnimatedPiece} from '../AnimatedPiece/AnimatedPiece';
import {useContext} from 'react';
import {ChessEngineContext} from '../../contexts/ChessEngineContext';
import {PlayedMovesContext} from '../../../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';
import {PlayerColorContext} from '../../contexts/PlayerColorContext';

export const ChessBoard = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const {currentMoveKey} = useContext(PlayedMovesContext);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const {playerColor} = useContext(PlayerColorContext);
  const {chess} = useContext(ChessEngineContext);
  return (
    <Container>
      <ChessBoardBackground />
      {chess.current.board().map(file =>
        file.map((square, index) => {
          if (square === null) return null;
          return (
            <AnimatedPiece
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

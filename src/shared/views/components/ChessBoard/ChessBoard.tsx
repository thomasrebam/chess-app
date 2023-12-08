import styled from '@emotion/native';
import {View} from 'react-native';
import {ChessBoardBackground} from './ChessBoardBackground';
import {Piece} from '../Piece/Piece';
import {useContext} from 'react';
import {ChessEngineContext} from '../../contexts/ChessEngineContext';
import {PlayedMovesContext} from '../../../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';

interface ChessBoardProps {
  onTurn: () => void;
}

export const ChessBoard = ({onTurn}: ChessBoardProps) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const {currentMoveKey} = useContext(PlayedMovesContext);
  const {chess} = useContext(ChessEngineContext);
  return (
    <Container>
      <ChessBoardBackground />
      {chess.current.board().map(file =>
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

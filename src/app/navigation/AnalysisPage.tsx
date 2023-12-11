import {useRef, useState} from 'react';
import {PlayedMovesProvider} from '../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessBoard} from '../../shared/views/components/ChessBoard/ChessBoard';
import {Chess} from 'chess.js';
import {Spacer} from '../../shared/views/components/Spacer/Spacer';
import {PlayedMoves} from '../../modules/playedMoves/PlayedMoves/PlayedMoves';
import {View} from 'react-native';
import styled from '@emotion/native';
import {AnalysisBottomBar} from '../../modules/bottomBar/AnalysisBottomBar/AnalysisBottomBar';
import {ChessEngineProvider} from '../../shared/views/contexts/ChessEngineContext';

export const AnalysisPage = () => {
  const chess = useRef(new Chess());

  const [gameState, setGameState] = useState({
    player: chess.current.turn(),
    board: chess.current.board(),
    moves: [],
  });

  const onTurn = () => {
    setGameState({
      player: gameState.player === 'w' ? 'b' : 'w',
      board: chess.current.board(),
      moves: gameState.moves,
    });
  };

  return (
    <PlayedMovesProvider>
      <ChessEngineProvider value={{chess}}>
        <Container>
          <TopContentContainer>
            <ChessBoard onTurn={onTurn} />
            <Spacer height={4} />
            <PlayedMoves />
          </TopContentContainer>
          <AnalysisBottomBar onRightArrowPress={onTurn} />
        </Container>
      </ChessEngineProvider>
    </PlayedMovesProvider>
  );
};

const Container = styled(View)({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const TopContentContainer = styled(View)({
  justifyContent: 'flex-start',
});

import {useRef, useState} from 'react';
import {PlayedMovesProvider} from '../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessBoard} from '../../shared/views/components/ChessBoard/ChessBoard';
import {Chess} from 'chess.js';
import {getFileCodeFromFile} from '../../shared/views/helpers/getFileCodeFromFile';
import {Spacer} from '../../shared/views/components/Spacer/Spacer';
import {PlayedMoves} from '../../modules/playedMoves/PlayedMoves/PlayedMoves';
import {LastMoveContext} from '../../shared/views/components/ChessBoard/LastMoveContext';
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

  const onRemove = () => {
    chess.current.undo();
    setGameState({
      player: chess.current.turn(),
      board: chess.current.board(),
      moves: gameState.moves,
    });
  };
  const lastMove = chess.current.history({verbose: true})[
    chess.current.history().length - 1
  ];
  const {row, column} = lastMove
    ? {
        column: getFileCodeFromFile(lastMove.to[0]),
        row: Number(lastMove.to[1]),
      }
    : {
        row: -1,
        column: -1,
      };
  return (
    <PlayedMovesProvider>
      <ChessEngineProvider value={{chess}}>
        <Container>
          <TopContentContainer>
            <LastMoveContext.Provider
              value={{
                row,
                column,
              }}>
              <ChessBoard game={gameState} onTurn={onTurn} />
            </LastMoveContext.Provider>
            <Spacer height={4} />
            <PlayedMoves onRemove={onRemove} />
          </TopContentContainer>
          <AnalysisBottomBar
            onLeftArrowPress={onRemove}
            onRightArrowPress={onTurn}
          />
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

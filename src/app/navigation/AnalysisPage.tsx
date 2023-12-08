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

export const AnalysisPage = () => {
  const chess = useRef(new Chess());

  const [gameState, setGameState] = useState({
    player: chess.current.turn(),
    board: chess.current.board(),
    moves: [],
  });

  const [selectedMove, setSelectedMove] = useState<number>(-1);

  const onSelectMove = (move: number) => {
    setSelectedMove(move);
  };
  const incrementSelectedMove = () => {
    setSelectedMove(selectedMove =>
      selectedMove !== chess.current.history().length - 1
        ? selectedMove + 1
        : selectedMove,
    );
  };
  const decrementSelectedMove = () => {
    setSelectedMove(selectedMove =>
      selectedMove !== 0 ? selectedMove - 1 : selectedMove,
    );
  };
  const onTurn = () => {
    setGameState({
      player: gameState.player === 'w' ? 'b' : 'w',
      board: chess.current.board(),
      moves: gameState.moves,
    });
    incrementSelectedMove();
  };

  const onRemove = () => {
    chess.current.undo();
    setGameState({
      player: chess.current.turn(),
      board: chess.current.board(),
      moves: gameState.moves,
    });
    decrementSelectedMove();
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
      <Container>
        <TopContentContainer>
          <LastMoveContext.Provider
            value={{
              row,
              column,
            }}>
            <ChessBoard game={gameState} onTurn={onTurn} chess={chess} />
          </LastMoveContext.Provider>
          <Spacer height={4} />
          <PlayedMoves
            onRemove={onRemove}
            selectedMove={selectedMove}
            onSelectMove={onSelectMove}
          />
        </TopContentContainer>
        <AnalysisBottomBar
          chess={chess}
          onLeftArrowPress={onRemove}
          onRightArrowPress={onTurn}
        />
      </Container>
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

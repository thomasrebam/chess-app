import {useRef, useState} from 'react';
import {PlayedMovesProvider} from '../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessBoard} from '../../shared/views/components/ChessBoard/ChessBoard';
import {Chess} from 'chess.js';
import {getFileCodeFromFile} from '../../shared/views/helpers/getFileCodeFromFile';
import {Spacer} from '../../shared/views/components/Spacer/Spacer';
import {PlayedMoves} from '../../modules/playedMoves/PlayedMoves/PlayedMoves';
import {LastMoveContext} from '../../shared/views/components/ChessBoard/LastMoveContext';
import {Icon} from '../../../assets/icons';
import {View} from 'react-native';
import {colors} from '../../shared/boson/theme/colors';
import styled from '@emotion/native';

export const AnalysisPage = () => {
  const chess = useRef(new Chess());
  const [gameState, setGameState] = useState({
    player: chess.current.turn(),
    board: chess.current.board(),
  });

  const [selectedMove, setSelectedMove] = useState<number>(-1);

  const onSelectMove = (move: number) => {
    setSelectedMove(move);
  };
  const onTurn = () => {
    setGameState({
      player: gameState.player === 'w' ? 'b' : 'w',
      board: chess.current.board(),
    });
    setSelectedMove(selectedMove + 1);
  };

  const onRemove = () => {
    chess.current.undo();
    setGameState({player: chess.current.turn(), board: chess.current.board()});
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
        <BottomBar>
          <Icon.RightArrow
            style={{transform: [{rotate: '180deg'}]}}
            color={colors.white}
            width={32}
            height={32}
          />
          <Spacer width={40} />
          <Icon.RightArrow color={colors.white} width={32} height={32} />
        </BottomBar>
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

const BottomBar = styled(View)({
  backgroundColor: colors.grey300,
  paddingVertical: 4,
  borderRadius: 4,
  flexDirection: 'row',
  justifyContent: 'space-between',
});

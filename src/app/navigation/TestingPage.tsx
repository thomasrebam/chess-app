import {useRef} from 'react';
import {PlayedMovesProvider} from '../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessEngineProvider} from '../../shared/views/contexts/ChessEngineContext';
import {Chess} from 'chess.js';
import {ChessBoard} from '../../shared/views/components/ChessBoard/ChessBoard';
import styled from '@emotion/native';
import {View} from 'react-native';
import {Spacer} from '../../shared/views/components/Spacer/Spacer';
import {Typography} from '../../shared/boson/components/Typography/Typography';

export const TestingPage = () => {
  const chess = useRef(new Chess());

  return (
    <PlayedMovesProvider value={{playedMoves: undefined}}>
      <ChessEngineProvider value={{chess}}>
        <Container>
          <ChessBoard />
          <Spacer height={32} />
          <BottomContentContainer>
            <StyledText>What to do in this position ?</StyledText>
          </BottomContentContainer>
        </Container>
      </ChessEngineProvider>
    </PlayedMovesProvider>
  );
};

const Container = styled(View)({
  flex: 1,
  flexDirection: 'column',
});

const BottomContentContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'center',
});

const StyledText = styled(Typography.P1Bold)({
  color: 'white',
});

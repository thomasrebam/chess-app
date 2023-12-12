import {useRef} from 'react';
import {PlayedMovesProvider} from '../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessEngineProvider} from '../../shared/views/contexts/ChessEngineContext';
import {Chess} from 'chess.js';
import styled from '@emotion/native';
import {View} from 'react-native';
import {Spacer} from '../../shared/views/components/Spacer/Spacer';
import {Typography} from '../../shared/boson/components/Typography/Typography';
import {PlayedMoves} from '../../modules/playedMoves/PlayedMoves/PlayedMoves';
import {TestingBoard} from '../../modules/testing/testingBoard/TestingBoard';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AuthenticatedNavigatorStackParamList} from './AuthenticatedNavigator/AuthenticatedNavigator.type';

export const TestingPage = () => {
  const chess = useRef(new Chess());

  const {params} =
    useRoute<
      RouteProp<AuthenticatedNavigatorStackParamList, 'Testing Repertoire'>
    >();
  const testingMoves = params.movesToTest
    ? params.movesToTest
    : ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4'];
  // TODO: use the MovesTree type and handle variants choice (random at first)
  return (
    <PlayedMovesProvider value={{playedMoves: undefined}}>
      <ChessEngineProvider value={{chess}}>
        <Container>
          <TestingBoard pgn={testingMoves} />
          <Spacer height={32} />
          <BottomContentContainer>
            <StyledText>What to do in this position ?</StyledText>
          </BottomContentContainer>
          <Spacer height={16} />
          <PlayedMoves />
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

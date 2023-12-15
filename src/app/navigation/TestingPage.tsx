import {useRef, useState} from 'react';
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
import {getEmptyMovesTree} from '../../shared/domain/entities/MovesTree';
import {MoveStatus} from '../../shared/domain/entities/MoveStatus';
import {Icon} from '../../../assets/icons';

export const TestingPage = () => {
  const chess = useRef(new Chess());
  const [lastMoveStatus, setLastMoveStatus] = useState<MoveStatus>('');
  const onCorrectMove = () => {
    setLastMoveStatus('correct');
  };
  const onIncorrectMove = () => {
    setLastMoveStatus('incorrect');
  };
  const {params} =
    useRoute<
      RouteProp<AuthenticatedNavigatorStackParamList, 'Testing Repertoire'>
    >();
  const testingMoves = params.movesToTest
    ? params.movesToTest
    : getEmptyMovesTree();
  // TODO: use the MovesTree type and handle variants choice (random at first)
  return (
    <PlayedMovesProvider value={{playedMoves: undefined}}>
      <ChessEngineProvider value={{chess}}>
        <Container>
          <TestingBoard
            movesTree={testingMoves}
            onCorrectMove={onCorrectMove}
            onIncorrectMove={onIncorrectMove}
          />
          <Spacer height={32} />
          <BottomContentContainer>
            <StyledText>What to do in this position ?</StyledText>
            <Spacer width={16} />
            {lastMoveStatus === 'correct' && (
              <Icon.TrueCheck height={30} width={30} color={'green'} />
            )}
            {lastMoveStatus === 'incorrect' && (
              <Icon.FalseCross height={30} width={30} color={'red'} />
            )}
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
  alignItems: 'center',
});

const StyledText = styled(Typography.P1Bold)({
  color: 'white',
});

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
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthenticatedNavigatorStackParamList} from './AuthenticatedNavigator/AuthenticatedNavigator.type';
import {getEmptyMovesTree} from '../../shared/domain/entities/MovesTree';
import {MoveStatus} from '../../shared/domain/entities/MoveStatus';
import {Icon} from '../../../assets/icons';
import {CongratulationsTestingModal} from '../../modules/testing/testingModal/CongratulationsTestingModal';
import {Navigation} from './AuthenticatedNavigator/AuthenticatedNavigator';
import {PlayerColorProvider} from '../../shared/views/contexts/PlayerColorContext';

export const TestingPage = () => {
  const chess = useRef(new Chess());
  const [lastMoveStatus, setLastMoveStatus] = useState<MoveStatus>('');
  const [isCongratulationsModalVisible, setIsCongratulationsModalVisible] =
    useState(false);
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
  const navigation =
    useNavigation<
      Navigation<AuthenticatedNavigatorStackParamList, 'Testing Repertoire'>
    >();

  const testingMoves = params.movesToTest
    ? params.movesToTest
    : getEmptyMovesTree();

  const onCloseCongratsModal = () => {
    setIsCongratulationsModalVisible(false);
    navigation.navigate('Menu');
  };
  const onLastMove = () => {
    setIsCongratulationsModalVisible(true);
  };
  return (
    <PlayedMovesProvider value={{playedMoves: undefined}}>
      <ChessEngineProvider value={{chess}}>
        <PlayerColorProvider value={{playerColor: params.playerColor}}>
          <Container>
            <TestingBoard
              movesTree={testingMoves}
              onCorrectMove={onCorrectMove}
              onIncorrectMove={onIncorrectMove}
              onLastMove={onLastMove}
              analysisName={params.analysisName}
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
            <PlayedMoves navigationEnabled={false} deletionEnabled={false} />
            <CongratulationsTestingModal
              isModalVisible={isCongratulationsModalVisible}
              onPressClose={onCloseCongratsModal}
            />
          </Container>
        </PlayerColorProvider>
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

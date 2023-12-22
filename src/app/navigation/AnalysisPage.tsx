import {useRef, useState} from 'react';
import {PlayedMovesProvider} from '../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessBoard} from '../../shared/views/components/ChessBoard/ChessBoard';
import {Chess} from 'chess.js';
import {Spacer} from '../../shared/views/components/Spacer/Spacer';
import {PlayedMoves} from '../../modules/playedMoves/PlayedMoves/PlayedMoves';
import {SafeAreaView, View} from 'react-native';
import styled from '@emotion/native';
import {AnalysisBottomBar} from '../../modules/analysis/AnalysisBottomBar/AnalysisBottomBar';
import {ChessEngineProvider} from '../../shared/views/contexts/ChessEngineContext';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AuthenticatedNavigatorStackParamList} from './AuthenticatedNavigator/AuthenticatedNavigator.type';
import {
  MovesTree,
  getEmptyMovesTree,
} from '../../shared/domain/entities/MovesTree';
import {historyToMovesTree} from '../../shared/views/helpers/historyToMovesTree';
import {AnalysisModal} from '../../modules/analysis/AnalysisModal/AnalysisModal';
import {PlayerColorProvider} from '../../shared/views/contexts/PlayerColorContext';

export const AnalysisPage = () => {
  // TODO: Add ability to analyse a position with database
  const {params} =
    useRoute<RouteProp<AuthenticatedNavigatorStackParamList, 'Analysis'>>();
  const chess = useRef(new Chess());

  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const openModal = () => setIsModalVisible(true);

  let playedMoves: MovesTree = getEmptyMovesTree();
  if (params.pgn) {
    const pgn = params.pgn;
    if (pgn.includes(']')) {
      const pgnSplit = pgn.split(']');
      chess.current.loadPgn(pgnSplit[pgnSplit.length - 1]);
      playedMoves = historyToMovesTree({
        moves: chess.current.history({verbose: true}),
      });
    } else {
      chess.current.loadPgn(pgn);
      playedMoves = historyToMovesTree({
        moves: chess.current.history({verbose: true}),
      });
    }
  } else {
    if (params.movesTree) {
      playedMoves = params.movesTree;
    } else {
      playedMoves = getEmptyMovesTree();
    }
  }

  return (
    <PlayedMovesProvider value={{playedMoves}}>
      <ChessEngineProvider value={{chess}}>
        <PlayerColorProvider>
          <Container>
            <TopContentContainer>
              <ChessBoard />
              <Spacer height={4} />
            </TopContentContainer>
            <PlayedMoves />
            <AnalysisBottomBar onPressSave={openModal} />
            <SafeAreaView>
              <AnalysisModal
                isModalVisible={isModalVisible}
                onPressClose={closeModal}
                currentAnalysisName={params.analysisName}
                isModificationNormal={!!params.analysisName}
              />
            </SafeAreaView>
          </Container>
        </PlayerColorProvider>
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

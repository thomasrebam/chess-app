import styled from '@emotion/native';
import {TouchableOpacity, View} from 'react-native';
import {colors} from '../../../shared/boson/theme/colors';
import {Icon} from '../../../../assets/icons';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';
import {useContext} from 'react';
import {PlayedMovesContext} from '../../playedMoves/PlayedMovesContext/PlayedMoveContext';
import {cleanMove} from '../../../shared/views/helpers/cleanMove';
import {emptyMovesTree} from '../../../shared/domain/entities/MovesTree';
import {ChessEngineContext} from '../../../shared/views/contexts/ChessEngineContext';
import {Button} from '../../../shared/boson/components/Button/Button';
import {PersistentStorageService} from '../../../shared/views/services/PersistentStorageService';
import {SavedAnalysisContext} from '../../../shared/views/contexts/SavedAnalysisContext';

export const AnalysisBottomBar = () => {
  const {playedMoves, currentMoveKey, addPlayedMove, goBackToLastMove} =
    useContext(PlayedMovesContext);
  const {chess} = useContext(ChessEngineContext);
  const {savedAnalysis, addSavedAnalysis} = useContext(SavedAnalysisContext);

  const passNextMove = () => {
    if (playedMoves[currentMoveKey].children.length === 0) {
      return;
    }
    const nextMoveKey = playedMoves[currentMoveKey].children[0];
    addPlayedMove({
      move: playedMoves[nextMoveKey].move,
      fen: playedMoves[nextMoveKey].fen,
      squareTo: playedMoves[nextMoveKey].squareTo,
    });
    chess.current.move(cleanMove(playedMoves[nextMoveKey].move));
  };

  const passPreviousMove = () => {
    if (
      playedMoves[currentMoveKey].parentKey === Object.keys(emptyMovesTree)[0]
    ) {
      return;
    }
    const parentKey = playedMoves[currentMoveKey].parentKey;
    chess.current.load(playedMoves[parentKey].fen);
    goBackToLastMove();
  };

  const onPressSave = () => {
    PersistentStorageService.setValue(
      'playedMoves',
      JSON.stringify(playedMoves),
    );
    PersistentStorageService.setValue(
      'savedAnalysis',
      JSON.stringify([...savedAnalysis, 'e4']),
    );
    addSavedAnalysis({newAnalysis: 'e4'});
  };
  return (
    <BottomBar>
      <Spacer width={8} />
      <Button.Primary label="Save" onPress={onPressSave} />
      <TouchableOpacity onPress={passPreviousMove}>
        <Icon.RightArrow
          style={{transform: [{rotate: '180deg'}]}}
          color={colors.white}
          width={32}
          height={32}
        />
      </TouchableOpacity>
      <Spacer width={8} />
      <TouchableOpacity onPress={passNextMove}>
        <Icon.RightArrow color={colors.white} width={32} height={32} />
      </TouchableOpacity>
    </BottomBar>
  );
};

const BottomBar = styled(View)({
  backgroundColor: colors.grey300,
  paddingVertical: 4,
  borderRadius: 4,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

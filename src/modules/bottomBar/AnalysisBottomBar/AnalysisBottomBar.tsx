import styled from '@emotion/native';
import {TouchableOpacity, View} from 'react-native';
import {colors} from '../../../shared/boson/theme/colors';
import {Icon} from '../../../../assets/icons';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';
import {MutableRefObject, useContext} from 'react';
import {PlayedMovesContext} from '../../playedMoves/PlayedMovesContext/PlayedMoveContext';
import {Chess} from 'chess.js';
import {cleanMove} from '../../../shared/views/helpers/cleanMove';
import {emptyMovesTree} from '../../../shared/domain/entities/MovesTree';

interface AnalysisBottomBarProps {
  onLeftArrowPress: () => void;
  onRightArrowPress: () => void;
  chess: MutableRefObject<Chess>;
}

export const AnalysisBottomBar = ({
  onLeftArrowPress,
  onRightArrowPress,
  chess,
}: AnalysisBottomBarProps) => {
  const {playedMoves, currentMoveKey, addPlayedMove, removeLastMove} =
    useContext(PlayedMovesContext);

  const passNextMove = () => {
    if (playedMoves[currentMoveKey].children.length === 0) {
      return;
    }
    const nextMoveKey = playedMoves[currentMoveKey].children[0];
    addPlayedMove({
      move: playedMoves[nextMoveKey].move,
      fen: playedMoves[nextMoveKey].fen,
    });
    chess.current.move(cleanMove(playedMoves[nextMoveKey].move));
    onRightArrowPress();
  };

  const passPreviousMove = () => {
    if (
      playedMoves[currentMoveKey].parentKey ===
      emptyMovesTree['empty'].parentKey
    ) {
      return;
    }
    removeLastMove();
    onLeftArrowPress();
  };
  return (
    <BottomBar>
      <TouchableOpacity onPress={passPreviousMove}>
        <Icon.RightArrow
          style={{transform: [{rotate: '180deg'}]}}
          color={colors.white}
          width={32}
          height={32}
        />
      </TouchableOpacity>
      <Spacer width={40} />
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
});

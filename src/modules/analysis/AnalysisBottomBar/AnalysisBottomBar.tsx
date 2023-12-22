import styled from '@emotion/native';
import {Image, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../shared/boson/theme/colors';
import {Icon} from '../../../../assets/icons';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';
import {useContext} from 'react';
import {PlayedMovesContext} from '../../playedMoves/PlayedMovesContext/PlayedMoveContext';
import {cleanMove} from '../../../shared/views/helpers/cleanMove';
import {EMPTY_MOVES_TREE_ROOT} from '../../../shared/domain/entities/MovesTree';
import {ChessEngineContext} from '../../../shared/views/contexts/ChessEngineContext';
import {Button} from '../../../shared/boson/components/Button/Button';
import {
  PIECES,
  SIZE,
} from '../../../shared/views/components/AnimatedPiece/AnimatedPiece';
import {PlayerColorContext} from '../../../shared/views/contexts/PlayerColorContext';

interface AnalysisBottomBarProps {
  onPressSave: () => void;
}

export const AnalysisBottomBar = ({onPressSave}: AnalysisBottomBarProps) => {
  const {playedMoves, currentMoveKey, addPlayedMove, goBackToLastMove} =
    useContext(PlayedMovesContext);
  const {chess} = useContext(ChessEngineContext);
  const {playerColor, rotatePlayerColor} = useContext(PlayerColorContext);

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
      playedMoves[currentMoveKey].parentKey === EMPTY_MOVES_TREE_ROOT ||
      currentMoveKey === EMPTY_MOVES_TREE_ROOT
    ) {
      return;
    }
    const parentKey = playedMoves[currentMoveKey].parentKey;
    chess.current.load(playedMoves[parentKey].fen);
    goBackToLastMove();
  };

  const onPressSaveCheck = () => {
    if (playedMoves[EMPTY_MOVES_TREE_ROOT].children.length === 0) {
      return;
    }
    onPressSave();
  };
  return (
    <BottomBar>
      <Button.Primary label="Save" onPress={onPressSaveCheck} />
      <TouchableOpacity onPress={rotatePlayerColor}>
        <StyledImage source={PIECES[`${playerColor}p`]} />
      </TouchableOpacity>
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
  justifyContent: 'space-around',
  alignItems: 'center',
});

const StyledImage = styled(Image)({
  width: SIZE,
  height: SIZE,
});

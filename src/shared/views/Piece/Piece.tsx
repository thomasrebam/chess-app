import {Animated, Dimensions, Image} from 'react-native';
import {Player} from '../../domain/entities/Player';
import {ColoredPieceName, PieceCode} from '../../domain/entities/PieceCode';
import styled from '@emotion/native';

export const PIECES: Record<ColoredPieceName, number> = {
  wk: require('../../../../assets/images/WhiteKing.png'),
  bk: require('../../../../assets/images/BlackKing.png'),
  wq: require('../../../../assets/images/WhiteQueen.png'),
  bq: require('../../../../assets/images/BlackQueen.png'),
  wb: require('../../../../assets/images/WhiteBishop.png'),
  bb: require('../../../../assets/images/BlackBishop.png'),
  wn: require('../../../../assets/images/WhiteKnight.png'),
  bn: require('../../../../assets/images/BlackKnight.png'),
  wr: require('../../../../assets/images/WhiteRook.png'),
  br: require('../../../../assets/images/BlackRook.png'),
  wp: require('../../../../assets/images/WhitePawn.png'),
  bp: require('../../../../assets/images/BlackPawn.png'),
};

interface PieceProps {
  piece: PieceCode;
  player: Player;
  position: Animated.ValueXY;
}

export const Piece = ({piece, player, position}: PieceProps) => {
  const coloredPieceName: ColoredPieceName = `${player}${piece}`;
  return (
    <StyledAnimatedView
      style={{
        transform: [{translateX: position.x}, {translateY: position.y}],
      }}>
      <StyledImage source={PIECES[coloredPieceName]} />
    </StyledAnimatedView>
  );
};

export const SIZE = Dimensions.get('window').width / 8;

const StyledImage = styled(Image)({
  width: SIZE,
  height: SIZE,
});

const StyledAnimatedView = styled(Animated.View)({
  position: 'absolute',
});

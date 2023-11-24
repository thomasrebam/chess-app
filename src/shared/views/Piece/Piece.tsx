import {Image} from 'react-native';
import {Player} from '../../domain/entities/Player';
import {ColoredPieceName, PieceName} from '../../domain/entities/PieceName';
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
  piece: PieceName;
  player: Player;
}

export const Piece = ({piece, player}: PieceProps) => {
  const coloredPieceName: ColoredPieceName = `${player}${piece}`;
  return <StyledImage source={PIECES[coloredPieceName]} />;
};

const StyledImage = styled(Image)({
  flexShrink: 1,
  width: '12.5%',
  height: '12.5%',
});

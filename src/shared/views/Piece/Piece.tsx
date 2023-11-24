import {Image} from 'react-native';
import {Player} from '../../domain/entities/Player';
import {ColoredPieceName, PieceName} from '../../domain/entities/PieceName';

export const PIECES: Record<ColoredPieceName, number> = {
  wk: require('../../../../assets/WhiteKing.png'),
  bk: require('../../../../assets/BlackKing.png'),
  wq: require('../../../../assets/WhiteQueen.png'),
  bq: require('../../../../assets/BlackQueen.png'),
  wb: require('../../../../assets/WhiteBishop.png'),
  bb: require('../../../../assets/BlackBishop.png'),
  wn: require('../../../../assets/WhiteKnight.png'),
  bn: require('../../../../assets/BlackKnight.png'),
  wr: require('../../../../assets/WhiteRook.png'),
  br: require('../../../../assets/BlackRook.png'),
  wp: require('../../../../assets/WhitePawn.png'),
  bp: require('../../../../assets/BlackPawn.png'),
};

interface PieceProps {
  piece: PieceName;
  player: Player;
}

export const Piece = ({piece, player}: PieceProps) => {
  const coloredPieceName: ColoredPieceName = `${player}${piece}`;
  return <Image source={PIECES[coloredPieceName]} />;
};

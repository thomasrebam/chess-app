import {Icon} from '../../../../../assets/icons';
import {ColoredPieceName} from '../../../domain/entities/PieceCode';

interface PieceProps {
  piece: ColoredPieceName;
}

export const Piece = ({piece}: PieceProps) => {
  if (!piece) {
    return null;
  }
  if (piece === 'wk') {
    return <Icon.WhiteKing />;
  }
  if (piece === 'bk') {
    return <Icon.BlackKing />;
  }
  if (piece === 'wq') {
    return <Icon.WhiteQueen />;
  }
  if (piece === 'bq') {
    return <Icon.BlackQueen />;
  }
  if (piece === 'wb') {
    return <Icon.WhiteBishop />;
  }
  if (piece === 'bb') {
    return <Icon.BlackBishop />;
  }
  if (piece === 'wn') {
    return <Icon.WhiteKnight />;
  }
  if (piece === 'bn') {
    return <Icon.BlackKnight />;
  }
  if (piece === 'wr') {
    return <Icon.WhiteRook />;
  }
  if (piece === 'br') {
    return <Icon.BlackRook />;
  }
  if (piece === 'wp') {
    return <Icon.WhitePawn />;
  }
  if (piece === 'bp') {
    return <Icon.BlackPawn />;
  }
};

import {PieceCode} from '../../domain/entities/PieceCode';
import Chess = require('chess');

export const getPiecesCodeFromPiece = (piece: Chess.Piece): PieceCode => {
  switch (piece.type) {
    case 'king':
      return 'k';
    case 'queen':
      return 'q';
    case 'rook':
      return 'r';
    case 'bishop':
      return 'b';
    case 'knight':
      return 'n';
    case 'pawn':
      return 'p';
  }
};

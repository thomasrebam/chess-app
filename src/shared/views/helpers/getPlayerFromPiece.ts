import Chess = require('chess');
import {Player} from '../../domain/entities/Player';

export const getPlayerFromPiece = (piece: Chess.Piece): Player => {
  switch (piece.side.name) {
    case 'white':
      return 'w';
    case 'black':
      return 'b';
  }
};

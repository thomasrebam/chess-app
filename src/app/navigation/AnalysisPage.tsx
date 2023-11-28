import {PlayedMoves} from '../../modules/playedMoves/PlayedMoves/PlayedMoves';
import {PlayedMovesProvider} from '../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessBoard} from '../../shared/views/components/ChessBoard/ChessBoard';
import {Spacer} from '../../shared/views/components/Spacer/Spacer';

export const AnalysisPage = () => {
  return (
    <PlayedMovesProvider>
      <ChessBoard />
      <Spacer height={4} />
      <PlayedMoves />
    </PlayedMovesProvider>
  );
};

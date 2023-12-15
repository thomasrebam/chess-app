import {MovesTree} from '../../domain/entities/MovesTree';
import {PersistentStorageService} from '../services/PersistentStorageService';

interface GetMovesToTestProps {
  analysisName: string;
}

export const getMovesToTest = ({
  analysisName,
}: GetMovesToTestProps): MovesTree | undefined => {
  const moves = PersistentStorageService.getValue(
    `playedMoves.${analysisName}`,
  );
  if (moves) {
    const parsedMoves: MovesTree = JSON.parse(moves);
    return parsedMoves;
  }
};

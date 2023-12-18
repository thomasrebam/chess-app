import {MovesTree} from '../../../shared/domain/entities/MovesTree';
import {PersistentStorageService} from '../../../shared/views/services/PersistentStorageService';

interface SaveMovesProps {
  textInputValue: string;
  playedMoves: MovesTree;
}

export const saveMovesInStorage = ({
  textInputValue,
  playedMoves,
}: SaveMovesProps) => {
  PersistentStorageService.setValue(
    `playedMoves.${textInputValue}`,
    JSON.stringify(playedMoves),
  );
};

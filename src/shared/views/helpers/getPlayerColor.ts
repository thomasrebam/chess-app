import {PersistentStorageService} from '../services/PersistentStorageService';

interface GetPlayerColorProps {
  analysisName: string;
}

export const getPlayerColor = ({analysisName}: GetPlayerColorProps) => {
  const playerColor = PersistentStorageService.getValue(
    `playerColor.${analysisName}`,
  );
  if (!playerColor) {
    return 'w';
  }
  const parsePlayerColor = JSON.parse(playerColor);
  if (parsePlayerColor === 'w' || parsePlayerColor === 'b') {
    return parsePlayerColor;
  }
  return 'w';
};

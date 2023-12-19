import {Color} from 'chess.js';
import {PersistentStorageService} from '../../../shared/views/services/PersistentStorageService';

interface SetColorProps {
  textInputValue: string;
  playerColor: Color;
}

export const setColorInStorage = ({
  playerColor,
  textInputValue,
}: SetColorProps) => {
  PersistentStorageService.setValue(
    `playerColor.${textInputValue}`,
    JSON.stringify(playerColor),
  );
};

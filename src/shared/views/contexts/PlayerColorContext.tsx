import {Color} from 'chess.js';
import {createContext, useState} from 'react';

interface PlayerColorContextInterface {
  playerColor: Color;
  setPlayerColor: (color: Color) => void;
  rotatePlayerColor: () => void;
}

export const PlayerColorContext = createContext<PlayerColorContextInterface>({
  playerColor: 'w',
  setPlayerColor: color =>
    console.warn(`no player color provider to set ${color}`),
  rotatePlayerColor: () => console.warn(`no player color provider to rotate`),
});

interface PlayerColorProviderProps {
  children: React.ReactNode;
}

export const PlayerColorProvider = ({children}: PlayerColorProviderProps) => {
  const [playerColor, setPlayerColor] = useState<Color>('w');
  const rotatePlayerColor = () => {
    if (playerColor === 'w') {
      setPlayerColor('b');
    } else {
      setPlayerColor('w');
    }
  };
  return (
    <PlayerColorContext.Provider
      value={{playerColor, setPlayerColor, rotatePlayerColor}}>
      {children}
    </PlayerColorContext.Provider>
  );
};

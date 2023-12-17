import {Color} from 'chess.js';
import {createContext, useState} from 'react';

interface PlayerColorContextInterface {
  playerColor: Color;
  setPlayerColor: (color: Color) => void;
}

export const PlayerColorContext = createContext<PlayerColorContextInterface>({
  playerColor: 'w',
  setPlayerColor: color =>
    console.warn(`no player color provider to set ${color}`),
});

interface PlayerColorProviderProps {
  children: React.ReactNode;
}

export const PlayerColorProvider = ({children}: PlayerColorProviderProps) => {
  const [playerColor, setPlayerColor] = useState<Color>('w');
  return (
    <PlayerColorContext.Provider value={{playerColor, setPlayerColor}}>
      {children}
    </PlayerColorContext.Provider>
  );
};

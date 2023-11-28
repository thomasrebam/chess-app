import {createContext} from 'react';

export const LastMoveContext = createContext<{row: number; column: number}>({
  row: -1,
  column: -1,
});

// interface LastMoveProviderProps {
//   children: ReactNode;
// }

// export const LastMoveProvider = ({children}: LastMoveProviderProps) => {
//   const [lastMove, setLastMove] = useState<{row: number; column: number}>({
//     row: -1,
//     column: -1,
//   });
//   return (
//     <LastMoveContext.Provider value={lastMove}>
//       {children}
//     </LastMoveContext.Provider>
//   );
// };

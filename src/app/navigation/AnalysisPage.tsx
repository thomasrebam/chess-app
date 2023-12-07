import {useRef, useState} from 'react';
import {PlayedMovesProvider} from '../../modules/playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessBoard} from '../../shared/views/components/ChessBoard/ChessBoard';
import {Chess} from 'chess.js';
import {getFileCodeFromFile} from '../../shared/views/helpers/getFileCodeFromFile';
import {Spacer} from '../../shared/views/components/Spacer/Spacer';
import {PlayedMoves} from '../../modules/playedMoves/PlayedMoves/PlayedMoves';
import {LastMoveContext} from '../../shared/views/components/ChessBoard/LastMoveContext';

export const AnalysisPage = () => {
  const chess = useRef(new Chess());
  const [gameState, setGameState] = useState({
    player: chess.current.turn(),
    board: chess.current.board(),
  });

  const [selectedMove, setSelectedMove] = useState<number>(-1);

  const onSelectMove = (move: number) => {
    setSelectedMove(move);
  };
  const onTurn = () => {
    setGameState({
      player: gameState.player === 'w' ? 'b' : 'w',
      board: chess.current.board(),
    });
    setSelectedMove(selectedMove + 1);
  };

  const onRemove = () => {
    chess.current.undo();
    setGameState({player: chess.current.turn(), board: chess.current.board()});
  };
  const lastMove = chess.current.history({verbose: true})[
    chess.current.history().length - 1
  ];
  const {row, column} = lastMove
    ? {
        column: getFileCodeFromFile(lastMove.to[0]),
        row: Number(lastMove.to[1]),
      }
    : {
        row: -1,
        column: -1,
      };
  return (
    <PlayedMovesProvider>
      <LastMoveContext.Provider
        value={{
          row,
          column,
        }}>
        <ChessBoard game={gameState} onTurn={onTurn} chess={chess} />
      </LastMoveContext.Provider>
      <Spacer height={4} />
      <PlayedMoves
        onRemove={onRemove}
        selectedMove={selectedMove}
        onSelectMove={onSelectMove}
      />
    </PlayedMovesProvider>
  );
};

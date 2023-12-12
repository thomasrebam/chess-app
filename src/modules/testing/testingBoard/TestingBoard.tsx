import {useContext, useEffect, useState} from 'react';
import {ChessBoard} from '../../../shared/views/components/ChessBoard/ChessBoard';
import {PlayedMovesContext} from '../../playedMoves/PlayedMovesContext/PlayedMoveContext';
import {ChessEngineContext} from '../../../shared/views/contexts/ChessEngineContext';

interface TestingBoardProps {
  pgn: string[];
}

export const TestingBoard = ({pgn}: TestingBoardProps) => {
  const [currentMove, setCurrentMove] = useState(0);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const {addPlayedMove, currentMoveKey} = useContext(PlayedMovesContext);
  const {chess} = useContext(ChessEngineContext);

  useEffect(() => {
    const history = chess.current.history({verbose: true});
    if (
      history[history.length - 1] &&
      history[history.length - 1].color === 'w' &&
      history[history.length - 1].san === pgn[currentMove]
    ) {
      const move = pgn[currentMove + 1];
      chess.current.move(move);
      const newHistory = chess.current.history({verbose: true});
      addPlayedMove({
        move,
        fen: chess.current.fen(),
        squareTo: newHistory[newHistory.length - 1].to,
      });
      setCurrentMove(currentMove + 2);
    }
  }, [chess, pgn, currentMove, addPlayedMove]);
  return <ChessBoard />;
};

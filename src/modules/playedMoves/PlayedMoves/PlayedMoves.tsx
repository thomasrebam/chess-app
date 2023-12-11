import styled from '@emotion/native';
import {PlayedMove} from '../PlayedMove/PlayedMove';
import {View} from 'react-native';
import {useContext} from 'react';
import {PlayedMovesContext} from '../PlayedMovesContext/PlayedMoveContext';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';
import {getMovesListToDisplay} from '../../../shared/views/helpers/getMovesListFromMovesTree';
import {ChessEngineContext} from '../../../shared/views/contexts/ChessEngineContext';

export const PlayedMoves = () => {
  const {playedMoves, currentMoveKey, setCurrentMoveKey, removePlayedMove} =
    useContext(PlayedMovesContext);
  const {chess} = useContext(ChessEngineContext);

  const movesListToDisplay = getMovesListToDisplay({
    tree: playedMoves,
  });

  return (
    <PlayedMovesBackground>
      {movesListToDisplay.map((movesList, index) => {
        return (
          <PlayedMovesLine key={index}>
            <Spacer width={movesList.depth * 8} />
            {movesList.movesList.map((move, moveIndex) => {
              const onPress = () => {
                setCurrentMoveKey(move.key);
                chess.current.load(playedMoves[move.key].fen);
              };
              const onLongPress = () => {
                const parentKey = playedMoves[move.key].parentKey;
                chess.current.load(playedMoves[parentKey].fen);
                removePlayedMove(move.key);
                setCurrentMoveKey(parentKey);
              };
              return (
                <PlayedMove
                  key={moveIndex}
                  move={move.move}
                  isHighlighted={move.key === currentMoveKey}
                  onLongPress={onLongPress}
                  onPress={onPress}
                />
              );
            })}
          </PlayedMovesLine>
        );
      })}
      <Spacer height={32} />
    </PlayedMovesBackground>
  );
};

const PlayedMovesLine = styled(View)({
  flexWrap: 'wrap',
  flexDirection: 'row',
});

const PlayedMovesBackground = styled(View)({
  backgroundColor: 'black',
});

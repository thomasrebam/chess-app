import styled from '@emotion/native';
import {PlayedMove} from '../PlayedMove/PlayedMove';
import {ScrollView, View} from 'react-native';
import {useContext} from 'react';
import {PlayedMovesContext} from '../PlayedMovesContext/PlayedMoveContext';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';
import {getMovesListToDisplay} from '../../../shared/views/helpers/getMovesListFromMovesTree';
import {ChessEngineContext} from '../../../shared/views/contexts/ChessEngineContext';

interface PlayedMovesProps {
  navigationEnabled?: boolean;
  deletionEnabled?: boolean;
}

export const PlayedMoves = ({
  navigationEnabled,
  deletionEnabled,
}: PlayedMovesProps) => {
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
              const onPress = navigationEnabled
                ? () => {
                    setCurrentMoveKey(move.key);
                    chess.current.load(playedMoves[move.key].fen);
                  }
                : () => undefined;
              const onLongPress = deletionEnabled
                ? () => {
                    const parentKey = playedMoves[move.key].parentKey;
                    chess.current.load(playedMoves[parentKey].fen);
                    removePlayedMove(move.key);
                    setCurrentMoveKey(parentKey);
                  }
                : () => undefined;
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
      <Spacer height={8} />
    </PlayedMovesBackground>
  );
};

const PlayedMovesLine = styled(View)({
  flexWrap: 'wrap',
  flexDirection: 'row',
});

const PlayedMovesBackground = styled(ScrollView)({
  backgroundColor: 'black',
});

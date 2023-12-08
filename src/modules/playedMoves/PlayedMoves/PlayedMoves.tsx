import styled from '@emotion/native';
import {PlayedMove} from '../PlayedMove/PlayedMove';
import {View} from 'react-native';
import {useContext} from 'react';
import {PlayedMovesContext} from '../PlayedMovesContext/PlayedMoveContext';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';
import {getCompleteMovesListFromMovesTree} from '../../../shared/views/helpers/getMovesListFromMovesTree';

interface PlayedMovesProps {
  onRemove: () => void;
  selectedMove?: number;
  onSelectMove: (move: number) => void;
}

export const PlayedMoves = ({
  onRemove,
  selectedMove,
  onSelectMove,
}: PlayedMovesProps) => {
  const {playedMoves, currentMoveKey, removeLastMove} =
    useContext(PlayedMovesContext);
  const highlightedMove =
    selectedMove !== -1
      ? selectedMove
      : playedMoves[currentMoveKey].moveDepth - 1;
  return (
    <PlayedMovesBackground>
      <Spacer width={4} />
      {getCompleteMovesListFromMovesTree({
        tree: playedMoves,
      }).map((move, index) => {
        const onPress = () => {
          onSelectMove(index);
        };
        if (index === highlightedMove) {
          const onLongPress = () => {
            removeLastMove();
            onRemove();
          };
          return (
            <PlayedMove
              key={index}
              move={move}
              isHighlighted
              onLongPress={onLongPress}
              onPress={onPress}
            />
          );
        }
        return <PlayedMove key={index} move={move} onPress={onPress} />;
      })}
    </PlayedMovesBackground>
  );
};

const PlayedMovesBackground = styled(View)({
  flexWrap: 'wrap',
  backgroundColor: 'black',
  flexDirection: 'row',
});

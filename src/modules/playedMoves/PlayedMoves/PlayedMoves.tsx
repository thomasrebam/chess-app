import styled from '@emotion/native';
import {PlayedMove} from '../PlayedMove/PlayedMove';
import {View} from 'react-native';
import {useContext} from 'react';
import {PlayedMovesContext} from '../PlayedMovesContext/PlayedMoveContext';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';

interface PlayedMovesProps {
  onRemove: () => void;
  selectedMove?: number;
}

export const PlayedMoves = ({onRemove, selectedMove}: PlayedMovesProps) => {
  const {playedMoves, removeLastMove} = useContext(PlayedMovesContext);
  const highlightedMove = selectedMove ? selectedMove : playedMoves.length - 1;
  return (
    <PlayedMovesBackground>
      <Spacer width={4} />
      {playedMoves.map((move, index) => {
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
            />
          );
        }
        return <PlayedMove key={index} move={move} />;
      })}
    </PlayedMovesBackground>
  );
};

const PlayedMovesBackground = styled(View)({
  flexWrap: 'wrap',
  backgroundColor: 'black',
  flexDirection: 'row',
});

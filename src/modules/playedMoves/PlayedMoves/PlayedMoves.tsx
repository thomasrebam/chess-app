import styled from '@emotion/native';
import {PlayedMove} from '../PlayedMove/PlayedMove';
import {View} from 'react-native';
import {useContext} from 'react';
import {PlayedMovesContext} from '../PlayedMovesContext/PlayedMoveContext';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';

export const PlayedMoves = () => {
  const {playedMoves} = useContext(PlayedMovesContext);
  return (
    <PlayedMovesBackground>
      <Spacer width={4} />
      {playedMoves.map((move, index) => {
        if (index === playedMoves.length - 1) {
          const onLongPress = () => {
            console.log('Long press');
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

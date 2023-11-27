import styled from '@emotion/native';
import {PlayedMove} from '../PlayedMove/PlayedMove';
import {View} from 'react-native';

interface PlayedMovesProps {
  playedMoves: string[];
}

export const PlayedMoves = ({playedMoves}: PlayedMovesProps) => {
  return (
    <PlayedMovesBackground>
      {playedMoves.map((move, index) => {
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

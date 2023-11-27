import styled from '@emotion/native';
import {PlayedMove} from '../PlayedMove/PlayedMove';
import {View} from 'react-native';
import {useContext} from 'react';
import {PlayedMovesContext} from '../PlayedMovesContext/PlayedMonveContext';
import {Spacer} from '../../../shared/views/Spacer/Spacer';

export const PlayedMoves = () => {
  const {playedMoves} = useContext(PlayedMovesContext);
  return (
    <PlayedMovesBackground>
      <Spacer width={4} />
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

import styled from '@emotion/native';
import {Text, TouchableOpacity} from 'react-native';

interface PlayedMoveProps {
  move: string;
}

export const PlayedMove = ({move}: PlayedMoveProps) => {
  return (
    <TouchableOpacity>
      <StyledText>{`${move} `}</StyledText>
    </TouchableOpacity>
  );
};

const StyledText = styled(Text)({
  color: 'white',
  backgroundColor: 'red',
});

import styled from '@emotion/native';
import {Text, TouchableOpacity} from 'react-native';

interface PlayedMoveProps {
  move: string;
  isHighlighted?: boolean;
}

export const PlayedMove = ({move, isHighlighted = false}: PlayedMoveProps) => {
  return (
    <TouchableOpacity>
      {isHighlighted ? (
        <HighlightedText>{`${move} `}</HighlightedText>
      ) : (
        <NormalText>{`${move} `}</NormalText>
      )}
    </TouchableOpacity>
  );
};

const NormalText = styled(Text)({
  color: 'white',
});

const HighlightedText = styled(Text)({
  color: 'white',
  backgroundColor: 'grey',
});

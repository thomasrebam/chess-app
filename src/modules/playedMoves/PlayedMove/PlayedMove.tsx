import styled from '@emotion/native';
import {Text, TouchableOpacity} from 'react-native';

interface PlayedMoveProps {
  move: string;
  isHighlighted?: boolean;
  onLongPress?: () => void;
}

export const PlayedMove = ({
  move,
  isHighlighted = false,
  onLongPress,
}: PlayedMoveProps) => {
  return (
    <TouchableOpacity onLongPress={onLongPress}>
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

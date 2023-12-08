import styled from '@emotion/native';
import {Text, TouchableOpacity} from 'react-native';

interface PlayedMoveProps {
  move: string;
  isHighlighted?: boolean;
  onLongPress?: () => void;
  onPress?: () => void;
}

export const PlayedMove = ({
  move,
  isHighlighted = false,
  onLongPress,
  onPress,
}: PlayedMoveProps) => {
  return (
    <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
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

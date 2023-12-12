import styled from '@emotion/native';
import {Text} from 'react-native';

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
    <ButtonMove
      onLongPress={onLongPress}
      onPress={onPress}
      isHighlighted={isHighlighted}>
      <StyledText>{`${move} `}</StyledText>
    </ButtonMove>
  );
};

const StyledText = styled(Text)({
  color: 'white',
});

const ButtonMove = styled.TouchableOpacity(
  ({isHighlighted}: {isHighlighted: boolean}) => ({
    backgroundColor: isHighlighted ? 'grey' : 'transparent',
    borderRadius: 3,
  }),
);

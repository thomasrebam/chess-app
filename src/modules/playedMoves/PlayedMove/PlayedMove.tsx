import styled from '@emotion/native';
import {Text} from 'react-native';
import {DeleteMoveModal} from '../DeleteMoveModal/DeleteMoveModal';
import {useState} from 'react';

interface PlayedMoveProps {
  move: string;
  isHighlighted?: boolean;
  onLongPress: () => void;
  onPress: () => void;
}

export const PlayedMove = ({
  move,
  isHighlighted = false,
  onLongPress,
  onPress,
}: PlayedMoveProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onPressDelete = () => {
    setIsModalVisible(true);
  };

  return (
    <ButtonMove
      onLongPress={onPressDelete}
      onPress={onPress}
      isHighlighted={isHighlighted}>
      <DeleteMoveModal
        isModalVisible={isModalVisible}
        onPressDelete={onLongPress}
        closeModal={() => setIsModalVisible(false)}
        move={move}
      />
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

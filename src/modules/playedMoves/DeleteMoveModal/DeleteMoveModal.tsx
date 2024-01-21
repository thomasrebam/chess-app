import Modal from 'react-native-modal';
import {Button} from '../../../shared/views/utils/components/Button/Button';
import styled from '@emotion/native';
import {Text, View} from 'react-native';
import {cleanMove} from '../../../shared/views/helpers/cleanMove';

interface DeleteMoveModalProps {
  isModalVisible: boolean;
  closeModal: () => void;
  onPressDelete: () => void;
  move: string;
}

export const DeleteMoveModal = ({
  isModalVisible,
  closeModal,
  onPressDelete,
  move,
}: DeleteMoveModalProps) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onDismiss={closeModal}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}>
      <ModalContainer>
        <StyledText>{`Are you sure you want to delete ${cleanMove(
          move,
        )} ?`}</StyledText>
        <Button label={`Delete`} onPress={onPressDelete} />
        <Button label={`Cancel`} onPress={closeModal} />
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled(View)({
  flexShrink: 1,
  paddingHorizontal: 16,
  minHeight: 150,
  borderRadius: 16,
  justifyContent: 'space-evenly',
  backgroundColor: 'black',
});

const StyledText = styled(Text)({
  color: 'white',
});

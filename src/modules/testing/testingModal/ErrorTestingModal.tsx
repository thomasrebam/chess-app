import styled from '@emotion/native';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from '../../../shared/views/utils/components/Button/Button';

interface TestingModalProps {
  isModalVisible: boolean;
  onPressClose: () => void;
}

export const ErrorTestingModal = ({
  isModalVisible,
  onPressClose,
}: TestingModalProps) => {
  return (
    <Modal isVisible={isModalVisible}>
      <ModalContainer>
        <StyledText>This move is incorrect, try again</StyledText>
        <Button label={`Let's go !`} onPress={onPressClose} />
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

import styled from '@emotion/native';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from '../../../shared/views/utils/components/Button/Button';

interface CongratulationsTestingModalProps {
  isModalVisible: boolean;
  onPressClose: () => void;
}

export const CongratulationsTestingModal = ({
  isModalVisible,
  onPressClose,
}: CongratulationsTestingModalProps) => {
  return (
    <Modal isVisible={isModalVisible}>
      <ModalContainer>
        <StyledText>Congratulations ! This is the end of the line</StyledText>
        <Button label={`Go back to menu`} onPress={onPressClose} />
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
  alignItems: 'center',
});

const StyledText = styled(Text)({
  color: 'white',
});

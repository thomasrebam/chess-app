import styled from '@emotion/native';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from '../../../shared/boson/components/Button/Button';

interface AnalysisModalProps {
  isModalVisible: boolean;
}

export const AnalysisModal = ({isModalVisible}: AnalysisModalProps) => {
  return (
    <Modal isVisible={isModalVisible}>
      <ModalContainer>
        <StyledText>
          You are saving this analysis, please give it a name
        </StyledText>
        <ButtonContainer>
          <Button.Primary label={'Save analysis'} onPress={() => undefined} />
          <Button.Primary label={'Close modal'} onPress={() => undefined} />
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled(View)({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const ButtonContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledText = styled(Text)({});

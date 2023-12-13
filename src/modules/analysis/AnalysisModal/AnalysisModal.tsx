import styled from '@emotion/native';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from '../../../shared/boson/components/Button/Button';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';

interface AnalysisModalProps {
  isModalVisible: boolean;
  onPressSave: () => void;
  onPressClose: () => void;
}

export const AnalysisModal = ({
  isModalVisible,
  onPressSave,
  onPressClose,
}: AnalysisModalProps) => {
  return (
    <Modal isVisible={isModalVisible}>
      <ModalContainer>
        <StyledText>
          You are saving this analysis, please give it a name
        </StyledText>
        <Spacer height={4} />
        <ButtonContainer>
          <Button.Primary label={'Save analysis'} onPress={onPressSave} />
          <Spacer width={8} />
          <Button.Secondary label={'Close'} onPress={onPressClose} />
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled(View)({
  flexShrink: 1,
  minHeight: 150,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'space-evenly',
  backgroundColor: 'black',
});

const ButtonContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledText = styled(Text)({
  color: 'white',
});

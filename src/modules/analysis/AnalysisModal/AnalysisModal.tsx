import styled from '@emotion/native';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from '../../../shared/boson/components/Button/Button';
import {PersistentStorageService} from '../../../shared/views/services/PersistentStorageService';
import {useContext} from 'react';
import {PlayedMovesContext} from '../../playedMoves/PlayedMovesContext/PlayedMoveContext';
import {SavedAnalysisContext} from '../../../shared/views/contexts/SavedAnalysisContext';
import {TextInput} from '../../../shared/boson/components/TextInput/TextInput';
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
  const {playedMoves} = useContext(PlayedMovesContext);
  const {savedAnalysis, addSavedAnalysis} = useContext(SavedAnalysisContext);

  const onSavePress = () => {
    PersistentStorageService.setValue(
      'playedMoves',
      JSON.stringify(playedMoves),
    );
    PersistentStorageService.setValue(
      'savedAnalysis',
      JSON.stringify([...savedAnalysis, 'e4']),
    );
    addSavedAnalysis({newAnalysis: 'e4'});
    onPressSave();
  };
  return (
    <Modal isVisible={isModalVisible}>
      <ModalContainer>
        <StyledText>
          You are saving this analysis, please give it a name
        </StyledText>
        <StyledTextInput placeholder="Analysis name" focusable />
        <ButtonsContainer>
          <ButtonContainer>
            <Button.Primary label={'Save analysis'} onPress={onSavePress} />
          </ButtonContainer>
          <Spacer width={16} />
          <ButtonContainer>
            <Button.Secondary label={'Cancel'} onPress={onPressClose} />
          </ButtonContainer>
        </ButtonsContainer>
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

const ButtonsContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
});

const ButtonContainer = styled(View)({
  flex: 1,
});

const StyledText = styled(Text)({
  color: 'white',
});

const StyledTextInput = styled(TextInput)({
  flex: 1,
});

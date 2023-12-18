import styled from '@emotion/native';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from '../../../shared/boson/components/Button/Button';
import {PersistentStorageService} from '../../../shared/views/services/PersistentStorageService';
import {useContext, useState} from 'react';
import {PlayedMovesContext} from '../../playedMoves/PlayedMovesContext/PlayedMoveContext';
import {SavedAnalysisContext} from '../../../shared/views/contexts/SavedAnalysisContext';
import {TextInput} from '../../../shared/boson/components/TextInput/TextInput';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';
import {PlayerColorContext} from '../../../shared/views/contexts/PlayerColorContext';

interface AnalysisModalProps {
  isModalVisible: boolean;
  onPressSave: () => void;
  onPressClose: () => void;
  currentAnalysisName?: string;
}

export const AnalysisModal = ({
  isModalVisible,
  onPressSave,
  onPressClose,
  currentAnalysisName,
}: AnalysisModalProps) => {
  const {playedMoves} = useContext(PlayedMovesContext);
  const {playerColor} = useContext(PlayerColorContext);
  const {savedAnalysis, addSavedAnalysis} = useContext(SavedAnalysisContext);

  const [analysisName, setAnalysisName] = useState<string>('');

  const textInputValue = analysisName
    ? analysisName
    : currentAnalysisName
      ? currentAnalysisName
      : '';

  const onSavePress = () => {
    // TODO: check if analysis is not empty before saving
    if (textInputValue === '') {
      return;
    }
    PersistentStorageService.setValue(
      `playedMoves.${textInputValue}`,
      JSON.stringify(playedMoves),
    );
    if (!savedAnalysis.includes(textInputValue)) {
      PersistentStorageService.setValue(
        'savedAnalysis',
        JSON.stringify([...savedAnalysis, textInputValue]),
      );
      addSavedAnalysis({newAnalysis: textInputValue});
    }
    PersistentStorageService.setValue(
      `playerColor.${textInputValue}`,
      JSON.stringify(playerColor),
    );
    onPressSave();
    onPressClose();
  };
  return (
    <Modal isVisible={isModalVisible}>
      <ModalContainer>
        <StyledText>
          You are saving this analysis, please give it a name
        </StyledText>
        <StyledTextInput
          placeholder="Analysis name"
          value={textInputValue}
          focusable
          onChangeText={event => setAnalysisName(event)}
        />
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

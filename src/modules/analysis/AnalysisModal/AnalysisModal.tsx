import styled from '@emotion/native';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from '../../../shared/boson/components/Button/Button';
import {useContext, useState} from 'react';
import {PlayedMovesContext} from '../../playedMoves/PlayedMovesContext/PlayedMoveContext';
import {SavedAnalysisContext} from '../../../shared/views/contexts/SavedAnalysisContext';
import {TextInput} from '../../../shared/boson/components/TextInput/TextInput';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';
import {PlayerColorContext} from '../../../shared/views/contexts/PlayerColorContext';
import {saveMovesInStorage} from '../helpers/saveMovesInStorage';
import {saveAnalysisNameInStorage} from '../helpers/saveAnalysisNameInStorage';
import {setColorInStorage} from '../helpers/setColorInStorage';

interface AnalysisModalProps {
  isModalVisible: boolean;
  onPressClose: () => void;
  currentAnalysisName?: string;
  isModificationNormal?: boolean;
}

export const AnalysisModal = ({
  isModalVisible,
  onPressClose,
  currentAnalysisName,
  isModificationNormal = false,
}: AnalysisModalProps) => {
  const {playedMoves} = useContext(PlayedMovesContext);
  const {playerColor} = useContext(PlayerColorContext);
  const {savedAnalysis, addSavedAnalysis} = useContext(SavedAnalysisContext);

  const [analysisName, setAnalysisName] = useState<string>('');
  const [isConfirmShown, setIsConfirmShown] = useState<boolean>(false);

  const textInputValue = analysisName
    ? analysisName
    : currentAnalysisName
      ? currentAnalysisName
      : '';

  const saveAnalysis = () => {
    saveMovesInStorage({textInputValue, playedMoves});
    if (!savedAnalysis.includes(textInputValue)) {
      saveAnalysisNameInStorage({savedAnalysis, textInputValue});
      addSavedAnalysis({newAnalysis: textInputValue});
    }
    setColorInStorage({playerColor, textInputValue});
    onPressClose();
  };

  const onSavePress = () => {
    // TODO: check if analysis is not empty before saving
    if (textInputValue === '') {
      return;
    }
    if (!savedAnalysis.includes(textInputValue) || isModificationNormal) {
      saveAnalysis();
    } else {
      setIsConfirmShown(true);
    }
  };

  return (
    <Modal isVisible={isModalVisible}>
      <ModalContainer>
        <StyledText>
          {isConfirmShown
            ? `This name is already used, do you want to override it ?`
            : `You are saving this analysis, please give it a name`}
        </StyledText>
        <StyledTextInput
          placeholder="Analysis name"
          value={textInputValue}
          focusable
          onChangeText={event => setAnalysisName(event)}
        />
        <ButtonsContainer>
          <ButtonContainer>
            <Button.Primary
              label={isConfirmShown ? 'Confirm' : 'Save analysis'}
              onPress={isConfirmShown ? saveAnalysis : onSavePress}
            />
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

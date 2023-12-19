import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Button} from '../../../shared/boson/components/Button/Button';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../../../app/navigation/AuthenticatedNavigator/AuthenticatedNavigator';
import {AuthenticatedNavigatorStackParamList} from '../../../app/navigation/AuthenticatedNavigator/AuthenticatedNavigator.type';
import {PersistentStorageService} from '../../../shared/views/services/PersistentStorageService';
import styled from '@emotion/native';
import {Icon} from '../../../../assets/icons';
import {colors} from '../../../shared/boson/theme/colors';
import {getMovesToTest} from '../../../shared/views/helpers/getMovesToTest';
import {useContext} from 'react';
import {SavedAnalysisContext} from '../../../shared/views/contexts/SavedAnalysisContext';
import {getPlayerColor} from '../../../shared/views/helpers/getPlayerColor';

export const TestingMenu = () => {
  const {savedAnalysis, setSavedAnalysis} = useContext(SavedAnalysisContext);
  const navigation =
    useNavigation<
      Navigation<AuthenticatedNavigatorStackParamList, 'Choose Repertoire'>
    >();
  const onPressButton = ({label}: {label: string}) => {
    const movesToTest = getMovesToTest({analysisName: label});
    const playerColor = getPlayerColor({analysisName: label});
    navigation.navigate('Testing Repertoire', {
      movesToTest,
      playerColor,
      analysisName: label,
    });
  };

  const onPressTrashCan = ({label}: {label: string}) => {
    const newSavedAnalysis = savedAnalysis.filter(
      analysis => analysis !== label,
    );
    PersistentStorageService.setValue(
      'savedAnalysis',
      JSON.stringify(newSavedAnalysis),
    );
    setSavedAnalysis({analysis: newSavedAnalysis});
  };
  return (
    <SafeAreaView>
      {savedAnalysis?.map((analysis, index) => {
        return (
          <ButtonAndSpacer
            label={analysis}
            onPressButton={onPressButton}
            onPressTrashCan={onPressTrashCan}
            key={index}
          />
        );
      })}
    </SafeAreaView>
  );
};

interface ButtonAndSpacerProps {
  label: string;
  onPressButton: ({label}: {label: string}) => void;
  onPressTrashCan: ({label}: {label: string}) => void;
}

const ButtonAndSpacer = ({
  label,
  onPressButton,
  onPressTrashCan,
}: ButtonAndSpacerProps) => {
  return (
    <>
      <Spacer height={16} />
      <ButtonAndTrashContainer>
        <Button.Primary label={label} onPress={() => onPressButton({label})} />
        <TouchableOpacity onPress={() => onPressTrashCan({label})}>
          <Icon.TrashCan height={28} width={28} color={colors.primary500} />
        </TouchableOpacity>
      </ButtonAndTrashContainer>
    </>
  );
};

const ButtonAndTrashContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
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
import * as Progress from 'react-native-progress';
import {computeKnowledgeScore} from '../helpers/computeKnowledgeScores';
import {getEmptyMovesTree} from '../../../shared/domain/entities/MovesTree';

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
    <StyledSafeAreaView>
      <StyledScrollView>
        {savedAnalysis?.map((analysis, index) => {
          const movesToTest = getMovesToTest({analysisName: analysis});
          const knowledgeScore = computeKnowledgeScore({
            movesTree: movesToTest ? movesToTest : getEmptyMovesTree(),
          });
          const progress = (knowledgeScore - 1) / 6;
          return (
            <ButtonAndSpacer
              label={analysis}
              onPressButton={onPressButton}
              onPressTrashCan={onPressTrashCan}
              key={index}
              progress={progress}
            />
          );
        })}
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

interface ButtonAndSpacerProps {
  label: string;
  onPressButton: ({label}: {label: string}) => void;
  onPressTrashCan: ({label}: {label: string}) => void;
  progress: number;
}

const ButtonAndSpacer = ({
  label,
  onPressButton,
  onPressTrashCan,
  progress,
}: ButtonAndSpacerProps) => {
  return (
    <>
      <Spacer height={16} />
      <ButtonAndTrashContainer>
        <Button.Primary label={label} onPress={() => onPressButton({label})} />
        <Progress.Circle
          progress={progress}
          direction="counter-clockwise"
          color={colors.primary500}
          animated={false}
          borderWidth={0}
          thickness={4}
          fill={progress === 1 ? colors.primary500 : undefined}
        />
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

const StyledSafeAreaView = styled(SafeAreaView)({flex: 1});

const StyledScrollView = styled(ScrollView)({flex: 1});

import {SafeAreaView} from 'react-native';
import {Button} from '../../../shared/boson/components/Button/Button';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../../../app/navigation/AuthenticatedNavigator/AuthenticatedNavigator';
import {AuthenticatedNavigatorStackParamList} from '../../../app/navigation/AuthenticatedNavigator/AuthenticatedNavigator.type';
import {movesToTestExample} from '../../../shared/domain/mocks/MovesTree.mock';
import {PersistentStorageService} from '../../../shared/views/services/PersistentStorageService';

export const TestingMenu = () => {
  const navigation =
    useNavigation<
      Navigation<AuthenticatedNavigatorStackParamList, 'Choose Repertoire'>
    >();
  const onPressE4 = () => {
    navigation.navigate('Testing Repertoire', {
      movesToTest: movesToTestExample,
    });
  };

  const savedAnalysis = PersistentStorageService.getValue('savedAnalysis');
  const parsedSavedAnalysis: string[] | undefined = savedAnalysis
    ? JSON.parse(savedAnalysis)
    : undefined;
  return (
    <SafeAreaView>
      <ButtonAndSpacer label="e4" onPress={onPressE4} />
      <ButtonAndSpacer label="d4" onPress={() => undefined} />
      {parsedSavedAnalysis?.map((analysis, index) => {
        return (
          <ButtonAndSpacer
            label={analysis}
            onPress={() => undefined}
            key={index}
          />
        );
      })}
    </SafeAreaView>
  );
};

interface ButtonAndSpacerProps {
  label: string;
  onPress: () => void;
}

const ButtonAndSpacer = ({label, onPress}: ButtonAndSpacerProps) => {
  return (
    <>
      <Spacer height={16} />
      <Button.Primary label={label} onPress={onPress} />
    </>
  );
};

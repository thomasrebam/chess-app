import {SafeAreaView} from 'react-native';
import {Button} from '../../../shared/boson/components/Button/Button';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../../../app/navigation/AuthenticatedNavigator/AuthenticatedNavigator';
import {AuthenticatedNavigatorStackParamList} from '../../../app/navigation/AuthenticatedNavigator/AuthenticatedNavigator.type';

export const TestingMenu = () => {
  const navigation =
    useNavigation<
      Navigation<AuthenticatedNavigatorStackParamList, 'Choose Repertoire'>
    >();
  const onPressE4 = () => {
    navigation.navigate('Testing Repertoire', {});
  };
  return (
    <SafeAreaView>
      <Spacer height={16} />
      <Button.Primary label="e4" onPress={onPressE4} />
      <Spacer height={16} />
      <Button.Primary label="d4" onPress={() => undefined} />
    </SafeAreaView>
  );
};

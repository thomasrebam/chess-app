import {useNavigation} from '@react-navigation/native';
import {AuthenticatedNavigatorStackParamList} from './AuthenticatedNavigator/AuthenticatedNavigator.type';
import {Navigation} from './AuthenticatedNavigator/AuthenticatedNavigator';
import {Button} from '../../shared/boson/components/Button/Button';

export const MainPage = () => {
  const navigation =
    useNavigation<
      Navigation<AuthenticatedNavigatorStackParamList, 'MainPage'>
    >();
  return (
    <Button.Primary
      label="Analysis"
      onPress={() => {
        navigation.navigate('AnalysisPage');
      }}
    />
  );
};

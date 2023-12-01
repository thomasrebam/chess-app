import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';
import {AuthenticatedNavigatorStackParamList} from './AuthenticatedNavigator/AuthenticatedNavigator.type';
import {Navigation} from './AuthenticatedNavigator/AuthenticatedNavigator';

export const MainPage = () => {
  const navigation =
    useNavigation<
      Navigation<AuthenticatedNavigatorStackParamList, 'MainPage'>
    >();
  return (
    <Button
      title="Analysis"
      onPress={() => {
        navigation.navigate('AnalysisPage');
      }}></Button>
  );
};

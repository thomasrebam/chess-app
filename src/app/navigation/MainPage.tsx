import {useNavigation} from '@react-navigation/native';
import {AuthenticatedNavigatorStackParamList} from './AuthenticatedNavigator/AuthenticatedNavigator.type';
import {Navigation} from './AuthenticatedNavigator/AuthenticatedNavigator';
import {Button} from '../../shared/boson/components/Button/Button';
import {Spacer} from '../../shared/views/components/Spacer/Spacer';
import {SafeAreaView} from 'react-native';

export const MainPage = () => {
  const navigation =
    useNavigation<Navigation<AuthenticatedNavigatorStackParamList, 'Menu'>>();
  return (
    <SafeAreaView>
      <Spacer height={16} />
      <Button.Primary
        label="Analysis"
        onPress={() => {
          navigation.navigate('Analysis');
        }}
      />
    </SafeAreaView>
  );
};

import {AnalysisPage} from '../AnalysisPage';
import {AuthenticatedNavigatorStackParamList} from './AuthenticatedNavigator.type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthenticatedStack =
  createNativeStackNavigator<AuthenticatedNavigatorStackParamList>();

export const AuthenticatedNavigator = () => {
  return (
    <AuthenticatedStack.Navigator>
      <AuthenticatedStack.Screen name="AnalysisPage" component={AnalysisPage} />
    </AuthenticatedStack.Navigator>
  );
};

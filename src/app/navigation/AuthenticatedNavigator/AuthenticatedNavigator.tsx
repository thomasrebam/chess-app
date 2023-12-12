import {ParamListBase} from '@react-navigation/native';
import {AnalysisPage} from '../AnalysisPage';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {MainPage} from '../MainPage';
import {AuthenticatedNavigatorStackParamList} from './AuthenticatedNavigator.type';
import {TestingPage} from '../TestingPage';

const AuthenticatedStack =
  createNativeStackNavigator<AuthenticatedNavigatorStackParamList>();

export const AuthenticatedNavigator = () => {
  return (
    <AuthenticatedStack.Navigator initialRouteName="Menu">
      <AuthenticatedStack.Screen name={'Analysis'} component={AnalysisPage} />
      <AuthenticatedStack.Screen name={'Menu'} component={MainPage} />
      <AuthenticatedStack.Screen name={'Test'} component={TestingPage} />
    </AuthenticatedStack.Navigator>
  );
};

export type Navigation<
  Navigator extends ParamListBase,
  Screen extends keyof Navigator,
> = NativeStackScreenProps<Navigator, Screen>['navigation'];

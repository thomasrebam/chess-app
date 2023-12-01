import {ParamListBase} from '@react-navigation/native';
import {AnalysisPage} from '../AnalysisPage';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {MainPage} from '../MainPage';

const AuthenticatedStack = createNativeStackNavigator();

export const AuthenticatedNavigator = () => {
  return (
    <AuthenticatedStack.Navigator initialRouteName="MainPage">
      <AuthenticatedStack.Screen
        name={'AnalysisPage'}
        component={AnalysisPage}
      />
      <AuthenticatedStack.Screen name={'MainPage'} component={MainPage} />
    </AuthenticatedStack.Navigator>
  );
};

export type Navigation<
  Navigator extends ParamListBase,
  Screen extends keyof Navigator,
> = NativeStackScreenProps<Navigator, Screen>['navigation'];

import {AnalysisPage} from '../AnalysisPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthenticatedStack = createNativeStackNavigator();

export const AuthenticatedNavigator = () => {
  return (
    <AuthenticatedStack.Navigator>
      <AuthenticatedStack.Screen
        name={'AnalysisPage'}
        component={AnalysisPage}
      />
    </AuthenticatedStack.Navigator>
  );
};

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import styled from '@emotion/native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import {Spacer} from './src/shared/views/components/Spacer/Spacer';
import {AnalysisPage} from './src/app/navigation/AnalysisPage';

function App(): JSX.Element {
  return (
    <StyledGestureHandlerRootView>
      <AppBackground>
        <Spacer height={32} />
        <AnalysisPage />
      </AppBackground>
    </StyledGestureHandlerRootView>
  );
}

const AppBackground = styled(ScrollView)({
  flexGrow: 1,
  backgroundColor: 'black',
});

const StyledGestureHandlerRootView = styled(GestureHandlerRootView)({flex: 1});

export default App;

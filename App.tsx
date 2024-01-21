/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import styled from '@emotion/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import {AuthenticatedNavigator} from './src/app/navigation/AuthenticatedNavigator/AuthenticatedNavigator';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@emotion/react';
import {
  SavedAnalysis,
  SavedAnalysisProvider,
} from './src/shared/views/contexts/SavedAnalysisContext';
import {PersistentStorageService} from './src/shared/views/services/PersistentStorageService';
import {theme} from './src/shared/views/utils/theme/theme';

function App(): JSX.Element {
  const savedAnalysis = PersistentStorageService.getValue('savedAnalysis');
  const parsedSavedAnalysis: SavedAnalysis | undefined = savedAnalysis
    ? JSON.parse(savedAnalysis)
    : undefined;
  return (
    <StyledGestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <SavedAnalysisProvider savedAnalysis={parsedSavedAnalysis}>
          <NavigationContainer theme={DarkTheme}>
            <AuthenticatedNavigator />
          </NavigationContainer>
        </SavedAnalysisProvider>
      </ThemeProvider>
    </StyledGestureHandlerRootView>
  );
}

const StyledGestureHandlerRootView = styled(GestureHandlerRootView)({flex: 1});

export default App;

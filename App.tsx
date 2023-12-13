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
import {theme} from './src/shared/boson/theme/theme';
import {SavedAnalysisProvider} from './src/shared/views/contexts/SavedAnalysisContext';

function App(): JSX.Element {
  return (
    <StyledGestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <SavedAnalysisProvider>
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

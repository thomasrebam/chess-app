/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import styled from '@emotion/native';
import {ChessBoard} from './src/shared/views/ChessBoard/ChessBoard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <AppBackground>
      <ChessBoard />
    </AppBackground>
  );
}

const AppBackground = styled(GestureHandlerRootView)({
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'black',
});

export default App;

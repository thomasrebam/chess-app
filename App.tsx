/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {View} from 'react-native';
import styled from '@emotion/native';
import {ChessBoard} from './src/shared/views/ChessBoard/ChessBoard';

function App(): JSX.Element {
  return (
    <AppBackground>
      <ChessBoard />
    </AppBackground>
  );
}

const AppBackground = styled(View)({
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'black',
});

export default App;

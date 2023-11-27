/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import styled from '@emotion/native';
import {ChessBoard} from './src/shared/views/ChessBoard/ChessBoard';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import {PlayedMoves} from './src/modules/playedMoves/PlayedMoves/PlayedMoves';
import {Spacer} from './src/shared/views/Spacer/Spacer';

function App(): JSX.Element {
  return (
    <StyledGestureHandlerRootView>
      <AppBackground>
        <Spacer height={32} />
        <ChessBoard />
        <PlayedMoves playedMoves={['e4', 'e5']} />
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

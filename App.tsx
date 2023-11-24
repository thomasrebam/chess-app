/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {View} from 'react-native';
import {ChessBoardBackground} from './src/shared/views/ChessBoardBackground/ChessBoardBackground';

function App(): JSX.Element {
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
      <View
        style={{
          flexShrink: 1,
          justifyContent: 'center',
          alignItems: 'center',
          aspectRatio: 1,
        }}>
        <ChessBoardBackground />
      </View>
    </View>
  );
}

export default App;

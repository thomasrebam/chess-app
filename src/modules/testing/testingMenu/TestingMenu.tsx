import {SafeAreaView} from 'react-native';
import {Button} from '../../../shared/boson/components/Button/Button';
import {Spacer} from '../../../shared/views/components/Spacer/Spacer';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../../../app/navigation/AuthenticatedNavigator/AuthenticatedNavigator';
import {AuthenticatedNavigatorStackParamList} from '../../../app/navigation/AuthenticatedNavigator/AuthenticatedNavigator.type';
import {MovesTree} from '../../../shared/domain/entities/MovesTree';

export const TestingMenu = () => {
  const navigation =
    useNavigation<
      Navigation<AuthenticatedNavigatorStackParamList, 'Choose Repertoire'>
    >();
  const onPressE4 = () => {
    navigation.navigate('Testing Repertoire', {
      movesToTest,
    });
  };
  return (
    <SafeAreaView>
      <Spacer height={16} />
      <Button.Primary label="e4" onPress={onPressE4} />
      <Spacer height={16} />
      <Button.Primary label="d4" onPress={() => undefined} />
    </SafeAreaView>
  );
};

const movesToTest: MovesTree = {
  '6ydpev': {
    children: [],
    fen: 'rnbqkb1r/pppp1ppp/8/4N3/8/2n5/PPPP1PPP/R1BQKB1R w KQkq - 0 5',
    move: ' Nxc3',
    moveDepth: 8,
    parentKey: 'rcpfrc',
    player: 'b',
    squareTo: 'c3',
  },
  '8ku41y': {
    children: ['ulca27'],
    fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
    move: ' 1. e4',
    moveDepth: 1,
    parentKey: 'empty',
    player: 'w',
    squareTo: 'e4',
  },
  '9ddgq2': {
    children: ['k6egs2'],
    fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    move: ' Nf6',
    moveDepth: 4,
    parentKey: 'rbezrx',
    player: 'b',
    squareTo: 'f6',
  },
  empty: {
    children: ['8ku41y'],
    fen: '',
    move: '',
    moveDepth: 0,
    parentKey: '-1',
    player: 'b',
    squareTo: '',
  },
  k6egs2: {
    children: ['kb7zxr'],
    fen: 'rnbqkb1r/pppp1ppp/5n2/4N3/4P3/8/PPPP1PPP/RNBQKB1R b KQkq - 0 3',
    move: ' 3. Nxe5',
    moveDepth: 5,
    parentKey: '9ddgq2',
    player: 'w',
    squareTo: 'e5',
  },
  kb7zxr: {
    children: ['rcpfrc'],
    fen: 'rnbqkb1r/pppp1ppp/8/4N3/4n3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 4',
    move: ' Nxe4',
    moveDepth: 6,
    parentKey: 'k6egs2',
    player: 'b',
    squareTo: 'e4',
  },
  rbezrx: {
    children: ['9ddgq2'],
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
    move: ' 2. Nf3',
    moveDepth: 3,
    parentKey: 'ulca27',
    player: 'w',
    squareTo: 'f3',
  },
  rcpfrc: {
    children: ['6ydpev'],
    fen: 'rnbqkb1r/pppp1ppp/8/4N3/4n3/2N5/PPPP1PPP/R1BQKB1R b KQkq - 1 4',
    move: ' 4. Nc3',
    moveDepth: 7,
    parentKey: 'kb7zxr',
    player: 'w',
    squareTo: 'c3',
  },
  ulca27: {
    children: ['rbezrx'],
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    move: ' e5',
    moveDepth: 2,
    parentKey: '8ku41y',
    player: 'b',
    squareTo: 'e5',
  },
};

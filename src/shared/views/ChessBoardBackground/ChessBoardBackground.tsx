import {View} from 'react-native';
import styled from '@emotion/native';
import {ChessBoardRow} from './ChessBoardRow';

export const ChessBoardBackground = () => {
  const rows = Array(8).fill(0);
  return <Background>{renderRows(rows)}</Background>;
};

const renderRows = (rows: number[]) => {
  return rows.map((_, index) => {
    return <ChessBoardRow key={index} index={index}></ChessBoardRow>;
  });
};

const Background = styled(View)({
  flex: 1,
  width: '100%',
  height: '100%',
});

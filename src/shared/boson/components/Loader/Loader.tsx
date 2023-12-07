import styled from '@emotion/native';
import {ActivityIndicator} from 'react-native';

interface LoaderProps {
  color?: string;
  testID?: string;
  size?: number;
}

export const Loader = ({
  color = undefined,
  testID = undefined,
  size,
}: LoaderProps) => (
  <LoaderContainer size={size}>
    <ActivityIndicator color={color} testID={testID} />
  </LoaderContainer>
);

const LoaderContainer = styled.View<{size?: number}>(({size}) => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: size ?? 'auto',
  height: size ?? 'auto',
}));

import styled from '@emotion/native';

interface SpacerProps {
  width?: number;
  height?: number;
}

export const Spacer = styled.View(({width = 0, height = 0}: SpacerProps) => ({
  width,
  height,
}));

import {useSharedValue} from 'react-native-reanimated';

interface UsePiecePositionProps {
  absolutePosition: {
    x: number;
    y: number;
  };
}

export const usePiecePosition = ({absolutePosition}: UsePiecePositionProps) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(absolutePosition.x);
  const translateY = useSharedValue(absolutePosition.y);
  return {offsetX, offsetY, translateX, translateY};
};

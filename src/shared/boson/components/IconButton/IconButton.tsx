import {useTheme} from '@emotion/react';
import React from 'react';

import {PressableWithFeedback} from '../../components/PressableWithFeedback/PressableWithFeedback';
import {IconType} from '../../icons/Icon.types';
import {ThemeColor} from '../../theme/colors.types';

type IconButtonProps = {
  Icon: IconType;
  isDisabled?: boolean;
  onPress: () => void;
  size?: number;
  color?: ThemeColor;
  hasBorder?: boolean;
  accessibilityLabel: string;
};

export type IconButtonState = 'default' | 'disabled';

const IconButtonUnmemoized = ({
  Icon,
  isDisabled,
  onPress,
  size,
  color,
  hasBorder,
  accessibilityLabel,
}: IconButtonProps) => {
  const state: IconButtonState = isDisabled ? 'disabled' : 'default';
  const theme = useTheme();
  // https://www.bam.tech/article/how-insidious-reactnative-onpress-could-be
  const handlePress = () => onPress();

  return (
    <PressableWithFeedback
      onPress={handlePress}
      disabled={isDisabled}
      style={theme.iconButton[state].container(color, hasBorder)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}>
      <Icon color={theme.iconButton[state].iconColor(color)} size={size} />
    </PressableWithFeedback>
  );
};

export const IconButton = React.memo(IconButtonUnmemoized);

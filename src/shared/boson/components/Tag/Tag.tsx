import {useTheme} from '@emotion/react';
import React from 'react';
import {AccessibilityRole} from 'react-native';

import {PressableWithFeedback} from '../../components/PressableWithFeedback/PressableWithFeedback';
import {IconType} from '../../icons/Icon.types';

import {Typography} from '../Typography/Typography';

export type TagVariant = 'default' | 'valid' | 'error' | 'disabled';

type TagProps = {
  label?: string;
  StartIcon?: IconType;
  EndIcon?: IconType;
  onPress?: () => void;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  variant: TagVariant;
};

const TagUnmemoized = ({
  label = '',
  StartIcon,
  EndIcon,
  onPress,
  accessibilityRole,
  accessibilityLabel,
  accessibilityHint,
  variant,
}: TagProps) => {
  // https://www.bam.tech/article/how-insidious-reactnative-onpress-could-be
  const handlePress = () => (onPress ? onPress() : undefined);

  const theme = useTheme();
  const defaultAccessibilityRole: AccessibilityRole = onPress
    ? 'button'
    : 'text';

  const accessibilityValue = variant === 'default' ? undefined : variant;

  return (
    <PressableWithFeedback
      onPress={handlePress}
      disabled={!onPress || variant === 'disabled'}
      style={theme.tag[variant].containerStyle}
      accessibilityRole={
        accessibilityRole ? accessibilityRole : defaultAccessibilityRole
      }
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{text: accessibilityValue}}>
      {StartIcon ? (
        <StartIcon
          color={theme.tag[variant].iconStyle.color}
          size={ICON_SIZE_PX}
        />
      ) : null}
      <Typography.P3Bold color={theme.tag[variant].textStyle.color}>
        {label}
      </Typography.P3Bold>
      {EndIcon ? (
        <EndIcon
          color={theme.tag[variant].iconStyle.color}
          size={ICON_SIZE_PX}
        />
      ) : null}
    </PressableWithFeedback>
  );
};

export const Tag = React.memo(TagUnmemoized);

export const ICON_SIZE_PX = 24;

import {PressableProps, Pressable, ViewProps} from 'react-native';
import {useTheme} from '@emotion/react';

type PressableWithFeedbackProps = Omit<PressableProps, 'style'> &
  Pick<ViewProps, 'style'>;

export type PressableWithFeedbackState = 'default' | 'disabled';

export const PressableWithFeedback = ({
  children,
  style,
  disabled,
  ...props
}: PressableWithFeedbackProps) => {
  const state: PressableWithFeedbackState = disabled ? 'disabled' : 'default';
  const theme = useTheme();
  return (
    <Pressable
      style={({pressed}) => [
        theme.pressableWithFeedback[state](pressed),
        style,
      ]}
      disabled={disabled}
      accessibilityRole="button"
      {...props}>
      {children}
    </Pressable>
  );
};

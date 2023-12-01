import styled from '@emotion/native';
import {useTheme} from '@emotion/react';
import React from 'react';
import {
  AccessibilityState,
  AccessibilityValue,
  Pressable,
  View,
} from 'react-native';
import Animated, {
  Layout,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import {Loader} from '../../components/Loader/Loader';
import {Spacer} from '../../components/Spacer/Spacer';
import {Typography} from '../../components/Typography/Typography';

const CIRCLE_SIZE = 31;

const CIRCLE_TO_BORDER_SPACING = 5;

export type SwitchState = 'on' | 'off';

interface Props {
  isDisabled?: boolean;
  labels?: Record<SwitchState, string>;
  isChecked: boolean;
  isLoading?: boolean;
  onPress: () => void;
  accessibilityLabel: string;
  accessibilityHint?: string;
  accessibilityValueText?: string;
  accessibilityLabelledBy?: string;
}

const ANIMATION_DURATION = 300;

const SwitchUnmemoized: React.FC<Props> = ({
  isDisabled = false,
  labels,
  isChecked,
  isLoading,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  accessibilityValueText,
  accessibilityLabelledBy,
}) => {
  const theme = useTheme();
  const handlePress = () => onPress();

  const transitionProgress = useDerivedValue(() => {
    return withTiming(isChecked ? 0 : 1, {duration: ANIMATION_DURATION});
  }, [isChecked]);

  const borderStyle = useAnimatedStyle(() => {
    const onBorderColor = theme.switch.on.background.borderColor;
    const offBorderColor = theme.switch.off.background.borderColor;
    const borderColor = interpolateColor(
      transitionProgress.value,
      [0, 1],
      [onBorderColor, offBorderColor],
    );

    return {borderColor, borderWidth: theme.switch.borderWitdh};
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const onBackgroundColor = theme.switch.on.background.color;
    const offBackgroundColor = theme.switch.off.background.color;
    const backgroundColor = interpolateColor(
      transitionProgress.value,
      [0, 1],
      [onBackgroundColor, offBackgroundColor],
    );
    return {backgroundColor};
  });

  const circleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      transitionProgress.value,
      [0, 1],
      [theme.switch.off.foreground.color, theme.switch.on.foreground.color],
    );
    return {backgroundColor};
  });

  const textStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      transitionProgress.value,
      [0, 1],
      [theme.switch.off.foreground.color, theme.switch.on.foreground.color],
    );
    return {color};
  });

  return (
    <Pressable disabled={isDisabled || isLoading} onPress={handlePress}>
      <Background
        style={[backgroundStyle, borderStyle]}
        accessible
        accessibilityRole="switch"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityLabelledBy={accessibilityLabelledBy}
        accessibilityValue={getAccessibilityValue({
          accessibilityValueText,
          isChecked,
          isLoading: isLoading || false,
          labels,
        })}
        accessibilityState={getAccessibilityState({isChecked, isLoading})}>
        {isLoading ? (
          <View>
            <Loader color={theme.switch.loaderColor} />
          </View>
        ) : (
          <AnimatedContentContainer
            // If the style is not inline, the layout animation does not work
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {flexDirection: isChecked ? 'row' : 'row-reverse'},
              isDisabled ? {opacity: theme.switch.disabledOpacity} : undefined,
            ]}>
            <Spacer horizontal={10} />

            <AnimatedLabel
              style={textStyle}
              layout={Layout.duration(ANIMATION_DURATION)}
              allowFontScaling={false}>
              {isChecked ? labels?.on : labels?.off}
            </AnimatedLabel>
            <Spacer flex={1} />
            <Circle
              layout={Layout.duration(ANIMATION_DURATION)}
              style={[circleStyle, borderStyle]}
            />
            <Spacer horizontal={CIRCLE_TO_BORDER_SPACING} />
          </AnimatedContentContainer>
        )}
      </Background>
    </Pressable>
  );
};

export const Switch = React.memo(SwitchUnmemoized);

type GetAccessibilityValueParams = {
  isLoading: boolean;
  accessibilityValueText: Props['accessibilityValueText'];
  labels: Props['labels'];
  isChecked: Props['isChecked'];
};

const getAccessibilityValue = ({
  isLoading,
  accessibilityValueText,
  labels,
  isChecked,
}: GetAccessibilityValueParams): AccessibilityValue | undefined => {
  if (isLoading) {
    return {text: 'Loading'};
  }

  if (accessibilityValueText) {
    return {text: accessibilityValueText};
  }

  if (labels) {
    return {text: isChecked ? labels.on : labels.off};
  }

  return undefined;
};

type GetAccessibilityStateParams = Pick<Props, 'isChecked' | 'isLoading'>;

const getAccessibilityState = ({
  isChecked,
  isLoading,
}: GetAccessibilityStateParams): AccessibilityState => {
  if (isLoading) {
    return {disabled: true};
  }

  return {checked: isChecked};
};

const Background = styled(Animated.View)(() => ({
  width: 74, // Fixed size because the texts for the 2 positions are not the same size
  height: CIRCLE_SIZE + CIRCLE_TO_BORDER_SPACING * 2,
  borderRadius: (CIRCLE_SIZE + CIRCLE_TO_BORDER_SPACING * 2) / 2,
  backgroundColor: 'white',
  justifyContent: 'center',
}));

const AnimatedContentContainer = styled(Animated.View)({
  height: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Circle = styled(Animated.View)(() => ({
  width: CIRCLE_SIZE,
  height: CIRCLE_SIZE,
  borderRadius: CIRCLE_SIZE / 2,
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledLabel = styled(Typography.P3Regular)({
  textTransform: 'uppercase',
});

const AnimatedLabel = Animated.createAnimatedComponent(StyledLabel);

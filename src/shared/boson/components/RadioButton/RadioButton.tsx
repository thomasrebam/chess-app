import styled from '@emotion/native';
import {useTheme} from '@emotion/react';
import React from 'react';
import {View} from 'react-native';

import {CheckedRadioButtonIcon} from '../../icons/CheckedRadioButton.icon';
import {DisabledRadioButtonIcon} from '../../icons/DisabledRadioButton.icon';
import {UncheckedRadioButtonIcon} from '../../icons/UncheckedRadioButton.icon';
import {Spacer} from '../Spacer/Spacer';
import {Typography} from '../Typography/Typography';

type RadioButtonProps = {
  isChecked: boolean;
  onPress: () => void;
  isDisabled?: boolean;
  label: string | React.ReactNode;
  accessibilityLabel?: string;
};

type RadioButtonIconProps = {isDisabled: boolean; isChecked: boolean};

export type RadioButtonState = 'disabled' | 'enabled';

const RadioButtonIcon = ({isDisabled, isChecked}: RadioButtonIconProps) => {
  const theme = useTheme();
  if (isDisabled) {
    return <DisabledRadioButtonIcon />;
  }

  return isChecked ? (
    <CheckedRadioButtonIcon color={theme.radioButton.checkedIconColor} />
  ) : (
    <UncheckedRadioButtonIcon />
  );
};

const RadioButtonUnmemoized = ({
  label,
  accessibilityLabel,
  isChecked,
  onPress,
  isDisabled = false,
}: RadioButtonProps) => {
  const theme = useTheme();
  const defaultAccessibilityLabel =
    typeof label === 'string' ? label : undefined;
  const radioButtonState: RadioButtonState = isDisabled
    ? 'disabled'
    : 'enabled';
  // https://www.bam.tech/article/how-insidious-reactnative-onpress-could-be
  const handlePress = () => onPress();

  return (
    <PressableContainer
      disabled={isDisabled}
      onPress={handlePress}
      accessibilityState={{selected: isChecked}}
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel ?? defaultAccessibilityLabel}>
      <RadioButtonIcon isDisabled={isDisabled} isChecked={isChecked} />
      <Spacer horizontal={8} />
      <View>
        {typeof label === 'string' ? (
          <Typography.P1Regular style={theme.radioButton[radioButtonState]}>
            {label}
          </Typography.P1Regular>
        ) : (
          label
        )}
      </View>
    </PressableContainer>
  );
};

export const RadioButton = React.memo(RadioButtonUnmemoized);

const PressableContainer = styled.Pressable({
  flexDirection: 'row',
  alignSelf: 'flex-start',
});

import styled from '@emotion/native';
import {useTheme} from '@emotion/react';
import React, {ReactNode} from 'react';

import {Typography} from '../Typography/Typography';

import {CheckedBoxIcon} from '../../icons/CheckedBox.icon';
import {UncheckedBoxIcon} from '../../icons/UnCheckedBox.icon';
import {Spacer} from '../Spacer/Spacer';

type CheckBoxProps = {
  isChecked: boolean;
  onPress: () => void;
  isDisabled?: boolean;
  label: string | React.ReactNode;
  accessibilityLabel?: string;
};

export type CheckBoxState = 'checked' | 'unchecked';
export type CheckBoxAvailability = 'enabled' | 'disabled';

const CheckBoxUnmemoized = ({
  label,
  accessibilityLabel,
  isChecked,
  onPress,
  isDisabled = false,
}: CheckBoxProps) => {
  const theme = useTheme();
  const checkBoxState: CheckBoxState = isChecked ? 'checked' : 'unchecked';
  const checkBoxAvailability: CheckBoxAvailability = isDisabled
    ? 'disabled'
    : 'enabled';
  const defaultAccessibilityLabel =
    typeof label === 'string' ? label : undefined;

  // https://www.bam.tech/article/how-insidious-reactnative-onpress-could-be
  const handlePress = () => onPress();

  return (
    <PressableContainer
      disabled={isDisabled}
      onPress={handlePress}
      accessibilityState={{checked: isChecked, disabled: isDisabled}}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel ?? defaultAccessibilityLabel}>
      {isChecked ? (
        <CheckedBoxIcon
          color={theme.checkBox.checked[checkBoxAvailability].checkBoxColor}
        />
      ) : (
        <UncheckedBoxIcon
          color={theme.checkBox.unchecked[checkBoxAvailability].checkBoxColor}
        />
      )}
      <Spacer horizontal={8} />
      <LabelContainer>
        {typeof label === 'string' ? (
          <Label
            checkBoxState={checkBoxState}
            checkBoxAvailability={checkBoxAvailability}>
            {label}
          </Label>
        ) : (
          label
        )}
      </LabelContainer>
    </PressableContainer>
  );
};

export const CheckBox = React.memo(CheckBoxUnmemoized);

const PressableContainer = styled.Pressable({
  flexDirection: 'row',
});

const LabelContainer = styled.View();

type LabelProps = {
  checkBoxState: CheckBoxState;
  checkBoxAvailability: CheckBoxAvailability;
  children: ReactNode;
};

const Label = ({checkBoxState, checkBoxAvailability, children}: LabelProps) => {
  const theme = useTheme();
  return (
    <Typography.P1Regular
      color={theme.checkBox[checkBoxState][checkBoxAvailability].labelColor}>
      {children}
    </Typography.P1Regular>
  );
};

import styled from '@emotion/native';
import {useTheme} from '@emotion/react';
import {forwardRef, useState} from 'react';
import {
  Platform,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

import {Typography} from '../Typography/Typography';
import {Spacer} from '../../../components/Spacer/Spacer';

export type TextInputProps = Omit<RNTextInputProps, 'editable'> & {
  label?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  errorLabel?: string;
  rightIcon?: React.ReactNode;
};

export type TextInputState = 'enabled' | 'disabled';
export type BorderState = 'default' | 'focused' | 'error';

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      isDisabled = false,
      isReadOnly = false,
      errorLabel,
      rightIcon,
      onBlur: onBlurProp,
      onFocus: onFocusProp,
      ...textInputProps
    }: TextInputProps,
    ref,
  ) => {
    const theme = useTheme();

    const [isFocused, setIsFocused] = useState(false);
    const onFocus: RNTextInputProps['onFocus'] = event => {
      if (onFocusProp) {
        onFocusProp(event);
      }
      setIsFocused(true);
    };

    const onBlur: RNTextInputProps['onBlur'] = event => {
      if (onBlurProp) {
        onBlurProp(event);
      }
      setIsFocused(false);
    };

    const textInputState: TextInputState = isDisabled ? 'disabled' : 'enabled';
    const inputAccessibilityProps = Platform.select({
      android: {
        accessibilityLabelledBy: label
          ? getNativeIdFromLabel(label)
          : undefined,
      },
      ios: {accessibilityLabel: label},
    });

    const isError = errorLabel !== undefined;

    return (
      <View>
        {!!label && (
          <View>
            <Typography.P1Regular
              color={theme.textInput.contentColors[textInputState].color}
              nativeID={getNativeIdFromLabel(label)}
              accessible={false}>
              {label}
            </Typography.P1Regular>
            <Spacer height={4} />
          </View>
        )}
        <InputContainer
          isDisabled={isDisabled}
          isError={isError}
          isFocused={isFocused}>
          <InputBox
            ref={ref}
            editable={!isDisabled && !isReadOnly}
            onFocus={onFocus}
            onBlur={onBlur}
            {...inputAccessibilityProps}
            {...textInputProps}
          />

          <IconsBox>{rightIcon}</IconsBox>
        </InputContainer>
        {!!errorLabel && (
          <Typography.P2Regular
            color={theme.textInput.contentColors.errorColor}
            // WARNING: KO when used in stories on iOS, OK otherwise
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
            accessibilityLabelledBy={
              label ? getNativeIdFromLabel(label) : undefined
            }>
            {errorLabel}
          </Typography.P2Regular>
        )}
      </View>
    );
  },
);

TextInput.displayName = 'TextInput';

const getNativeIdFromLabel = (label: string) => label.replace(/ /g, '-');

const InputBox = styled.TextInput(({theme}) => ({
  flex: 1,
  color: theme.textInput.contentColors.textColor,
  fontFamily: theme.fonts.paragraph.p1.regular.fontFamily,
  fontSize: theme.fonts.paragraph.p1.regular.fontSize,
  paddingVertical: 8,
  paddingHorizontal: 16,
}));

const IconsBox = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  paddingRight: 16,
});

export const InputContainer = styled.View<{
  isDisabled: boolean;
  isError: boolean;
  isFocused: boolean;
}>(({isDisabled, isFocused, isError}) => {
  const theme = useTheme();
  const borderState: BorderState = isError
    ? 'error'
    : isFocused
      ? 'focused'
      : 'default';
  const backgroundState: TextInputState = isDisabled ? 'disabled' : 'enabled';

  return {
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      theme.textInput.contentColors[backgroundState].backgroundColor,
    ...theme.textInput.borders[borderState],
  };
});

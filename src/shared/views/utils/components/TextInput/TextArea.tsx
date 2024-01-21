import {useTheme} from '@emotion/react';
import {useState} from 'react';
import {Platform} from 'react-native';
import {View} from 'react-native';
import styled from '@emotion/native';

import {Typography} from '../Typography/Typography';
import {Spacer} from '../Spacer/Spacer';
import {InputContainer} from './TextInput';

import {ErrorIcon} from '../../icons/Error.icon';

const spacingBetweenLabels = 12;

type TextAreaProps = {
  onChangeText?: (text: string) => void;
  value?: string;
  label?: string;
  help?: string;
  isDisabled?: boolean;
  placeholder?: string;
  errorLabel?: string;
  description?: string;
};

type LabelProps = {
  label?: string;
  isDisabled: boolean;
  isError?: boolean;
  nativeID?: string;
};

type TopRowProps = {
  label: string | undefined;
  help?: string;
  isDisabled: boolean;
  isError: boolean;
  nativeID?: string;
};
type BottomRowProps = {
  errorLabel?: string;
  description?: string;
};

const getNativeIdFromLabel = (label: string) => label.replace(/ /g, '-');

const ErrorLabel = ({label}: {label: string}) => {
  const theme = useTheme();
  return (
    <Typography.P2Regular
      accessibilityRole={'alert'}
      color={theme.colors.statusError}>
      {label}
    </Typography.P2Regular>
  );
};

const BottomRow = ({errorLabel, description}: BottomRowProps) => {
  const theme = useTheme();
  if (errorLabel) {
    return (
      <Row>
        <ErrorLabel label={errorLabel} />
      </Row>
    );
  }
  if (description) {
    return (
      <Row>
        <Typography.P1Regular color={theme.colors.textPlaceholder}>
          {description}
        </Typography.P1Regular>
      </Row>
    );
  }
  return null;
};

const TopRow = ({label, help, isDisabled, isError, nativeID}: TopRowProps) => {
  const theme = useTheme();
  if (!label && !help) return null;
  return (
    <View>
      <HeaderContainer>
        {!help ? (
          <Label
            label={label}
            isDisabled={isDisabled}
            isError={isError}
            nativeID={nativeID}
          />
        ) : (
          <>
            <LabelContainerView>
              <Label
                label={label}
                isDisabled={isDisabled}
                isError={isError}
                nativeID={nativeID}
              />
            </LabelContainerView>
            <Spacer horizontal={spacingBetweenLabels} />
            <Help>
              <Typography.P1Regular color={theme.colors.textPlaceholder}>
                {help}
              </Typography.P1Regular>
            </Help>
          </>
        )}
      </HeaderContainer>
    </View>
  );
};

const Label = ({label, isDisabled, isError, nativeID}: LabelProps) => {
  const theme = useTheme();
  const labelColor = (() => {
    if (isError) return theme.colors.statusError;
    if (isDisabled) return theme.colors.textPlaceholder;
    return theme.colors.textNormal;
  })();

  return (
    <Typography.P1Regular
      color={labelColor}
      nativeID={nativeID}
      accessible={false}
      maxLinesBeforeEllipsis={2}>
      {label}
    </Typography.P1Regular>
  );
};

export const TextArea = ({
  onChangeText,
  value,
  label,
  help,
  isDisabled = false,
  placeholder,
  errorLabel,
  description,
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);
  const isError = errorLabel !== undefined;

  const textAreaAccessibilityProps = Platform.select({
    android: {
      accessibilityLabelledBy: label ? getNativeIdFromLabel(label) : undefined,
    },
    ios: {accessibilityLabel: label},
  });

  return (
    <View>
      <TopRow
        label={label}
        help={help}
        isDisabled={isDisabled}
        isError={false}
        nativeID={label ? getNativeIdFromLabel(label) : undefined}
      />
      <Spacer vertical={4} />
      <TextAreaContainer
        isDisabled={isDisabled}
        isError={isError}
        isFocused={isFocused}>
        <TextAreaBox
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          editable={!isDisabled}
          onFocus={onFocus}
          onBlur={onBlur}
          multiline={true}
          {...textAreaAccessibilityProps}
        />
        {isError && (
          <TextAreaIconsBox>
            <ErrorIcon color={theme.colors.statusError} />
          </TextAreaIconsBox>
        )}
      </TextAreaContainer>
      <BottomRow errorLabel={errorLabel} description={description} />
    </View>
  );
};

const TextAreaContainer = styled(InputContainer)({
  height: 40 * 3,
  alignItems: 'flex-start',
});

const TextAreaBox = styled.TextInput(({theme}) => ({
  flex: 1,
  textAlignVertical: 'top',
  height: '100%',
  color: theme.colors.textNormal,
  fontFamily: theme.fonts.paragraph.p1.regular.fontFamily,
  fontSize: theme.fonts.paragraph.p1.regular.fontSize,
  paddingTop: 8,
  paddingBottom: 8,
  paddingHorizontal: 16,
}));

const TextAreaIconsBox = styled.View({
  paddingVertical: 8,
  paddingRight: 16,
});

const Row = styled.View({
  flexDirection: 'row',
  marginHorizontal: 4,
});

const LabelContainerView = styled.View({
  maxWidth: '66%',
});

const Help = styled.View({
  justifyContent: 'center',
  maxWidth: '33%',
});

const HeaderContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

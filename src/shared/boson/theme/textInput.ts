import {ViewStyle} from 'react-native';

import {BorderState, TextInputState} from '../components/TextInput/TextInput';
import {ThemeColor} from './colors.types';
import {colors} from './colors';

type CommonColorStyle = {
  errorColor: ThemeColor;
  textColor: ThemeColor;
};

type ColorStyle = Record<TextInputState, ViewStyle & {color: ThemeColor}> &
  CommonColorStyle;

type BorderStyle = Record<BorderState, ViewStyle>;

type TextInputStyle = {contentColors: ColorStyle} & {
  borders: BorderStyle;
};

export const textInput: TextInputStyle = {
  contentColors: {
    enabled: {
      color: colors.textNormal,
      backgroundColor: colors.white,
    },
    disabled: {
      color: colors.textPlaceholder,
      backgroundColor: colors.grey50,
    },
    errorColor: colors.statusError,
    textColor: colors.textNormal,
  },
  borders: {
    focused: {
      borderColor: colors.primary500,
    },
    error: {
      borderColor: colors.statusError,
    },
    default: {
      borderColor: colors.grey100,
    },
  },
};
